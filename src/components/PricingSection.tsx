'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';

const plans = [
    {
        name: 'Starter Trial',
        type: 'Prueba',
        price: 'Gratis',
        duration: '14 días',
        description: 'Experimenta el poder de la automatización autónoma.',
        features: [
            '1 Workflow Activo',
            'Integración con WhatsApp',
            'Dashboard de Monitoreo',
            'Soporte por Comunidad'
        ],
        icon: Zap,
        color: 'from-cyan-500 to-blue-500',
        buttonText: 'Iniciar Prueba',
        popular: false
    },
    {
        name: 'Agency Focus',
        type: 'Membresía',
        price: '$950',
        duration: 'MXN / DÍA',
        description: 'Menos de lo que cuesta una comida de negocios para automatizar toda tu agencia.',
        features: [
            '5 Workflows Autónomos',
            'IA Multi-Agente',
            'Soporte Prioritario',
            'Dashboard de KPIs en Vivo'
        ],
        icon: Crown,
        color: 'from-purple-500 to-pink-500',
        buttonText: 'Subscribirse',
        popular: true
    },
    {
        name: 'Custom Core',
        type: 'Fijo',
        price: '$260',
        duration: 'MXN / DÍA*',
        description: 'Sé dueño de tu tecnología por el precio de un desayuno premium.',
        features: [
            'Propiedad Intelectual 100%',
            'Código Fuente Propio',
            'Infraestructura Privada',
            'Sin Cuotas Mensuales'
        ],
        icon: Shield,
        color: 'from-amber-400 to-orange-500',
        buttonText: 'Solicitar Proyecto',
        popular: false
    }
];

export default function PricingSection() {
    const handlePlanClick = (planName: string) => {
        // Dispatch event to open concierge with a specific message
        const event = new CustomEvent('open-concierge', {
            detail: { message: `Hola, me interesa el plan ${planName} en Pesos Mexicanos. Quiero agendar una auditoría.` }
        });
        window.dispatchEvent(event);
    };

    return (
        <section id="pricing" className="py-24 bg-app relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
                            Inversión en Eficiencias
                        </h2>
                        <p className="text-muted text-lg max-w-2xl mx-auto">
                            Modelos de inversión en Pesos Mexicanos (MXN) para escalar tu operación.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative glass rounded-3xl p-8 flex flex-col border border-white/10 ${plan.popular ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1 px-4 rounded-full">
                                    Más Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <plan.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-2 block">
                                    {plan.type}
                                </span>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-muted text-sm leading-relaxed mb-6">{plan.description}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black">{plan.price}</span>
                                    <span className="text-muted text-[10px] font-bold uppercase tracking-wider">{plan.duration}</span>
                                </div>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-muted/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => handlePlanClick(plan.name)}
                                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-[1.02] shadow-purple-500/20'
                                    : 'bg-white/10 text-foreground hover:bg-white/20'
                                    }`}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/[0.03] blur-[150px] pointer-events-none`} />
        </section>
    );
}
