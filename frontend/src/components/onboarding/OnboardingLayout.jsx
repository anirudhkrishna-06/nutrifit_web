import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingLayout = ({ children, progress, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary-light/10 rounded-full blur-[100px] animate-float" />
                <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] bg-secondary-light/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-light/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-4s' }} />
            </div>

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
                <motion.div
                    className="h-full bg-linear-to-r from-primary-light via-secondary-light to-accent-light"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                />
            </div>

            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="w-full max-w-2xl"
                    >
                        {(title || subtitle) && (
                            <div className="text-center mb-12">
                                {title && (
                                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent italic">
                                        {title}
                                    </h1>
                                )}
                                {subtitle && (
                                    <p className="text-white/60 text-lg font-medium tracking-wide">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        )}
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer Branding */}
            <footer className="relative z-10 py-8 text-center opacity-30 pointer-events-none">
                <p className="text-sm font-bold tracking-[0.2em] uppercase">NutriFit Intelligence</p>
            </footer>
        </div>
    );
};

export default OnboardingLayout;
