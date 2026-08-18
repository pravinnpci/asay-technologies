import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cookie, CheckCircle2, Shield, Settings, Info } from 'lucide-react';
import { ENV } from '../config/env';

export function CookiesView() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-app-bg">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto glass rounded-[3rem] p-8 md:p-16 shadow-2xl border-white/60"
        >
          <div className="flex items-center gap-4 mb-8 text-primary">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">Cookies Settings & Policy</h1>
              <p className="text-xs text-gray-400 font-medium">ASAY InfoTech Transparency & Privacy Controls</p>
            </div>
          </div>

          <div className="space-y-10 text-gray-600 text-sm md:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device to ensure our web applications run smoothly, remember your preferences, and provide you with a personalized user experience.
              </p>
            </section>

            {/* Interactive Cookie Preferences Controls */}
            <section className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Manage Your Cookie Preferences
              </h2>

              <div className="space-y-4">
                {/* 1. Necessary Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-secondary text-sm md:text-base">Strictly Necessary Cookies</h4>
                    <p className="text-xs text-gray-400 mt-1">Essential for core security, session state, and form submissions.</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-bold text-xs rounded-full">Always Active</span>
                </div>

                {/* 2. Analytics Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-secondary text-sm md:text-base">Performance & Analytics Cookies</h4>
                    <p className="text-xs text-gray-400 mt-1">Helps us understand website traffic, page load speed, and user journeys.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                {/* 3. Preference Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-gray-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-secondary text-sm md:text-base">Personalization Cookies</h4>
                    <p className="text-xs text-gray-400 mt-1">Remembers your dark/light mode and chat window state.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-primary transition-all text-xs md:text-sm shadow-md"
                >
                  Save Cookie Preferences
                </button>
                {saved && (
                  <span className="flex items-center gap-1.5 text-xs text-green-600 font-bold animate-pulse">
                    <CheckCircle2 className="w-4 h-4" /> Preferences saved!
                  </span>
                )}
              </div>
            </section>

            <div className="pt-8 border-t border-gray-100 mt-12 text-xs text-gray-400">
              <p>For more information on how we handle personal information, please review our <a href="/privacy" className="text-primary underline">Privacy Policy</a> or reach out at <strong>{ENV.COMPANY_EMAIL}</strong>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
