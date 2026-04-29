// src/layouts/MainLayout.tsx
import React from 'react';
import { Navbar } from '../components/Navbar';

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

            {/* Contenedor principal para centrar el contenido */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Navbar />
                <main>
                    {children}
                </main>
            </div>
        </div>
    );


}
