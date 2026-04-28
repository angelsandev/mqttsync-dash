import { useState, useEffect } from 'react';
import axios from 'axios';

interface TelemetryResponse {
    device_id: string;
    status: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}

const Dashboard = () => {
    const [data, setData] = useState<TelemetryResponse | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llamar al endpoint de FASTAPI
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/telemetry/sensor01`);
                setData(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Error recuperando datos:", error);
                setLoading(false);
            }
        }


        fetchData(); // Primera carga

        // Actualizar cada 5 segundos para que sea "tiempo real"
        const interval = setInterval(fetchData, 5000); // Polling cada 5 segundos
        return () => clearInterval(interval);
    }, []);// Array vacío = solo se ejecuta al montar

    if (loading) return <p className="text-white">Cargando telemetría...</p>;
    
    // Si no hay data después de cargar, mostramos error
    if (!data) return <p className="text-white">No hay datos del sensor.</p>;


    return (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg text-white">
            <h2 className="text-xl font-bold mb-2">Estado de: {data.device_id}</h2>
            <p className="text-slate-400"><strong>Estado:</strong> {data.status}</p>
            <hr className="my-4 border-slate-700" />
            <p className="text-3xl font-bold text-blue-400">🌡️ {data.temperature} °C</p>
            <p className="text-3xl font-bold text-cyan-400">💧 {data.humidity} %</p>
            <div className="mt-4 text-xs text-slate-500">
                Última actualización: {data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}
            </div>
        </div>
    );

};
export default Dashboard;