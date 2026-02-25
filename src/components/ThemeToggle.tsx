'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass hover:scale-105 transition-all cursor-pointer overflow-hidden flex items-center justify-center"
            aria-label="Toggle Theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'light' ? (
                        <Moon className="w-6 h-6 text-[#9d00d3]" />
                    ) : (
                        <Sun className="w-6 h-6 text-[#00f7ff]" />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
