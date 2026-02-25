'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bot, Sparkles, Cpu, Zap } from 'lucide-react';

const agents = [
    {
        name: "Eco-Consultora",
        role: "Administración & Estrategia",
        image: "/images/way-fi/CONSULTORA MODELO.png",
        description: "Especialista en gestión de agendas, citas y atención al cliente 24/7. Su aliado en la primera línea de contacto.",
        color: "from-cyan-400/20 to-blue-500/20",
        borderColor: "border-cyan-500/30",
        icon: <Bot className="w-5 h-5 text-cyan-400" />
    },
    {
        name: "Orquestador N8N",
        role: "Automatización de Procesos",
        image: "/images/way-fi/MODELO N8N.png",
        description: "Motor de lógica pura. Conecta sus herramientas favoritas y automatiza flujos de trabajo complejos sin intervención humana.",
        color: "from-purple-400/20 to-purple-600/20",
        borderColor: "border-purple-500/30",
        icon: <Cpu className="w-5 h-5 text-purple-400" />
    },
    {
        name: "Ingeniero Full-Stack",
        role: "Desarrollo & Despliegue",
        image: "/images/way-fi/FULL STRACK MODELO.png",
        description: "Transforma requerimientos en arquitecturas escalables. Desde el Frontend hasta el despliegue automático en la nube.",
        color: "from-emerald-400/20 to-teal-500/20",
        borderColor: "border-emerald-500/30",
        icon: <Zap className="w-5 h-5 text-emerald-400" />
    }
];

export default function AIAgents() {
    return (
        <section id="agentes" className="py-24 bg-black/20">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300">Equipo Inteligente</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">Nuestros Agentes Especializados</h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Conozca la fuerza de trabajo digital que impulsará su empresa hacia la eficiencia total.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {agents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-[40px] border ${agent.borderColor} bg-gradient-to-b ${agent.color} backdrop-blur-md hover:scale-[1.02] transition-all duration-500 shadow-2xl`}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={agent.image}
                                    alt={agent.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                {/* Overlay Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 glass rounded-lg bg-black/40">
                                            {agent.icon}
                                        </div>
                                        <span className="text-xs font-bold text-white/60 tracking-widest uppercase">{agent.role}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">{agent.name}</h3>
                                    <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                                        {agent.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Details */}
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                                <div className="p-8 pt-0 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            const event = new CustomEvent('open-concierge', {
                                                detail: { message: `Hola, me interesa saber más sobre la ayuda de ${agent.name}.` }
                                            });
                                            window.dispatchEvent(event);
                                        }}
                                        className="w-full py-4 glass rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all border border-white/10"
                                    >
                                        Solicitar Asistencia
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
