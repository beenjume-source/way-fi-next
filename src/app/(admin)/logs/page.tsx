'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Activity, Terminal, Clock } from 'lucide-react';

interface AgentLog {
    id: string;
    session_id: string;
    node_name: string;
    message: string;
    data: any;
    created_at: string;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<AgentLog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('agent_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Error fetching logs:', error);
        } else {
            setLogs(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Logs de Agentes</h2>
                <button
                    onClick={fetchLogs}
                    className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
                >
                    Actualizar
                </button>
            </div>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden font-mono">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-zinc-400">AGENT_CONSOLE v1.0</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                </div>

                <div className="p-4 overflow-y-auto max-h-[600px] space-y-3 min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center p-20">
                            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        </div>
                    ) : logs.length > 0 ? (
                        logs.map((log) => (
                            <div key={log.id} className="text-xs group border-l-2 border-transparent hover:border-cyan-500/50 pl-3 transition-colors">
                                <div className="flex items-center gap-3 text-zinc-500 mb-1">
                                    <span className="text-cyan-400/80">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                                    <span className="uppercase tracking-widest text-[10px] bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-300">
                                        {log.node_name}
                                    </span>
                                    <span className="text-zinc-600 truncate max-w-[200px]">ID: {log.session_id}</span>
                                </div>
                                <div className="text-zinc-300 group-hover:text-white transition-colors">
                                    {log.message}
                                </div>
                                {log.data && Object.keys(log.data).length > 0 && (
                                    <pre className="mt-2 text-zinc-500 bg-black/30 p-2 rounded-lg overflow-x-auto text-[10px]">
                                        {JSON.stringify(log.data, null, 2)}
                                    </pre>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-zinc-600 text-xs uppercase tracking-[0.2em]">
                            No hay logs registrados en el sistema.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
