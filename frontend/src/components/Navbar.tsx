// src/components/Navbar.tsx
import {Activity, Sun, Moon} from 'lucide-react';
import { useTheme } from '../context/useTheme';

export const Navbar = () =>{
    const {darkMode, toogleDarkMode} = useTheme();

    return(
        <nav className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 transition-colors duration-300">
      {/* Lado Izquierdo: Logo y Título */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500 rounded-lg text-white">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            MQTTSync-Dash
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
            Industrial Monitoring
          </p>
        </div>
      </div>

      {/* Lado Derecho: Acciones y Estado */}
      <div className="flex items-center gap-4">
        

        {/* Indicador de Estado MQTT */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">MQTT ONLINE</span>
        </div>
        {/* Botón de Modo Oscuro */}
        <button
          onClick={toogleDarkMode}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:ring-2 ring-blue-500/50 transition-all cursor-pointer"
          title={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>



    );











};// end NavBar