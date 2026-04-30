import { useEffect, useState } from 'react';
import { telemetryService } from '../services/telemetryService';
import type { TelemetryData } from '../types/types';
import {Link} from 'react-router-dom';


interface Props {
    machineId: string;
}

export const MachineCard = ({ machineId }: Props) => {
    const [lastData, setLastData] = useState<TelemetryData | null>(null);

    useEffect(() => {
        const fetchCurrent = async () => {
            try {
                // Por ahora, para probar, pedimos el historial y cogemos el primero
                const history = await telemetryService.getMachineHistory(machineId);
                if (history.length > 0) {
                    setLastData(history[0]);
                }
            } catch (error) {
                console.error("Error cargando datos de máquina", error);
            }
        };
        fetchCurrent(); // Carga inicial
        // Polling cada 5 segundos
        
         const interval = setInterval(fetchCurrent, 5000);
         return () => clearInterval(interval);
 
    }, [machineId]);

    if (!lastData) return (
        <div className="p-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl h-48" />
    );




    return (
        /* Envolver todo en un Link que apunte a /machine/id */
        <Link to= {`/machine/${machineId}`} className="block transition-transform hover:scale-[1.01]">
        <div className="
            bg-white dark:bg-slate-900 
            p-6 rounded-2xl 
            border border-slate-200 dark:border-slate-800 
            hover:border-blue-500 dark:hover:border-blue-400 
            transition-all duration-300 
            shadow-sm dark:shadow-none 
            text-slate-900 dark:text-white
            flex flex-col justify-between
            min-h-55 /* Altura mínima fija para que todas sean iguales */
            w-full
        ">
            <div className="flex justify-between items-start gap-2 mb-6">
                <h3 className="text-xl font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 truncate">
                    {machineId}
                </h3>
                <span className={`
                    shrink-0 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                    ${lastData.status === 'online'
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'}
                `}>
                    ● {lastData.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold mb-1">Temperatura</p>
                    <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                        {lastData.temperature}<span className="text-sm font-sans ml-1">°C</span>
                    </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold mb-1">Presión</p>
                    <p className="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        {lastData.pressure || '0.0'}<span className="text-sm font-sans ml-1">bar</span>
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <span className="truncate mr-2">IP: {lastData.local_ip || '---'}</span>
                <span className="shrink-0 text-right">RSSI: {lastData.rssi} dBm</span>
            </div>
        </div>
        </Link>
    );


};

