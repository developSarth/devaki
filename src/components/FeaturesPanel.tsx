import React from 'react';
import { X, Calendar, Heart, BookOpen, TrendingUp, Settings, HelpCircle, Bell, Moon } from 'lucide-react';

interface FeaturesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentView: (view: string) => void;
  userProfile: any;
}

export default function FeaturesPanel({ isOpen, onClose, setCurrentView, userProfile }: FeaturesPanelProps) {
  const features = [
    { id: 'calendar', icon: Calendar, label: 'Period Calendar', desc: 'Track your cycle and symptoms' },
    { id: 'symptoms', icon: Heart, label: 'Symptom Tracker', desc: 'Log daily symptoms and severity' },
    { id: 'remedies', icon: BookOpen, label: 'Ayurvedic Remedies', desc: 'Natural healing solutions' },
    { id: 'insights', icon: TrendingUp, label: 'Cycle Insights', desc: 'Understand your patterns' },
    { id: 'notifications', icon: Bell, label: 'Smart Reminders', desc: 'Never miss important dates' },
    { id: 'settings', icon: Settings, label: 'Preferences', desc: 'Customize your experience' },
  ];

  const menopauseFeatures = [
    { id: 'menopause', icon: Moon, label: 'Menopause Tracker', desc: 'Track menopause symptoms' },
    { id: 'hormone-insights', icon: TrendingUp, label: 'Hormonal Insights', desc: 'Understand hormonal changes' },
  ];

  const allFeatures = userProfile?.showMenopause ? [...features, ...menopauseFeatures] : features;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">All Features</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {allFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    setCurrentView(feature.id);
                    onClose();
                  }}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-gray-50 to-rose-50 hover:from-rose-50 hover:to-pink-50 border border-gray-100 hover:border-rose-200 transition-all duration-300 group hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-rose-50 transition-colors duration-300">
                      <feature.icon className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors duration-200">
                        {feature.label}
                      </h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100">
            <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}