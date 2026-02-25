'use client';

import { motion } from 'framer-motion';
import { Layers, Cpu, Database, Network } from 'lucide-react';

const services = [
    {
        icon: <Layers className="w-8 h-8 text-cyan-400" />,
        title: "Desarrollo Full Stack",
        description: "Frontend & Backend escalable diseñado para soportar alta carga de procesos concurrentes.",
        features: ["Next.js 14 Expert", "Edge Computing", "Real-time DB"]
    },
    {
        icon: <Network className="w-8 h-8 text-purple-400" />,
        title: "Orquestación (n8n)",
        description: "Workflows autónomos que conectan APIs sin fricción y automatizan la toma de decisiones.",
        features: ["Auto-healing flows", "Custom Nodes", "API Orchestration"]
    },
    {
        icon: <Cpu className="w-8 h-8 text-cyan-400" />,
        title: "Agentes RAG",
        description: "Bots de lenguaje cargados con su propia base de conocimiento que ejecutan acciones en su CRM.",
        features: ["Vector Databases", "Function Calling", "Multi-agent systems"]
    }
];

export default function ServicesSection() {
    return (
        <section id="servicios" className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 glass rounded-3xl hover:border-cyan-500/30 transition-all group"
                        >
                            <div className="mb-6 p-4 bg-app border border-app w-fit rounded-2xl group-hover:neon-cyan transition-all">
                                {s.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                            <p className="text-muted mb-8 text-sm leading-relaxed">{s.description}</p>
                            <ul className="space-y-3">
                                {s.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-2 text-xs font-medium text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
