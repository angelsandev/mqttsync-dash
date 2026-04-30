import { useState, useEffect } from "react";
import { telemetryService } from "../services/telemetryService";

export const useMachines = () => {
    const [machines, setMachines] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMachines = async (isFirstLoading: boolean) => {
            try {
                if(isFirstLoading) setLoading(true);// Solo mostramos spinner la primera vez
                const data = await telemetryService.getMachines();
                setMachines(data);
                setError(null);
            } catch (error) {
                setError("No se pudieron cargar las máquinas");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadMachines(true);// Carga inicial con spinner

        // CONFIGURA EL POLLING automático: pide datos cada 5 seg (sin spinner)
        
        const interval = setInterval(() => {
            loadMachines(false);
        }, 5000); // 5 segundos

        // LIMPIEZA (Esto evita fugas de memoria)
        return () => clearInterval(interval);


    }, []);

    return { machines, loading, error };

};


