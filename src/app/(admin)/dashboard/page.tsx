'use client';

import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { TrendingUp, Users, Zap, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const data = [
    { name: 'Lun', leads: 400, execs: 2400 },
    { name: 'Mar', leads: 300, execs: 1398 },
    { name: 'Mie', leads: 200, execs: 9800 },
    { name: 'Jue', leads: 278, execs: 3908 },
    { name: 'Vie', leads: 189, execs: 4800 },
    { name: 'Sab', leads: 239, execs: 3800 },
    { name: 'Dom', leads: 349, execs: 4300 },
];

interface Lead {
    id: string;
    email: string;
    intent: string;
    status: string;
    created_at: string;
}

export default function DashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) {
                console.error('Error fetching leads:', error);
            } else {
                setLeads(data || []);
            }
            setLoading(false);
        };

        fetchLeads();

        // Suscripción en tiempo real
        const channel = supabase
            .channel('public:leads')
            .on('postgres_changes', { event: '*', table: 'leads', schema: 'public' }, () => {
                fetchLeads();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-8">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Leads Totales" value="1,284" change="+12%" icon={<Users className="w-6 h-6 text-cyan-600" />} />
                <StatCard title="Conversion Rate" value="3.2%" change="+2.4%" icon={<TrendingUp className="w-6 h-6 text-cyan-600" />} />
                <StatCard title="Ejecuciones Bot" value="85.4k" change="+18%" icon={<Zap className="w-6 h-6 text-cyan-600" />} />
                <StatCard title="Avg Response" value="1.4s" change="-0.2s" icon={<Clock className="w-6 h-6 text-cyan-600" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold">Actividad de Leads</h3>
                        <select className="text-xs border-gray-200 rounded-lg p-1 outline-none">
                            <option>Últimos 7 días</option>
                            <option>Últimos 30 días</option>
                        </select>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="leads" stroke="#0891b2" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bot Activity Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold mb-8">Ejecuciones de Agentes</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="execs" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Leads Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold">Leads Recientes</h3>
                    <button className="text-cyan-600 text-sm font-bold hover:underline underline-offset-4">Ver todos</button>
                </div>
                <div className="overflow-x-auto min-h-[200px] flex flex-col">
                    {loading ? (
                        <div className="flex-1 flex items-center justify-center p-12">
                            <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Intento</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 italic font-medium text-gray-600">
                                {leads.length > 0 ? (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="text-sm hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-900 leading-none">{lead.email}</td>
                                            <td className="px-6 py-4">{lead.intent || 'N/A'}</td>
                                            <td className="px-6 py-4 text-gray-400 font-normal">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${lead.status === 'new' ? 'bg-cyan-50 text-cyan-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                                            No hay leads registrados aún.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                    {icon}
                </div>
                <div className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {change}
                </div>
            </div>
            <div className="text-2xl font-black text-gray-900">{value}</div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{title}</div>
        </div>
    );
}
