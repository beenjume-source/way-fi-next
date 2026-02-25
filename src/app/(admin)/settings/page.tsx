'use client';

import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Zap, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Configuración del Sistema</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <SettingCard
                        title="Integración de Supabase"
                        description="Gestiona la conexión con tu base de datos y servicios de autenticación."
                        icon={<Database className="w-5 h-5" />}
                    >
                        <div className="space-y-4 pt-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL del Proyecto</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurada'}
                                    className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 p-3 rounded-xl text-sm outline-none font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Anon Public Key</label>
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        readOnly
                                        value="••••••••••••••••••••••••••••••"
                                        className="flex-1 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-800 p-3 rounded-xl text-sm outline-none font-mono"
                                    />
                                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-sm font-bold hover:bg-cyan-700 transition-colors">Copiar</button>
                                </div>
                            </div>
                        </div>
                    </SettingCard>

                    <SettingCard
                        title="Seguridad de Administración"
                        description="Controla quién tiene acceso al panel de administración Way-FI."
                        icon={<Shield className="w-5 h-5" />}
                    >
                        <div className="space-y-4 pt-4">
                            <ToggleItem label="Autenticación de Dos Factores (2FA)" active />
                            <ToggleItem label="Bloqueo automático de sesión" active />
                            <ToggleItem label="Permitir acceso solo desde IPs autorizadas" />
                        </div>
                    </SettingCard>
                </div>

                {/* Sidebar widgets */}
                <div className="space-y-6">
                    <SettingCard
                        title="Estado del Sistema"
                        icon={<Activity className="w-5 h-5" />}
                    >
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">API Status</span>
                                <span className="flex items-center gap-1.5 text-green-500 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Online
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Database</span>
                                <span className="text-green-500 font-bold">Connected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Realtime Edge</span>
                                <span className="text-green-500 font-bold">Optimal</span>
                            </div>
                        </div>
                    </SettingCard>

                    <div className="bg-cyan-600 p-6 rounded-2xl shadow-lg shadow-cyan-500/20 text-white">
                        <Zap className="w-8 h-8 mb-4 opacity-50" />
                        <h3 className="font-bold mb-1">Plan Premium</h3>
                        <p className="text-xs opacity-80 mb-4">Tienes acceso a todas las funcionalidades avanzadas de administración.</p>
                        <button className="w-full bg-white text-cyan-600 py-2 rounded-xl text-sm font-bold hover:bg-cyan-50 transition-colors">Ver Detalles</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingCard({ title, description, icon, children }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm h-full">
            <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-cyan-600">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold">{title}</h3>
                    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

function ToggleItem({ label, active = false }: { label: string, active?: boolean }) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">{label}</span>
            <button className={`w-10 h-6 rounded-full transition-colors relative ${active ? 'bg-cyan-600' : 'bg-gray-200 dark:bg-zinc-800'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${active ? 'left-5' : 'left-1'}`}></div>
            </button>
        </div>
    );
}

function Activity({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}
