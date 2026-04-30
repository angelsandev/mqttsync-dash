import { useState, useEffect } from "react";
import { telemetryService } from "../services/telemetryService";

export const useMachines = () => {
    const [machines, setMachines] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMachines = async () => {
            try {
                setLoading(true);
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
        loadMachines();

        // CONFIGURA EL POLLING automático: pide datos cada 5 seg
        /*
        const interval = setInterval(() => {
            loadMachines();
        }, 5000); // 5 segundos

        // LIMPIEZA (Esto evita fugas de memoria)
        return () => clearInterval(interval);
*/

    }, []);

    return { machines, loading, error };

};


