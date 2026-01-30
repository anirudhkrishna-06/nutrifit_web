import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { motion } from 'framer-motion';
import { Leaf, Flame, Milk, Egg, Moon, Zap, Activity } from 'lucide-react';

const LifestylePage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboarding();

    const diets = [
        { id: 'veg', label: 'Vegetarian', icon: Leaf },
        { id: 'non-veg', label: 'Non-Veg', icon: Flame },
        { id: 'vegan', label: 'Vegan', icon: Milk },
        { id: 'eggetarian', label: 'Eggetarian', icon: Egg },
    ];

    return (
        <OnboardingLayout progress={80} title="Daily Habits" subtitle="Nearly there. Tell us about your preferences.">
            <div className="space-y-12">
                <section className="space-y-6">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] ml-2">Dietary Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                        {diets.map((diet) => (
                            <button
                                key={diet.id}
                                onClick={() => updateFormData({ diet_preference: diet.id })}
                                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${formData.diet_preference === diet.id
                                        ? 'bg-accent-light/10 border-accent-light text-white shadow-lg shadow-accent-light/10'
                                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                                    }`}
                            >
                                <diet.icon className="w-5 h-5" />
                                <span className="font-bold">{diet.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <label className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <Moon className="w-4 h-4" /> Sleep Hours
                        </label>
                        <input
                            type="range"
                            min="4"
                            max="12"
                            step="0.5"
                            value={formData.sleep_hours || 7}
                            onChange={(e) => updateFormData({ sleep_hours: e.target.value })}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Short {formData.sleep_hours || 7}h</span>
                            <span className="text-white/40 italic">Ideal 8h</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Stress Level
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={formData.stress_level || 5}
                            onChange={(e) => updateFormData({ stress_level: e.target.value })}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                        <div className="flex justify-between text-lg font-bold uppercase tracking-tight">
                            <span>{formData.stress_level <= 3 ? 'Chill' : formData.stress_level <= 7 ? 'Managing' : 'Stressed'}</span>
                            <span className="text-white/40 italic">{formData.stress_level}/10</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Medical Conditions (Optional)
                    </label>
                    <textarea
                        placeholder="Any allergies or dietary restrictions?"
                        value={formData.medical_condition}
                        onChange={(e) => updateFormData({ medical_condition: e.target.value })}
                        className="w-full bg-white/5 border-2 border-white/5 rounded-3xl p-6 text-lg font-medium outline-none focus:border-white/20 h-32 resize-none transition-all focus:bg-white/10"
                    />
                </section>

                <div className="flex justify-between items-center pt-8">
                    <button
                        onClick={() => navigate('/onboarding/goal')}
                        className="text-white/40 hover:text-white font-bold transition-colors px-6"
                    >
                        Back
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/onboarding/processing')}
                        className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-2xl transition-all"
                    >
                        Finalize
                    </motion.button>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default LifestylePage;
