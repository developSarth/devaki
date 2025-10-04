import React, { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

interface SymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onSave: (symptomData: any) => void;
  existingSymptoms?: any;
  userProfile: any;
}

export default function SymptomModal({ 
  isOpen, 
  onClose, 
  date, 
  onSave, 
  existingSymptoms, 
  userProfile 
}: SymptomModalProps) {
  const [symptoms, setSymptoms] = useState(existingSymptoms || {
    periodFlow: 'none',
    cramps: 0,
    mood: 0,
    headache: 0,
    bloating: 0,
    fatigue: 0,
    temperature: '',
    notes: '',
    menopauseSymptoms: userProfile?.showMenopause ? {
      hotFlashes: 0,
      nightSweats: 0,
      sleepIssues: 0,
      moodSwings: 0
    } : undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(symptoms);
  };

  const severityLevels = [
    { value: 0, label: 'None', color: 'bg-gray-200' },
    { value: 1, label: 'Mild', color: 'bg-green-200' },
    { value: 2, label: 'Moderate', color: 'bg-yellow-200' },
    { value: 3, label: 'Severe', color: 'bg-orange-200' },
    { value: 4, label: 'Extreme', color: 'bg-red-200' }
  ];

  const flowOptions = [
    { value: 'none', label: 'No Flow', color: 'bg-gray-200' },
    { value: 'spotting', label: 'Spotting', color: 'bg-pink-200' },
    { value: 'light', label: 'Light', color: 'bg-rose-300' },
    { value: 'medium', label: 'Medium', color: 'bg-red-400' },
    { value: 'heavy', label: 'Heavy', color: 'bg-red-600' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-rose-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Track Symptoms - {date.toLocaleDateString()}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Period Flow */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Period Flow</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {flowOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSymptoms({...symptoms, periodFlow: option.value})}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    symptoms.periodFlow === option.value
                      ? 'border-rose-500 shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-rose-300'
                  }`}
                >
                  <div className={`h-4 w-4 rounded-full ${option.color} mx-auto mb-2`}></div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Regular Symptoms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Symptom Severity</h3>
            <div className="space-y-6">
              {['cramps', 'mood', 'headache', 'bloating', 'fatigue'].map((symptom) => (
                <div key={symptom}>
                  <label className="block text-sm font-medium text-gray-700 mb-3 capitalize">
                    {symptom === 'mood' ? 'Mood Changes' : symptom}
                  </label>
                  <div className="flex space-x-2">
                    {severityLevels.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setSymptoms({...symptoms, [symptom]: level.value})}
                        className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                          symptoms[symptom] === level.value
                            ? 'border-rose-500 shadow-md transform scale-105'
                            : 'border-gray-200 hover:border-rose-300'
                        }`}
                      >
                        <div className={`h-3 w-3 rounded-full ${level.color} mx-auto mb-1`}></div>
                        <span className="text-xs font-medium">{level.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menopause Symptoms */}
          {userProfile?.showMenopause && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Menopause Symptoms
              </h3>
              <div className="space-y-6">
                {['hotFlashes', 'nightSweats', 'sleepIssues', 'moodSwings'].map((symptom) => (
                  <div key={symptom}>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {symptom.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <div className="flex space-x-2">
                      {severityLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setSymptoms({
                            ...symptoms, 
                            menopauseSymptoms: {
                              ...symptoms.menopauseSymptoms,
                              [symptom]: level.value
                            }
                          })}
                          className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                            symptoms.menopauseSymptoms?.[symptom] === level.value
                              ? 'border-amber-500 shadow-md transform scale-105'
                              : 'border-gray-200 hover:border-amber-300'
                          }`}
                        >
                          <div className={`h-3 w-3 rounded-full ${level.color} mx-auto mb-1`}></div>
                          <span className="text-xs font-medium">{level.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Temperature (°F)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="98.6"
                value={symptoms.temperature}
                onChange={(e) => setSymptoms({...symptoms, temperature: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                rows={3}
                placeholder="Any other symptoms or observations..."
                value={symptoms.notes}
                onChange={(e) => setSymptoms({...symptoms, notes: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Save Symptoms
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}