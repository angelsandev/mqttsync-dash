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
    # Forzamos la creación al entrar
    try:
        create_db_and_tables() # Para crear las tablas en la DB
        print("🚀 Base de datos sincronizada")
    except Exception as e:
        print(f"❌ Error creando tablas: {e}")
    
    start_mqtt() 
    print("📡 MQTT iniciado")
    
    
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
    allow_origins=[
                   "http://127.0.0.1:5173",
                   "http://localhost:5173",                 # Para probar en local
                   "https://mqttsync-dash-frontend.vercel.app",  # URL de front actual
                    
                   ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


