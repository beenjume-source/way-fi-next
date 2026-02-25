'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Download, Globe, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function TerminalLeadMagnet() {
    const [history, setHistory] = useState<string[]>([
        'Welcome to Way-FI Terminal v1.0.4',
        'Type "blueprint" to get our automation template.',
        'System status: OPTIMAL'
    ]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState<'command' | 'email'>('command');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.toLowerCase();
        setHistory(prev => [...prev, `> ${input}`]);
        setInput('');

        if (step === 'command') {
            if (cmd === 'blueprint' || cmd === 'descargar' || cmd === 'blueprints') {
                setHistory(prev => [...prev, 'System: Accesando a base de datos de Blueprints...', 'System: Por favor, ingresa tu email para autorizar la descarga:']);
                setStep('email');
            } else if (cmd === 'help') {
                setHistory(prev => [...prev, 'Available commands: blueprint, clear, help, status']);
            } else if (cmd === 'clear') {
                setHistory([]);
            } else {
                setHistory(prev => [...prev, `Command not found: ${cmd}. Type "help" for a list of commands.`]);
            }
        } else if (step === 'email') {
            const email = input.trim();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setHistory(prev => [...prev, 'System: Validando email...', 'System: ¡Acceso concedido! Preparando agent-template-v1.json']);

                // Save to Supabase (Lead)
                try {
                    await supabase.from('leads').insert([{ email, intent: 'blueprint_download', status: 'high_priority' }]);
                } catch (err) {
                    console.error('Supabase error:', err);
                }

                setTimeout(() => {
                    setHistory(prev => [...prev, 'System: Descarga iniciada. Revisa tu carpeta de descargas.']);
                    downloadJson();
                    setStep('command');
                }, 1500);
            } else {
                setHistory(prev => [...prev, 'Error: Formato de email inválido. Reintenta:']);
            }
        }
    };

    const downloadJson = () => {
        const data = {
            name: "Way-FI AI Agent Template",
            version: "1.0",
            nodes: [
                { id: "1", type: "webhook", name: "Incoming Webhook" },
                { id: "2", type: "ai-agent", name: "RAG Processor" },
                { id: "3", type: "crm-action", name: "Sincronizador CRM" }
            ],
            connections: ["1->2", "2->3"]
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'agent-template-v1.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section className="py-24 bg-app overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative bg-black/40">

                        {/* Header */}
                        <div className="bg-black/60 px-4 py-3 border-b border-white/5 flex items-center justify-between relative z-20">
                            <div className="flex items-center gap-3">
                                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs font-mono text-muted">bash — way-fi-terminal — 80x24</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            </div>
                        </div>

                        {/* Screen with main.png background image */}
                        <div className="relative group">
                            {/* main.png background integration: Adjusted for better distinction */}
                            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] transition-opacity duration-700">
                                <Image
                                    src="/images/way-fi/main.png"
                                    alt=""
                                    fill
                                    className="object-contain grayscale brightness-125 contrast-110"
                                />
                            </div>

                            <div
                                ref={scrollRef}
                                className="p-8 h-[450px] font-mono text-sm overflow-y-auto bg-[#020202]/70 text-white/80 relative z-10 backdrop-blur-[1px]"
                            >
                                {history.map((line, i) => (
                                    <div key={i} className={`mb-1 ${line.startsWith('>') ? 'text-cyan-400 font-bold' : ''}`}>
                                        {line}
                                    </div>
                                ))}
                                <form onSubmit={handleCommand} className="flex mt-4">
                                    <span className="text-cyan-400 mr-2">$</span>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0"
                                        autoFocus
                                        placeholder={step === 'email' ? 'ingresa tu email...' : 'escribe "blueprint" para descargar...'}
                                    />
                                </form>
                            </div>
                        </div>

                        {/* Footer / Features */}
                        <div className="bg-black/60 p-5 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-20">
                            <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-tight">
                                <Download className="w-3 h-3 text-cyan-400" /> AUTO-SYNC
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-tight">
                                <Globe className="w-3 h-3 text-cyan-400" /> EDGE-NET
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-tight">
                                <Lock className="w-3 h-3 text-cyan-400" /> SECURE-OPS
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted font-bold tracking-tight">
                                <TerminalIcon className="w-3 h-3 text-cyan-400" /> HEADLESS
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-muted/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Way-FI Core Infrastructure v1.0
                    </div>
                </div>
            </div>

            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px] pointer-events-none" />
        </section>
    );
}
