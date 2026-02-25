'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, Image as ImageIcon } from 'lucide-react';

const FALLBACK_IMAGES = [
    '/images/way-fi/astro.png',
    '/images/way-fi/jaguar.png',
    '/images/way-fi/logo.png',
    '/images/way-fi/sol.png',
    '/images/way-fi/star.png',
    '/images/way-fi/main.png'
];

const getColorForImage = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
        'from-blue-500 via-indigo-500 to-purple-600',
        'from-amber-400 via-orange-500 to-red-600',
        'from-cyan-400 via-blue-500 to-purple-600',
        'from-yellow-400 via-orange-400 to-red-500',
        'from-teal-400 via-emerald-500 to-cyan-600',
        'from-pink-500 via-rose-500 to-purple-600'
    ];
    return colors[hash % colors.length];
};

export default function WayFiGallery({ size = 'large' }: { size?: 'small' | 'large' | 'hero' }) {
    const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/images');
                const data = await res.json();
                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                    if (data.images.length > FALLBACK_IMAGES.length) {
                        setShowUpdate(true);
                        setTimeout(() => setShowUpdate(false), 5000);
                    }
                }
            } catch (e) {
                console.error("Failed to load images from API", e);
            }
        };

        fetchImages();

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [images.length]);

    const currentImage = images[currentIndex];
    const currentColor = getColorForImage(currentImage);

    const dimensions = {
        small: 'w-12 h-12',
        large: 'w-full aspect-square max-w-[450px]',
        hero: 'w-full aspect-square max-w-[700px]'
    }[size];

    return (
        <div className={`relative ${dimensions} flex items-center justify-center transition-all duration-1000`}>
            {/* SVG Filter Definition - Corrected for maximum compatibility */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <defs>
                    <filter id="remove-white" colorInterpolationFilters="sRGB">
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    -1.5 -1.5 -1.5 4.5 -0.1"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Ambient Background Glow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`ambient-bg-${currentImage}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className={`absolute -inset-20 bg-gradient-to-tr ${currentColor} blur-[120px] rounded-full opacity-20 pointer-events-none`}
                />
            </AnimatePresence>

            {/* Frame Component */}
            <div className="absolute inset-0 border border-white/10 rounded-[40px] pointer-events-none overflow-hidden backdrop-blur-[2px] z-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-10" />
            </div>

            {/* Notification */}
            <AnimatePresence>
                {showUpdate && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 glass bg-cyan-500/10 border-cyan-500/30 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest"
                    >
                        <Bell className="w-3 h-3 animate-bounce" />
                        Nuevos Activos
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Image with Alpha Mask Filter */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -10 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-[80%] h-[80%] flex items-center justify-center z-10"
                    style={{ filter: 'url(#remove-white)' }}
                >
                    <Image
                        src={currentImage}
                        alt="Way-FI"
                        fill
                        className="object-contain transition-all duration-700"
                        priority
                        unoptimized // Avoid potential next/image compression artifacts that might break the filter
                    />
                </motion.div>
            </AnimatePresence>

            {/* Dynamic Footer Info */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 glass bg-black/40 border-white/5 rounded-xl text-[9px] text-muted tracking-tighter uppercase font-bold"
                >
                    <ImageIcon className="w-3 h-3 text-cyan-400" />
                    {currentIndex + 1} / {images.length}
                </motion.div>
            </div>
        </div>
    );
}
