# backend/app/modules/telemetry/schemas.py
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional

class TelemetryBase(BaseModel):
    """Campos comunes para validación"""
    machine_id: str
    device_id: str
    status: str = "online"
    temperature: float
    humidity: Optional[float] = None
    pressure: Optional[float] = None
    power_consumption: Optional[float] = None
    
    # Datos de Red/Diagnóstico
    rssi: Optional[int] = None
    uptime: Optional[int] = None
    local_ip: Optional[str] = None
    cpu_usage: Optional[float] = None
    ram_usage: Optional[float] = None
    error_code: Optional[int] = None
    firmware_version: Optional[str] = None
    # timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
class TelemetryCreate(TelemetryBase):
    """Lo que esperamos recibir (si alguien hace un POST manual)"""
    timestamp: Optional[datetime] = None

class TelemetryRead(TelemetryBase):
    """Lo que el API le devuelve al Frontend (incluye el ID de DB)"""
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True # Esto permite a Pydantic leer datos de SQLModel
