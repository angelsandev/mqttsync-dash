from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Telemetry(SQLModel, table=True):
    # El ID es único y se genera solo
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # index=True => las consultas por máquina seran ultra rápidas
    machine_id: str = Field(index=True)
    
    # El device_id nos dice qué sensor es (sensor01, etc.)
    device_id: str = Field(index=True)
    
    # --- Medidas de Proceso ---
    status: str = Field(default="online")
    temperature: float
    humidity: Optional[float] = None
    pressure: Optional[float] = None
    power_consumption: Optional[float] = None # Consumo eléctrico (kW/h)

    # --- 🛰️ Conectividad y Red (Estilo Gateway/Router) ---
    rssi: Optional[int] = None      # Fuerza de la señal WiFi/4G (dBm)
    uptime: Optional[int] = None    # Tiempo que lleva encendido el equipo (segundos)
    local_ip: Optional[str] = None  # IP local para mantenimiento remoto
    cpu_usage: Optional[float] = None # Carga de trabajo del microcontrolador/PLC
    ram_usage: Optional[float] = None # Memoria libre en el dispositivo
    
    # --- 🛡️ Diagnóstico de Errores ---
    error_code: Optional[int] = None  # 0: OK, 1: Sensor Falla, 2: Voltaje Bajo, etc.
    firmware_version: Optional[str] = None # Para saber si el equipo está actualizado
    
    # La fecha y hora exacta del registro
    timestamp: datetime = Field(default_factory=datetime.now)
