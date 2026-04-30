// src/features/telemetry/services/telemetryService.ts
import axios from 'axios';
import type { TelemetryData } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// CreaR una instancia configurada
const api = axios.create({
    baseURL: `${API_BASE_URL}/telemetry`,
});


export const telemetryService = {
    // Obtener lista de nombres de máquinas (GET /telemetry/machines)
    getMachines: async(): Promise<string[]> =>{
        const response = await api.get<string[]>('/machines');
        return response.data;
    },

    // Obtener historial de una máquina (GET /telemetry/history/{machine_id})
    getMachineHistory: async(machineId: string): Promise<TelemetryData[]> =>{
        const response = await api.get<TelemetryData[]>(`/history/${machineId}`);
        return response.data;
    },

    // Obtener el dato actual de Redis (GET /telemetry/current/{machine_id}/{device_id})
    getCurrentStatus: async(machineId: string, deviceId: string): Promise<TelemetryData> =>{
        const response = await api.get<TelemetryData>(`/current/${machineId}/${deviceId}`);
        return response.data;
    }



};