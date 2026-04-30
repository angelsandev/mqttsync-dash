import React from 'react';

interface SensorCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  colorClass: string;
}

export const SensorCard = ({ label, value, unit, icon, colorClass }: SensorCardProps) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${colorClass}`}>
        {icon}
      </div>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline gap-1 mt-1">
      <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
        {value}
      </span>
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {unit}
      </span>
    </div>
  </div>
);
