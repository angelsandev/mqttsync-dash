# backend/app/modules/telemetry/mqtt_service.py
import paho.mqtt.client as mqtt
import json
from app.core.redis import save_telemetry_cache
from app.core.database import engine
from sqlmodel import Session
from app.modules.telemetry.models import Telemetry
from datetime import datetime, timezone

# Estructura del TOPIC: factory / {machine_id} / telemetry / {device_id}
# El '+' es un wildcard para un nivel.
broker = "broker.hivemq.com"
port = 1883
topic = "factory/+/telemetry/+"

def on_connect(client, userdata, flag, reason_code, properties=None):
    if reason_code == 0:
        print("✅ Conectado al broker! Suscribiendo a: {topic}")
        client.subscribe(topic)
    else:
        print(f"❌ Error de conexión: {reason_code}")
        
def on_message(client, userdata, msg):
    try:
        # Decodificar el mensaje que llega de la factory
        payload = json.loads(msg.payload.decode())
        current_topic = msg.topic
        print(f"📩 Dato recibido en {topic}: {payload}")
        
        # EXTRAER IDS DEL TOPIC
        # Si el topic es "factory/prensa-01/telemetry/sensor-t01"
        # parts[0]="factory", parts[1]="prensa-01", parts[2]="telemetry", parts[3]="sensor-t01"
        parts = current_topic.split('/')
        machine_id = parts[1]
        device_id = parts[3]
        
        # Si el JSON no trae fecha, la ponemos manualmente:
        if "timestamp" not in payload:
            payload["timestamp"] = datetime.now(timezone.utc).isoformat()
        
        print(f"📥 Dato de [{device_id}]: {payload}")
        
        # GUARDAR EN REDIS (UPSTASH)  Para el tiempo real del dashboard.
        # Esto permitirá que el Frontend vea el dato al instante
        cache_key =f"{machine_id}:{device_id}"  #clave compuesta para que no se machaquen datos de distintas máquinas
        save_telemetry_cache(machine_id, device_id, payload)
        print(f"💾 Dato guardado en Redis para {machine_id} -> {device_id}")
        
        # GUARDAR EN POSTGRES (NEON) 
        # Mapeamos los datos del JSON al modelo Telemetry
        with Session(engine) as session:
            new_record = Telemetry(
                machine_id=machine_id,
                device_id=device_id,
                status=payload.get("status", "online"),
                temperature=payload.get("temperature"),
                humidity=payload.get("humidity"),
                pressure=payload.get("pressure"),
                power_consumption=payload.get("power_consumption"),
                rssi=payload.get("rssi"),
                uptime=payload.get("uptime"),
                local_ip=payload.get("local_ip"),
                cpu_usage=payload.get("cpu_usage"),
                ram_usage=payload.get("ram_usage"),
                error_code=payload.get("error_code"),
                firmware_version=payload.get("firmware_version"),
                timestamp=payload["timestamp"]
            )
            session.add(new_record)
            session.commit() # ¡Esto es lo que llena la tabla!
            print(f"💾 Dato persistido en Postgres para {machine_id} -> {device_id}")
        
        
    except Exception as e:
        print(f"❌ Error al procesar mensaje en {msg.topic}: {e}")
        
def start_mqtt():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    try:
        client.connect(broker, port, 60)
        client.loop_start()
        print("🚀 MQTT Service iniciado")
    except Exception as e:
        print(f"❌ Error al iniciar MQTT Service: {e}")