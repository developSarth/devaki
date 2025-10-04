import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import SymptomModal from './SymptomModal';
import { dataService, DailySymptom } from '../services/dataService';

interface CalendarProps {
  userProfile: any;
  userId: string;
}

export default function Calendar({ userProfile, userId }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [symptoms, setSymptoms] = useState<{[key: string]: DailySymptom}>({});
  const [existingSymptom, setExistingSymptom] = useState<DailySymptom | null>(null);

  useEffect(() => {
    loadSymptoms();
  }, [userId, currentDate]);

  const loadSymptoms = async () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthSymptoms = await dataService.getDailySymptoms(
      userId,
      startOfMonth.toISOString().split('T')[0],
      endOfMonth.toISOString().split('T')[0]
    );

    const symptomsMap: {[key: string]: DailySymptom} = {};
    monthSymptoms.forEach(symptom => {
      const key = getDateKeyFromString(symptom.date);
      symptomsMap[key] = symptom;
    });

    setSymptoms(symptomsMap);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleDateClick = async (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);

    const dateStr = date.toISOString().split('T')[0];
    const existing = await dataService.getSymptomByDate(userId, dateStr);
    setExistingSymptom(existing);

    setShowSymptomModal(true);
  };

  const getDateKey = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth()).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateKeyFromString = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const hasSymptoms = (day: number) => {
    return symptoms[getDateKey(day)];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-12"></div>
        ))}
        
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`h-12 w-full rounded-lg flex items-center justify-center relative transition-all duration-200 hover:scale-105 ${
              isToday(day)
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                : hasSymptoms(day)
                ? 'bg-rose-100 text-rose-700 border-2 border-rose-200'
                : 'hover:bg-rose-50 text-gray-700'
            }`}
          >
            {day}
            {hasSymptoms(day) && (
              <div className="absolute top-1 right-1 h-2 w-2 bg-rose-400 rounded-full"></div>
            )}
            <Plus className="h-3 w-3 absolute bottom-1 right-1 opacity-0 hover:opacity-100 transition-opacity duration-200 text-rose-500" />
          </button>
        ))}
      </div>

      {showSymptomModal && selectedDate && (
        <SymptomModal
          isOpen={showSymptomModal}
          onClose={() => setShowSymptomModal(false)}
          date={selectedDate}
          onSave={async (symptomData) => {
            const symptom: DailySymptom = {
              userId,
              date: selectedDate.toISOString().split('T')[0],
              symptoms: symptomData.symptoms || {},
              flowLevel: symptomData.flowLevel,
              mood: symptomData.mood,
              notes: symptomData.notes
            };

            await dataService.saveDailySymptom(symptom);
            await loadSymptoms();
            setShowSymptomModal(false);
          }}
          existingSymptoms={existingSymptom}
          userProfile={userProfile}
        />
      )}
    </div>
  );
}