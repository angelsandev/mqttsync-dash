from fastapi import FastAPI
from app.modules.telemetry.mqtt_service import start_mqtt
from contextlib import asynccontextmanager
from app.modules.telemetry.router import router as telemetry_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import create_db_and_tables




# Arrancamos MQTT al iniciar la App
@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- Lo que ocurre al ARRANCAR ---
    print("Preparando base de datos...")
    create_db_and_tables() # Para crear las tablas en la BBDD
    print("Iniciando conexión MQTT...")
    start_mqtt() 
    
    
    yield # Aquí es donde la app se queda funcionando
    
    # --- Lo que ocurre al CERRAR ---
    print("Cerrando conexiones...")
    # Aquí se puede poner client.disconnect() si quisiéramos ser súper limpios

app = FastAPI(lifespan=lifespan)


@app.get("/")
async def read_root():
    return {"status": "MQTTSYNC-DASH Backend está operativo"}

app.include_router(telemetry_router)

# Configuración CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción pondremos la URL de Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


