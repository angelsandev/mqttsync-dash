import { useMachines } from '../features/telemetry/hooks/useTelemetry';
import { MachineCard } from '../features/telemetry/components/MachineCard';

const Dashboard = () => {
    const { machines, loading, error } = useMachines();

    if (loading) return <div className="p-10 text-slate-600 dark:text-slate-400">Buscando máquinas activas...</div>;
    if (error) return <div className="p-10 text-red-500">{error}</div>;

    return (
        // bg-white para luz, bg-slate-950 para oscuro
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {machines.map((machineId) => (
                    <MachineCard key={machineId} machineId={machineId} />
                ))}
            </div>

            {machines.length === 0 && (
                <div className="text-slate-500 text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                    No se han detectado máquinas en el sistema.
                </div>
            )}
        </div>
    );
};

export default Dashboard;