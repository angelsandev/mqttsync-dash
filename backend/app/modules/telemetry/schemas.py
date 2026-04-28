# backend/app/modules/telemetry/schemas.py
from pydantic import BaseModel, Field
from datetime import datetime, timezone

class TelemetryData(BaseModel):
    device_id: str
    status: str = "active"  # Por ejemplo, "active", "inactive", "error", etc.
    temperature: float
    humidity: float | None = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
