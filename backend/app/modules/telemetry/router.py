from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlmodel import Session, select
from app.core.database import engine, get_session
from app.core.redis import get_telemetry_cache
from app.modules.telemetry.models import Telemetry
from app.modules.telemetry.schemas import TelemetryRead
import json

router = APIRouter(prefix="/telemetry", tags=["telemetry"])


# ---  TIEMPO REAL (De Redis) ---

@router.get("/current/{machine_id}/{device_id}", response_model=TelemetryRead)
async def get_current_val(machine_id: str, device_id: str):
    # la clave que hay definida en el mqtt_service
    data = get_telemetry_cache(machine_id, device_id)
    
    if not data:
        raise HTTPException(status_code=404, detail="Dato en tiempo real no disponible")
    
    if isinstance(data, str):
        return json.loads(data)
    return data




    
# HISTORIAL (Desde Postgres para las gráficas)
@router.get("/history/{machine_id}", response_model=List[TelemetryRead])
async def get_machine_history(
    machine_id: str,
    limit: int=50,
    session: Session = Depends(get_session)
):
    # Buscamos los últimos registros de esa máquina
    statement=(
        select(Telemetry)
        .where(Telemetry.machine_id == machine_id)
        .order_by(Telemetry.timestamp.desc())
        .limit(limit)
    )
    results = session.exec(statement).all()
    if not results:
        raise HTTPException(status_code=404, detail="No hay historial para esta máquina")

    return results


# LISTADO DE MÁQUINAS ÚNICAS (desde Postgres)(Para el Dashboard del Frontend)
@router.get("/machines", response_model=List[str])
async def get_unique_machines(session: Session = Depends(get_session)):
    # Esto le dirá al Frontend qué máquinas existen en el sistema
    statement = select(Telemetry.machine_id).distinct()
    results = session.exec(statement).all()
    return results


