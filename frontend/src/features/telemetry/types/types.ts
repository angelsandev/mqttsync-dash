// Define la forma de los datos que vienen del Backend (basado en SQLModel)
export interface TelemetryData {
    // Campos de TelemetryRead (los que vienen de la DB)
    id: number;
    timestamp: string; // En JS/TS las fechas de la API llegan como string ISO

    // Campos de TelemetryBase
    machine_id: string;
    device_id: string;
    status: string;
    temperature: number;
    
    // Campos opcionales (mapeados con ?)
    humidity?: number;
    pressure?: number;
    power_consumption?: number;
    
    // Datos de Red/Diagnóstico
    rssi?: number;
    uptime?: number;
    local_ip?: string;
    cpu_usage?: number;
    ram_usage?: number;
    error_code?: number;
    firmware_version?: string;
}

// Tipo opcional por si solo necesitamos una lista de nombres de máquinas
export type MachineList = string[];