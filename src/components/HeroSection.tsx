'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Zap, Eye, EyeOff } from 'lucide-react';
import WayFiGallery from './WayFiGallery';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [isGalleryHidden, setIsGalleryHidden] = useState(false);

    // Smooth Parallax movement (Hero only needs logo now)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Parallax values for the logo remaining in the hero
    const parallaxX1 = useTransform(smoothX, [-500, 500], [-30, 30]);
    const parallaxY1 = useTransform(smoothY, [-500, 500], [-30, 30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const toggleGallery = () => {
        const newState = !isGalleryHidden;
        setIsGalleryHidden(newState);
        window.dispatchEvent(new CustomEvent('toggle-wayfi-gallery', { detail: { hidden: newState } }));
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Ambient Animation */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Parallax Floating Element: Solo Logo */}
            <AnimatePresence>
                {isGalleryHidden && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 100 }}
                            animate={{ opacity: 0.3, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.1, x: 100 }}
                            style={{ x: parallaxX1, y: parallaxY1 }}
                            className="absolute top-[10%] right-[10%] w-[450px] h-[450px] filter blur-[1px]"
                        >
                            <Image src="/images/way-fi/logo.png" alt="WayFi Logo Parallax" fill className="object-contain" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-cyan-400 uppercase glass rounded-full border border-cyan-500/30 neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            Agencia de Ecosistemas Digitales
                        </span>

                        <div className="flex items-start flex-col gap-2 mb-4">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                                Way-Fi:
                            </h1>
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 block">
                                    Aliado Digital Inteligente
                                </span>
                                <button
                                    onClick={toggleGallery}
                                    className="p-3 glass rounded-full hover:bg-cyan-500/20 transition-all active:scale-95 group relative border border-cyan-500/30 overflow-hidden shadow-lg"
                                    title={isGalleryHidden ? 'Mostrar Galería' : 'Ocultar Galería'}
                                >
                                    <div className="relative z-10">
                                        {isGalleryHidden ? (
                                            <Eye className="w-6 h-6 text-cyan-400 animate-pulse" />
                                        ) : (
                                            <EyeOff className="w-6 h-6 text-muted group-hover:text-cyan-400 transition-colors" />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-light text-muted/70 mb-10 italic tracking-wide">
                            Smart Digital Ally
                        </h2>

                        <p className="text-xl text-muted mb-12 max-w-xl leading-relaxed">
                            Desarrollo de Software + Automatización n8n + Ads.
                            Creamos arquitecturas unificadas con Agentes Inteligentes que escalan su negocio de forma autónoma.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={() => {
                                    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full sm:w-auto px-10 py-5 bg-[var(--btn-bg)] text-[var(--btn-text)] font-bold rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg shadow-cyan-500/10"
                            >
                                Ver Demo del Agente
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => {
                                    const event = new CustomEvent('open-concierge', { detail: { message: 'Hola, me gustaría agendar una consultoría técnica.' } });
                                    window.dispatchEvent(event);
                                }}
                                className="w-full sm:w-auto px-10 py-5 glass rounded-2xl hover:bg-[var(--glass-bg)] hover:scale-105 transition-all duration-300 font-medium"
                            >
                                Agendar Consultoría
                            </button>
                        </div>
                    </motion.div>

                    {/* Gallery Section */}
                    <motion.div
                        animate={{
                            opacity: isGalleryHidden ? 0 : 1,
                            scale: isGalleryHidden ? 0.8 : 1,
                            x: isGalleryHidden ? 100 : 0,
                            filter: isGalleryHidden ? 'blur(20px)' : 'blur(0px)'
                        }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="relative flex items-center justify-center p-8"
                    >
                        {!isGalleryHidden && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 blur-[120px] rounded-full" />
                                <WayFiGallery size="hero" />

                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-10 -right-10 glass p-4 rounded-2xl hidden xl:block border border-white/10"
                                >
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-10 -left-10 glass p-4 rounded-2xl hidden xl:block border border-white/10"
                                >
                                    <Bot className="w-6 h-6 text-purple-400" />
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 glass rounded-3xl text-left hover:border-cyan-500/30 transition-all group hover:bg-white/5 active:scale-[0.98]">
            <div className="w-14 h-14 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:neon-cyan transition-all">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-muted leading-relaxed opacity-80">{description}</p>
        </div>
    );
}
