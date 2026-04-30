import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { TelemetryData } from '../types/types';
import { MachineStats } from './MachineStats';
import { telemetryService } from '../services/telemetryService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MachineDetail = () => {
    // 1. Extraemos el ID de la URL (ej: "prensa-01")
    const { id } = useParams<{ id: string }>();
    const [history, setHistory] = useState<TelemetryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetail = async () => {
            try {
                // Aquí usamos el ID de la URL para pedir datos específicos al backend
                const data = await telemetryService.getMachineHistory(id!);
                setHistory(data);
            } catch (error) {
                console.error("Error cargando detalle", error);
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [id]);

    // Usamos 'loading' para evitar que se vea la página vacía
    if (loading) return <div className="p-10 text-white">Cargando historial...</div>;

    return (
        <div className="p-4">
            {/* Cabecera */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl hover:opacity-80 transition-all">
                    ← Volver
                </Link>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase">
                    {id}
                </h2>
            </div>

            {/* Pasamos el primer elemento del historial (el más reciente) */}
            <MachineStats data={history[history.length - 1]} />

            {/* Contenedor de la Gráfica */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white">Temperatura en Tiempo Real</h3>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={history}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                            <XAxis
                                dataKey="timestamp"
                                stroke="#64748b"
                                fontSize={12}
                                tickFormatter={(str) => {
                                    // Formatea la fecha "2024-05-30T10:00:00" a "10:00"
                                    const date = new Date(str);
                                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                }}
                            />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--tw-bg-opacity)', // Usará el color de fondo según el tema
                                    borderRadius: '12px',
                                    border: '1px solid #64748b'
                                }}
                                itemStyle={{ color: '#38bdf8' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="temperature" // Nombre exacto en tu JSON
                                stroke="#38bdf8"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#38bdf8' }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
