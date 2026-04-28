# backend/app/modules/telemetry/mqtt_service.py
import paho.mqtt.client as mqtt
import json
from app.core.redis import save_telemetry_cache
from app.core.database import engine
from sqlmodel import Session
from app.modules.telemetry.models import Telemetry
from datetime import datetime

broker = "broker.hivemq.com"
port = 1883
topic = "mqtt/machine01/telemetry/#"

def on_connect(client, userdata, flag, reason_code, properties=None):
    if reason_code == 0:
        print("✅ Conectado al broker!")
        client.subscribe(topic)
    else:
        print(f"❌ Error de conexión: {reason_code}")
        
def on_message(client, userdata, msg):
    try:
        # 1. Decodificar el mensaje que llega de la máquina
        payload = json.loads(msg.payload.decode())
        topic = msg.topic
        print(f"📩 Dato recibido en {topic}: {payload}")
        
        # 2. Extraer el ID de la máquina del topic (ej: machine01/telemetry/sensor_01)
        device_id = topic.split('/')[-1]  # sensor_01
        
        # Si el JSON no trae fecha, la ponemos manualmente:
        if "timestamp" not in payload:
            payload["timestamp"] = datetime.now().isoformat()
        
        print(f"📥 Dato de [{device_id}]: {payload}")
        
        # 3. GUARDAR EN REDIS (UPSTASH)
        # Esto permitirá que el Frontend vea el dato al instante
        save_telemetry_cache(device_id, payload)
        print(f"💾 Dato guardado en Redis para {device_id}")
        
        # 4. GUARDAR EN POSTGRES (NEON) 
        # Mapeamos los datos del JSON al modelo Telemetry
        with Session(engine) as session:
            new_record = Telemetry(
                device_id=device_id,
                status=payload.get("status", "online"),
                temperature=payload.get("temperature"),
                humidity=payload.get("humidity"),
                timestamp=payload["timestamp"]
            )
            session.add(new_record)
            session.commit() # ¡Esto es lo que llena la tabla!
            print(f"✅ Dato persistido en Postgres para {device_id}")
        
        
    except Exception as e:
        print(f"❌ Error al procesar mensaje: {e}")
        
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