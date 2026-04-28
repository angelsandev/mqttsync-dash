import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session, SQLModel

# Carga las variables del archivo .env
load_dotenv()

database_url = os.getenv("DATABASE_URL")

# 2. El Engine: El objeto que mantiene la conexión abierta
# El argumento 'echo=True' sirve para ver en la terminal las consultas SQL reales
engine = create_engine(database_url,echo=True)


def create_db_and_tables():
    # Busca todos los modelos que tengan "table=True" 
    # y crea las tablas en la base de datos si no existen.
    SQLModel.metadata.create_all(engine)

# Generador de Sesiones: Para que FastAPI pueda pedir una conexión cuando la necesite 
def get_session():
    with Session as session:
        yield session