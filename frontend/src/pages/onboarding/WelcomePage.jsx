import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { motion } from 'framer-motion';
import { Heart, Shield, Sparkles } from 'lucide-react';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <OnboardingLayout progress={5} title="Welcome to NutriFit" subtitle="Let's personalize your health journey in a few simple steps.">
            <div className="flex flex-col items-center gap-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                        { icon: Heart, label: "Personalized Plans", color: "text-rose-400" },
                        { icon: Sparkles, label: "Smart Insights", color: "text-amber-400" },
                        { icon: Shield, label: "Data Security", color: "text-emerald-400" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 text-center"
                        >
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                            <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/onboarding/basic-info')}
                    className="group relative px-12 py-5 bg-linear-to-r from-primary-light to-primary rounded-full font-bold text-lg shadow-2xl shadow-primary/20 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">Start My Assessment</span>
                </motion.button>
            </div>
        </OnboardingLayout>
    );
};

export default WelcomePage;
