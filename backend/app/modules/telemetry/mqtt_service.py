# backend/app/modules/telemetry/mqtt_service.py
import paho.mqtt.client as mqtt
import json

broker = "hivemq.com"
port = 1883
topic = "mqtt/machine01/telemetry"

def on_connect(client, userdata, flag, reason_code, properties):
    if reason_code == 0:
        print("✅ Conectado al broker!")
        client.subscribe(topic)
    else:
        print(f"❌ Error de conexión: {reason_code}")
        
def on_message(client, userdata, msg):
    try:
        payload = json.load(msg.payload.decode())
        print(f"📩 Dato recibido en {topic}: {payload}")
    except Exception as e:
        print(f"❌ Error al procesar mensaje: {e}")
        
def start_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    try:
        client.connect(broker, port, 60)
        client.loop_start()
        print("🚀 MQTT Service iniciado")
    except Exception as e:
        print(f"❌ Error al iniciar MQTT Service: {e}")