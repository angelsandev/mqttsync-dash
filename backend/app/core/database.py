import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session, SQLModel
# IMPORTANTE: Importar aquí los modelos para que SQLModel los registre
from app.modules.telemetry.models import Telemetry

# Carga las variables del archivo .env
load_dotenv()

database_url = os.getenv("DATABASE_URL") or os.getenv("POSTGRES_URL")

# 2. El Engine: El objeto que mantiene la conexión abierta
# El argumento 'echo=True' sirve para ver en la terminal las consultas SQL reales
engine = create_engine(
    database_url,
    # Cierra las conexiones que lleven más de 300 segundos (5 min) inactivas
    pool_recycle=300,
    # Antes de usar una conexión, lanza un "SELECT 1" para ver si responde
    pool_pre_ping=True,
    # Evita que se queden demasiadas conexiones colgadas
    pool_size=5,
    max_overflow=10,
    echo=True)


def create_db_and_tables():
    # Busca todos los modelos que tengan "table=True" 
    # y crea las tablas en la base de datos si no existen.
    print("Intentando crear tablas en la base de datos...")
    SQLModel.metadata.create_all(engine)
    print("✅ Tablas procesadas (si no existían, se han creado)")

# Generador de Sesiones: Para que FastAPI pueda pedir una conexión cuando la necesite 
def get_session():
    with Session(engine) as session:
        yield session