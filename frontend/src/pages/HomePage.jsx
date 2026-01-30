import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { LogOut, Activity, Target, Flame, ChevronRight, User as UserIcon, Calendar, Ruler, Weight } from 'lucide-react';

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return null;

  const targetCals = userData?.target_calories || 2000;
  const maintenanceCals = userData?.maintenance_calories || 2000;

  // Progress Ring Logic
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = 65; // Simulated for demo
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#060606] text-white p-6 md:p-10 font-['Inter']">
      {/* Header */}
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-primary-light to-primary rounded-xl flex items-center justify-center">
            <span className="text-xl">🌱</span>
          </div>
          <span className="text-2xl font-black tracking-tighter">NutriFit</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Progress & Stats */}
        <div className="lg:col-span-8 space-y-8">

          {/* Welcome Card */}
          <div className="relative overflow-hidden bg-linear-to-br from-primary/20 to-transparent border border-white/10 p-10 rounded-[3rem]">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 italic">Hello, {userData?.name?.split(' ')[0] || 'Health Hero'}!</h2>
                <p className="text-white/60 text-lg max-w-md">Your personalized nutrition plan is active. You're set for <span className="text-white font-bold">{userData?.goal || 'maintaining'}</span> trajectory.</p>
              </div>

              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r={radius} fill="transparent" stroke="currentColor" strokeWidth="12" className="text-white/5" />
                  <motion.circle
                    cx="96" cy="96" r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="text-primary-light"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">{progress}%</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Daily Goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl"><Target className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Target</span>
              </div>
              <div>
                <h4 className="text-4xl font-black mb-1">{targetCals}</h4>
                <p className="text-sm text-white/40 font-medium">kcal / day</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl"><Activity className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Base</span>
              </div>
              <div>
                <h4 className="text-4xl font-black mb-1">{maintenanceCals}</h4>
                <p className="text-sm text-white/40 font-medium">Maintenance</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl"><Flame className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Trend</span>
              </div>
              <div>
                <h4 className="text-4xl font-black mb-1 capitalize">{userData?.goal || 'Steady'}</h4>
                <p className="text-sm text-white/40 font-medium">Current Focus</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Profile Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] sticky top-8">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-24 h-24 bg-linear-to-tr from-accent-light to-primary-light rounded-[2.5rem] mb-6 flex items-center justify-center text-4xl shadow-2xl shadow-primary-light/20">
                {userData?.avatar ? <img src={userData.avatar} className="w-full h-full rounded-[2.5rem] object-cover" /> : '👤'}
              </div>
              <h3 className="text-2xl font-bold italic mb-1">{userData?.name || 'User Profile'}</h3>
              <p className="text-white/40 text-sm font-medium">{userData?.diet_preference || 'Balanced'} Diet</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Age', value: `${userData?.age || 0} yrs`, icon: Calendar },
                { label: 'Height', value: `${userData?.height || 0} cm`, icon: Ruler },
                { label: 'Weight', value: `${userData?.weight || 0} kg`, icon: Weight },
                { label: 'Level', value: userData?.activity_level, icon: Activity, capitalize: true },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-3 text-white/40">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className={`font-black text-sm ${stat.capitalize ? 'capitalize' : ''}`}>
                    {stat.value || 'N/A'}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 py-5 bg-white text-black rounded-[2rem] font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 group">
              Update Profile
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;