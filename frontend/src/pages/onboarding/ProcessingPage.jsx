import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const ProcessingPage = () => {
    const navigate = useNavigate();
    const { formData, updateFormData } = useOnboarding();
    const [status, setStatus] = useState('Analyzing data...');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const processData = async () => {
            // 1. Calculate BMR (Mifflin-St Jeor)
            const weight = parseFloat(formData.weight);
            const height = parseFloat(formData.height);
            const age = parseInt(formData.age);
            const isMale = formData.gender === 'male';

            let bmr = (10 * weight) + (6.25 * height) - (5 * age);
            bmr = isMale ? bmr + 5 : bmr - 161;

            // 2. Activity Multiplier
            const multipliers = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                athlete: 1.9
            };
            const multiplier = multipliers[formData.activity_level] || 1.2;
            const maintenance = Math.round(bmr * multiplier);

            // 3. Goal Adjustment
            const adjustments = {
                lose: -400,
                maintain: 0,
                gain: 300
            };
            const adjustment = adjustments[formData.goal] || 0;
            const target = maintenance + adjustment;

            // Update context state
            updateFormData({
                maintenance_calories: maintenance,
                target_calories: target
            });

            // Simulation steps for UX
            const steps = [
                { msg: 'Normalizing bio-metrics...', delay: 1000, prog: 30 },
                { msg: 'Calculating metabolic rate...', delay: 2000, prog: 60 },
                { msg: 'Optimizing target goals...', delay: 3000, prog: 90 },
                { msg: 'Syncing health profile...', delay: 4000, prog: 100 }
            ];

            for (const step of steps) {
                await new Promise(r => setTimeout(r, step.delay / 2));
                setStatus(step.msg);
                setProgress(step.prog);
            }

            // 4. Save to Firestore
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, 'users', user.uid), {
                    ...formData,
                    maintenance_calories: maintenance,
                    target_calories: target,
                    profile_complete: true,
                    updated_at: new Date().toISOString()
                }, { merge: true });
            }

            setTimeout(() => navigate('/home'), 1000);
        };

        processData();
    }, [navigate]);

    return (
        <OnboardingLayout progress={progress} title="Processing" subtitle="Generating your personalized nutrition model.">
            <div className="flex flex-col items-center justify-center gap-12 py-20">
                <div className="relative w-48 h-48">
                    {/* Animated Spinner Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-dashed border-primary-light/30 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-dashed border-secondary-light/30 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-white">{progress}%</span>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <motion.h3
                        key={status}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold tracking-tight text-white/80"
                    >
                        {status}
                    </motion.h3>
                    <p className="text-white/30 text-sm font-medium uppercase tracking-[0.2em]">Please stay on this page</p>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default ProcessingPage;
