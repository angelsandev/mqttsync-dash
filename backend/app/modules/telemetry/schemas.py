# backend/app/modules/telemetry/schemas.py
from pydantic import BaseModel
from datetime import datetime

class TelemetryData(BaseModel):
    device_id: str
    temperature: float
    humidity: float | None = None
    timestamp: datetime = datetime.now()
    
