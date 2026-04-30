import { 
  Thermometer, Gauge, Droplets, Zap, Wifi, Globe, 
  Cpu, HardDrive, Activity, Clock, Tag 
} from 'lucide-react';
import { SensorCard } from './SensorCard';
import type { TelemetryData } from '../types/types';

export const MachineStats = ({ data }: { data: TelemetryData }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      {/* Datos Principales */}
      <SensorCard 
        label="Temperatura" value={data.temperature} unit="°C" 
        icon={<Thermometer size={20} />} colorClass="text-orange-500" 
      />
      <SensorCard 
        label="Presión" value={data.pressure ?? '--'} unit="bar" 
        icon={<Gauge size={20} />} colorClass="text-blue-500" 
      />
      <SensorCard 
        label="Humedad" value={data.humidity ?? '--'} unit="%" 
        icon={<Droplets size={20} />} colorClass="text-cyan-500" 
      />
      
      {/* Energía y Consumo */}
      <SensorCard 
        label="Consumo" value={data.power_consumption ?? '--'} unit="W" 
        icon={<Zap size={20} />} colorClass="text-yellow-500" 
      />

      {/* Diagnóstico de Hardware */}
      <SensorCard 
        label="CPU" value={data.cpu_usage ?? '--'} unit="%" 
        icon={<Cpu size={20} />} colorClass="text-indigo-500" 
      />
      <SensorCard 
        label="RAM" value={data.ram_usage ?? '--'} unit="%" 
        icon={<HardDrive size={20} />} colorClass="text-pink-500" 
      />
      <SensorCard 
        label="Uptime" value={data.uptime ? (data.uptime / 3600).toFixed(1) : '--'} unit="hrs" 
        icon={<Clock size={20} />} colorClass="text-slate-500" 
      />

      {/* Red y Sistema */}
      <SensorCard 
        label="Señal WiFi" value={data.rssi ?? '--'} unit="dBm" 
        icon={<Wifi size={20} />} colorClass="text-green-500" 
      />
      <SensorCard 
        label="Versión FW" value={data.firmware_version ?? 'v0.0'} unit="" 
        icon={<Tag size={20} />} colorClass="text-slate-400" 
      />
      <SensorCard 
        label="Código Error" value={data.error_code ?? '0'} unit="" 
        icon={<Activity size={20} />} colorClass={data.error_code ? "text-red-500" : "text-green-500"} 
      />
      <SensorCard 
        label="IP" value={data.local_ip ?? '0'} unit="" 
        icon={<Globe size={20} />} colorClass="text-green-500"
      />
    </div>
  );
};
