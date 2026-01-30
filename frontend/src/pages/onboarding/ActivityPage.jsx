import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { Coffee, Footprints, Bike, Dumbbell, Zap } from 'lucide-react';

const ActivityPage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboarding();

    const activities = [
        { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', icon: Coffee, multiplier: 1.2 },
        { id: 'light', label: 'Light', desc: '1–3 days / week', icon: Footprints, multiplier: 1.375 },
        { id: 'moderate', label: 'Moderate', desc: '3–5 days / week', icon: Bike, multiplier: 1.55 },
        { id: 'active', label: 'Active', desc: '6–7 days / week', icon: Dumbbell, multiplier: 1.725 },
        { id: 'athlete', label: 'Athlete', desc: 'Twice / day training', icon: Zap, multiplier: 1.9 },
    ];

    const handleSelect = (id) => {
        updateFormData({ activity_level: id });
    };

    return (
        <OnboardingLayout progress={40} title="Movement" subtitle="How active is your daily lifestyle?">
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-4">
                    {activities.map((item, i) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleSelect(item.id)}
                            className={`group flex items-center p-6 rounded-[2.5rem] border-2 transition-all duration-500 ${formData.activity_level === item.id
                                ? 'bg-primary-light/10 border-primary-light shadow-xl shadow-primary-light/10 scale-[1.02]'
                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                                }`}
                        >
                            <div className={`p-4 rounded-2xl mr-6 transition-colors duration-500 ${formData.activity_level === item.id ? 'bg-primary-light text-white' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                                }`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="text-xl font-bold tracking-tight mb-1">{item.label}</h3>
                                <p className="text-sm font-medium text-white/40">{item.desc}</p>
                            </div>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${formData.activity_level === item.id ? 'border-primary-light bg-primary-light' : 'border-white/10'
                                }`}>
                                {formData.activity_level === item.id && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 bg-white rounded-full" />
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-8">
                    <button
                        onClick={() => navigate('/onboarding/basic-info')}
                        className="text-white/40 hover:text-white font-bold transition-colors px-6"
                    >
                        Back
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!formData.activity_level}
                        onClick={() => navigate('/onboarding/goal')}
                        className={`px-12 py-5 rounded-full font-bold text-lg transition-all ${formData.activity_level
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

export default ActivityPage;
