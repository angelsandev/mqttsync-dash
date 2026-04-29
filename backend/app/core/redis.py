# backend/app/core/redis.py
import os
from upstash_redis import Redis
from dotenv import load_dotenv

load_dotenv()

# Configuración de Upstash
REDIS_URL = os.getenv("UPSTASH_REDIS_REST_URL")
REDIS_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")

# Validación simple para asegurar que están las variables de entorno OK
if not REDIS_URL or not REDIS_TOKEN:
    print("❌ ERROR: No se han configurado las variables de entorno para Redis")

# El prefijo evita que este proyecto pise a otros en la misma DB de Upstash
PROJECT_PREFIX = "mqsync" 

# Inicializamos el cliente
redis_client = Redis(url=REDIS_URL, token=REDIS_TOKEN)

def save_telemetry_cache(machine_id: str, device_id: str, data: dict):
    """
    Guarda el último valor de una máquina en Redis.
    Key resultante ejemplo: mqsync:device:maquina_01:current
    """
    key = f"{PROJECT_PREFIX}:{machine_id}:{device_id}:current"
    # Guardamos el JSON completo del dato (temp, humedad, etc.)
    redis_client.set(key, data)

def get_telemetry_cache(machine_id: str,device_id: str):
    """Recupera el último valor guardado de una máquina"""
    key = f"{PROJECT_PREFIX}:{machine_id}:{device_id}:current"
    return redis_client.get(key)
