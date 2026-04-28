from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Telemetry(SQLModel, table=True):
    # El ID es único y se genera solo
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # El device_id nos dice qué máquina es (sensor01, etc.)
    device_id: str = Field(index=True)
    
    # El estado y las medidas
    status: str
    temperature: float
    humidity: Optional[float] = None
    
    # La fecha y hora exacta del registro
    timestamp: datetime = Field(default_factory=datetime.now)
