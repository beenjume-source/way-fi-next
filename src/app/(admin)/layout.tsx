'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, Settings, LogOut, Moon, Sun } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [darkMode, setDarkMode] = useState(false);

    // Persistencia del tema
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className={`w-64 border-r flex flex-col transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                    <div className="text-xl font-bold tracking-tight text-cyan-600">WAY-FI ADMIN</div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={pathname === '/dashboard'} darkMode={darkMode} />
                    <NavItem href="/leads" icon={<Users className="w-5 h-5" />} label="Leads" active={pathname === '/leads'} darkMode={darkMode} />
                    <NavItem href="/logs" icon={<Activity className="w-5 h-5" />} label="Logs de Agentes" active={pathname === '/logs'} darkMode={darkMode} />
                    <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Configuración" active={pathname === '/settings'} darkMode={darkMode} />
                </nav>

                <div className={`p-4 border-t ${darkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                    <button
                        onClick={toggleDarkMode}
                        className={`flex items-center gap-3 p-3 rounded-xl w-full transition-all text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                    </button>
                    <button className="flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-3 rounded-xl w-full transition-colors text-sm font-medium">
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className={`h-16 border-b flex items-center justify-between px-8 transition-colors duration-300 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <h1 className="text-lg font-bold">Resumen General</h1>
                    <div className="flex items-center gap-4">
                        <div className={`text-sm font-medium ${darkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Super Admin: benjume</div>
                        <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">B</div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false, darkMode = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean, darkMode?: boolean }) {
    const activeClasses = darkMode
        ? 'bg-cyan-900/20 text-cyan-400'
        : 'bg-cyan-50 text-cyan-600';

    const inactiveClasses = darkMode
        ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
        : 'text-gray-500 hover:bg-gray-100';

    return (
        <Link href={href} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium ${active ? activeClasses : inactiveClasses}`}>
            {icon}
            {label}
        </Link>
    );
}
