//import { Thermometer, Activity, Zap, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard from './components/Dashboard';
import { MainLayout } from './layouts/MainLayout';




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

    <MainLayout>

      <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            MQTTSync-Dash
          </h1>
          <p className="text-slate-500 mt-1">Panel de Control Industrial</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">MQTT Online</span>
        </div>
      </header>


      {/* Componente Dashboard con los datos JSON */}
      <div className="mb-10">
        <Dashboard />
      </div>


      {/* SECCIÓN DE TARJETAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">



        {/* Tarjetas de pruebas */}
        {/*}
        <StatCard title="Máquina 01" value="24.5°C" icon={<Thermometer className="text-blue-400" />} trend="+1.2%" />
        <StatCard title="Máquina 02" value="28.1°C" icon={<Thermometer className="text-orange-400" />} trend='-0.5%' />
        <StatCard title="Consumo" value="1.2 kW" icon={<Zap className="text-yellow-400" />} trend="Estable" />
        <StatCard title="CPU" value="14%" icon={<Cpu className="text-purple-400" />} trend="Baja" />
      */}

      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          {/*}
          <Activity className="text-blue-400" size={20} />
          */}
          <h2 className="text-xl font-semibold">Temperatura en Tiempo Real</h2>
        </div>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </MainLayout>


  );
}
