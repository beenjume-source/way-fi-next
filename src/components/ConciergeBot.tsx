'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Calendar, CreditCard, ChevronRight, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Message {
    role: 'user' | 'bot';
    text: string;
    type?: string;
    data?: any;
}

export default function ConciergeBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: 'Hola, soy el Agente Concierge de Way-FI. ¿Cómo puedo potenciar tu ecosistema digital hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setIsOpen(true);
            if (e.detail?.message) {
                // Si viene de un botón externo, simulamos el envío de ese mensaje
                setTimeout(() => {
                    handleSend(e.detail.message);
                }, 500);
            }
        };
        window.addEventListener('open-concierge', handleOpen);
        return () => window.removeEventListener('open-concierge', handleOpen);
    }, []);

    const handleSend = async (forcedMsg?: string) => {
        const userMsg = forcedMsg || input;
        if (!userMsg.trim() || isTyping) return;

        if (!forcedMsg) setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            const resp = await fetch('/api/chat-agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await resp.json();

            setMessages(prev => [...prev, { role: 'bot', text: data.text, type: data.type, data: data.data }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'bot', text: 'Lo siento, tuve un error en mi red neuronal. Reintenta.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const completeAction = (type: string) => {
        if (type === 'calendar') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f7ff', '#bc13fe']
            });
            setMessages(prev => [...prev, { role: 'bot', text: '¡Cita agendada! Te hemos enviado un correo de confirmación.' }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {!isOpen ? (
                    <motion.button
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 20 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform neon-cyan group"
                    >
                        <Bot className="text-black w-8 h-8 group-hover:animate-pulse" />
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="w-[90vw] md:w-96 h-[600px] glass rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-bold text-black dark:text-white">Way-FI Concierge</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter font-bold">AI Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-gray-50 dark:bg-zinc-950/50"
                        >
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${m.role === 'user'
                                        ? 'bg-cyan-500 text-black font-semibold'
                                        : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white border border-black/5 dark:border-white/10'
                                        }`}>
                                        {m.text}

                                        {/* Interactive Widgets */}
                                        {m.role === 'bot' && m.type === 'CALENDAR_WIDGET' && (
                                            <div className="mt-4 p-3 bg-zinc-100 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/10">
                                                <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
                                                    {['Mañana 10:00', 'Mañana 15:00', '28 Ene 09:00', '28 Ene 11:30'].map(time => (
                                                        <button
                                                            key={time}
                                                            onClick={() => completeAction('calendar')}
                                                            className="py-2 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold"
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                                                    <Calendar className="w-3 h-3" />
                                                    Horarios disponibles (GMT-6)
                                                </div>
                                            </div>
                                        )}

                                        {m.role === 'bot' && m.type === 'STRIPE_CARD' && (
                                            <div className="mt-4 p-4 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-black rounded-xl border border-purple-500/30 shadow-md">
                                                <div className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 mb-1">Plan Agency Focus</div>
                                                <div className="text-xl font-bold mb-3 text-black dark:text-white">$1,499<span className="text-xs text-zinc-500 ml-1">/mes</span></div>
                                                <ul className="text-[10px] space-y-1 mb-4 text-zinc-600 dark:text-zinc-400">
                                                    <li className="flex items-center gap-2"> <CheckCircle2 className="w-3 h-3 text-cyan-500" /> 5 Workflows n8n</li>
                                                    <li className="flex items-center gap-2"> <CheckCircle2 className="w-3 h-3 text-cyan-500" /> Lead Management Pro</li>
                                                </ul>
                                                <button className="w-full py-2 bg-purple-600 rounded-lg text-xs font-bold hover:bg-purple-500 flex items-center justify-center gap-2 text-white">
                                                    <CreditCard className="w-3 h-3" />
                                                    Contratar Ahora
                                                </button>
                                            </div>
                                        )}

                                        {m.role === 'bot' && m.type === 'CONTACT_FORM' && (
                                            <div className="mt-4 p-4 bg-zinc-100 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/10 space-y-3">
                                                <div className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2">Formulario de Auditoría</div>
                                                <input
                                                    id="contact_name"
                                                    placeholder="Nombre del Cliente (CTE)"
                                                    className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-black dark:text-white placeholder:text-zinc-400"
                                                />
                                                <input
                                                    id="contact_company"
                                                    placeholder="Nombre de la Empresa"
                                                    className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-black dark:text-white placeholder:text-zinc-400"
                                                />
                                                <input
                                                    id="contact_whatsapp"
                                                    placeholder="Teléfono / WhatsApp"
                                                    className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-black dark:text-white placeholder:text-zinc-400"
                                                />
                                                <input
                                                    id="contact_email"
                                                    placeholder="Correo Electrónico"
                                                    className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-black dark:text-white placeholder:text-zinc-400"
                                                />
                                                <div className="flex gap-2">
                                                    <select
                                                        id="contact_type"
                                                        className="w-1/2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-[10px] text-black dark:text-white"
                                                    >
                                                        <option value="virtual">Virtual</option>
                                                        <option value="presencial">Presencial</option>
                                                    </select>
                                                    <input
                                                        id="contact_date"
                                                        type="date"
                                                        className="w-1/2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-[10px] text-black dark:text-white"
                                                    />
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        const name = (document.getElementById('contact_name') as HTMLInputElement).value;
                                                        const company = (document.getElementById('contact_company') as HTMLInputElement).value;
                                                        const phone = (document.getElementById('contact_whatsapp') as HTMLInputElement).value;
                                                        const email = (document.getElementById('contact_email') as HTMLInputElement).value;
                                                        const date = (document.getElementById('contact_date') as HTMLInputElement).value;

                                                        if (!name || !phone || !company) return alert('Por favor, completa los campos principales.');

                                                        setMessages(prev => [...prev, {
                                                            role: 'bot',
                                                            text: `¡Perfecto ${name}! Estoy procesando tu solicitud de auditoría para ${company}...`,
                                                            type: 'TEXT'
                                                        }]);

                                                        try {
                                                            // Guardar en Supabase via API
                                                            const res = await fetch('/api/schedule', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({ name, company, phone, email, date, intent: 'auditoria' })
                                                            });

                                                            if (res.ok) {
                                                                confetti({
                                                                    particleCount: 150,
                                                                    spread: 70,
                                                                    origin: { y: 0.6 },
                                                                    colors: ['#00f7ff', '#bc13fe']
                                                                });

                                                                setMessages(prev => [...prev, {
                                                                    role: 'bot',
                                                                    text: `¡Listo! Se ha enviado la notificación. Si prefieres hablar ahora mismo, haz clic aquí:`,
                                                                    type: 'TEXT'
                                                                }, {
                                                                    role: 'bot',
                                                                    text: 'Abrir WhatsApp Directo',
                                                                    type: 'WA_LINK',
                                                                    data: { url: `https://wa.me/522271009744?text=Hola,%20soy%20${encodeURIComponent(name)}%20de%20${encodeURIComponent(company)}.%20Acabo%20de%20agendar%20una%20auditoría%20en%20el%20sitio%20web.` }
                                                                }]);
                                                            }
                                                        } catch (e) {
                                                            setMessages(prev => [...prev, { role: 'bot', text: 'Tuvimos un problema técnico, pero puedes contactarnos directamente aquí.', type: 'TEXT' }]);
                                                        }
                                                    }}
                                                    className="w-full py-3 bg-cyan-600 rounded-lg text-[10px] font-extrabold hover:bg-cyan-500 text-black uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                                                >
                                                    Confirmar Solicitud de Auditoría
                                                </button>
                                            </div>
                                        )}

                                        {m.role === 'bot' && m.type === 'WA_LINK' && (
                                            <a
                                                href={m.data?.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 flex items-center justify-center gap-2 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 font-bold text-xs hover:bg-green-500/30 transition-all"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Contactar por WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl flex gap-1 border border-black/5 dark:border-white/10">
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe tu consulta..."
                                    className="w-full bg-zinc-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 pr-12 text-sm text-black dark:text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                    className="absolute right-2 top-2 p-2 text-cyan-600 dark:text-cyan-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-30"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
