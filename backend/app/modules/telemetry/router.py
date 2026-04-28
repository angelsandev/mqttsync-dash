from fastapi import APIRouter, HTTPException
from app.core.redis import get_telemetry_cache
import json

router = APIRouter(prefix="/telemetry", tags=["telemetry"])

@router.get("/{device_id}")
async def get_current_status(device_id: str):
    data = get_telemetry_cache(device_id)
    
    if not data:
        raise HTTPException(status_code=404, detail=f"No se encuentra dato para: {device_id}")
    
    # Si los datos vienen como texto con comillas (string), convertir a objeto Python
    if isinstance(data, str):
        return json.loads(data)
    
    return data
