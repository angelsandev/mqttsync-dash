from fastapi import FastAPI
from app.modules.telemetry.mqtt_service import start_mqtt
from contextlib import asynccontextmanager
from app.modules.telemetry.router import router as telemetry_router




# Arrancamos MQTT al iniciar la App
@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Lo que ocurre al ARRANCAR ---
    print("Iniciando conexión MQTT...")
    start_mqtt() 
    
    yield # Aquí es donde la aplicación "vive"
    
    # --- Lo que ocurre al CERRAR ---
    print("Cerrando conexiones...")
    # Aquí se puede poner client.disconnect() si quisiéramos ser súper limpios

app = FastAPI(lifespan=lifespan)


@app.get("/")
async def read_root():
    return {"status": "MQTTSYNC-DASH Backend está operativo"}

app.include_router(telemetry_router)