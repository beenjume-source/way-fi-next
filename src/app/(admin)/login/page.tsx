'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (user === 'benjume' && pwd === 'benjume$$') {
            // Mock login success
            router.push('/dashboard');
        } else {
            alert('Credenciales inválidas');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="text-3xl font-black tracking-tighter text-cyan-600 mb-2">WAY-FI OS</div>
                    <div className="text-sm text-gray-500 font-medium">Panel de Control de Ecosistemas</div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Usuario</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-12 outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="admin user"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                <input
                                    type="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-12 outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-cyan-600 transition-all group"
                        >
                            Acceder al Sistema
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-gray-400 font-medium">
                    Acceso restringido a personal de Way-FI Inc.
                </p>
            </div>
        </div>
    );
}
