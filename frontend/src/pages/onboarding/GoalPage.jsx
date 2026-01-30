import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { TrendingDown, Minus, TrendingUp } from 'lucide-react';

const GoalPage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboarding();

    const goals = [
        { id: 'lose', label: 'Lose Weight', desc: 'Shed body fat and lean out', icon: TrendingDown, color: 'from-rose-500/20 to-rose-500/0', border: 'border-rose-500/50' },
        { id: 'maintain', label: 'Maintain', desc: 'Keep your current physique', icon: Minus, color: 'from-amber-500/20 to-amber-500/0', border: 'border-amber-500/50' },
        { id: 'gain', label: 'Gain Muscle', desc: 'Build size and strength', icon: TrendingUp, color: 'from-emerald-500/20 to-emerald-500/0', border: 'border-emerald-500/50' },
    ];

    const handleSelect = (id) => {
        updateFormData({ goal: id });
    };

    return (
        <OnboardingLayout progress={60} title="Your Vision" subtitle="What is your primary fitness objective?">
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-6">
                    {goals.map((item, i) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleSelect(item.id)}
                            className={`relative overflow-hidden group p-8 rounded-[3rem] border-2 transition-all duration-500 ${formData.goal === item.id
                                    ? `bg-linear-to-b ${item.color} ${item.border} shadow-2xl`
                                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                                }`}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className={`p-5 rounded-[2rem] bg-white/10 transition-transform duration-500 ${formData.goal === item.id ? 'scale-110 rotate-3 text-white' : 'text-white/40 group-hover:text-white'
                                        }`}>
                                        <item.icon className="w-10 h-10" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold tracking-tight mb-2">{item.label}</h3>
                                        <p className="text-white/40 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                                {formData.goal === item.id && (
                                    <motion.div
                                        layoutId="check"
                                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                                    >
                                        <div className="w-3 h-3 bg-black rounded-full" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-8">
                    <button
                        onClick={() => navigate('/onboarding/activity')}
                        className="text-white/40 hover:text-white font-bold transition-colors px-6"
                    >
                        Back
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!formData.goal}
                        onClick={() => navigate('/onboarding/lifestyle')}
                        className={`px-12 py-5 rounded-full font-bold text-lg transition-all ${formData.goal
                                ? 'bg-white text-black hover:shadow-2xl opacity-100'
                                : 'bg-white/10 text-white/20 cursor-not-allowed opacity-50'
                            }`}
                    >
                        Continue
                    </motion.button>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default GoalPage;
