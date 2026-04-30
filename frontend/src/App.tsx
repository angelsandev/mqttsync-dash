//import { Thermometer, Activity, Zap, Cpu } from 'lucide-react';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard from './components/Dashboard';
import { MainLayout } from './layouts/MainLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MachineDetail } from './features/telemetry/components/MachineDetail';

// Componente temporal para la vista de detalle (lo crearemos a fondo en el siguiente paso)
/*
const MachineDetailPlaceholder = () => (
  <div className="p-10 text-white">
    <h2 className="text-2xl font-bold">Cargando detalles de la máquina...</h2>
    <p className="text-slate-400 mt-2">Aquí irá la gráfica y todos los sensores.</p>
  </div>
);
*/

/*
// 1. Definimos la "forma" de nuestros datos (Contrato)
interface TelemetryData {
  time: string;
  temp: number;
}


const data: TelemetryData[] = [
  { time: '10:00', temp: 22 },
  { time: '10:05', temp: 23.5 },
  { time: '10:10', temp: 24 },
  { time: '10:15', temp: 22.8 },
  { time: '10:20', temp: 26 },
];
*/

// 2. Tipamos las Props del componente
/*
interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}
*/

/*
const StatCard = ({ title, value, icon, trend }: CardProps) => (
  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-800 rounded-lg">{icon}</div>
      <span className={`text-xs font-medium px-2 py-1 rounded ${trend.includes('+') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1 text-white">{value}</p>
  </div>
);
*/



export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {/* Ruta Principal: Muestra el Dashboard con todas las cards */}
          <Route path="/" element={
            <>
              <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
                <div>
                  <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    MQTTSync-Dash
                  </h1>
                  <p className="text-slate-500 mt-1">Panel de Control Industrial</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Sistema Online</span>
                </div>
              </header>
              
              <Dashboard />
            </>
          } />

          {/* Ruta de Detalle: El ":id" es un parámetro dinámico */}
          <Route path="/machine/:id" element={<MachineDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
