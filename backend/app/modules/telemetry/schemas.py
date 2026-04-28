# backend/app/modules/telemetry/schemas.py
from pydantic import BaseModel
from datetime import datetime

class TelemetryData(BaseModel):
    device_id: str
    status: str = "active"  # Por ejemplo, "active", "inactive", "error", etc.
    temperature: float
    humidity: float | None = None
    timestamp: datetime = datetime.now()
    
