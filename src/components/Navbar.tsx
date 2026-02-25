'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
    const [isGalleryHidden, setIsGalleryHidden] = useState(false);

    useEffect(() => {
        const handleToggle = (e: any) => {
            setIsGalleryHidden(e.detail.hidden);
        };
        window.addEventListener('toggle-wayfi-gallery', handleToggle);
        return () => window.removeEventListener('toggle-wayfi-gallery', handleToggle);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="container mx-auto glass rounded-2xl px-8 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        WAY-FI
                    </Link>

                    <AnimatePresence>
                        {isGalleryHidden && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                                className="border-l border-white/10 pl-6 h-10 flex items-center gap-4 group"
                            >
                                {/* The specified "WayFi Image from the folder" (logo.png) */}
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="/images/way-fi/logo.png"
                                        alt="WayFi Nav Logo"
                                        fill
                                        className="object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest hidden lg:block">
                                    Modo Explorer Activo
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
                    <Link href="#demo" className="hover:text-cyan-400 transition-colors">Agente Demo</Link>
                    <Link href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</Link>
                    <Link href="#nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</Link>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => {
                            const event = new CustomEvent('open-concierge', { detail: { message: 'Hola, me gustaría iniciar un nuevo proyecto con WAY-FI.' } });
                            window.dispatchEvent(event);
                        }}
                        className="px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-sm font-bold hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-cyan-500/20"
                    >
                        Iniciar Proyecto
                    </button>
                </div>
            </div>
        </nav>
    );
}
