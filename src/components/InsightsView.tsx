import React from 'react';
import { TrendingUp, Calendar, Heart, AlertTriangle, Target } from 'lucide-react';

interface InsightsViewProps {
  userProfile: any;
}

export default function InsightsView({ userProfile }: InsightsViewProps) {
  const mockData = {
    cycleLength: 28,
    averagePeriodLength: 5,
    nextPeriodDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    commonSymptoms: ['cramps', 'fatigue', 'mood changes'],
    severity: 'moderate'
  };

  const insights = [
    {
      icon: Calendar,
      title: 'Cycle Pattern',
      value: `${mockData.cycleLength} days`,
      description: 'Your average cycle length',
      trend: 'stable',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Period Duration',
      value: `${mockData.averagePeriodLength} days`,
      description: 'Average period length',
      trend: 'normal',
      color: 'rose'
    },
    {
      icon: TrendingUp,
      title: 'Symptom Severity',
      value: mockData.severity,
      description: 'Based on your tracking',
      trend: 'improving',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Next Period',
      value: mockData.nextPeriodDate.toLocaleDateString(),
      description: 'Predicted date',
      trend: 'upcoming',
      color: 'purple'
    }
  ];

  const menopauseInsights = [
    {
      icon: AlertTriangle,
      title: 'Transition Phase',
      value: 'Perimenopause',
      description: 'Based on age and symptoms',
      trend: 'transitioning',
      color: 'amber'
    },
    {
      icon: TrendingUp,
      title: 'Symptom Tracking',
      value: 'Active',
      description: 'Monitor menopause symptoms',
      trend: 'monitoring',
      color: 'indigo'
    }
  ];

  const allInsights = userProfile?.showMenopause ? [...insights, ...menopauseInsights] : insights;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="h-6 w-6 text-blue-500 mr-3" />
          Your Health Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {allInsights.map((insight, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-${insight.color}-50 to-${insight.color}-100 rounded-xl p-6 border border-${insight.color}-200 hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <insight.icon className={`h-8 w-8 text-${insight.color}-600`} />
                <span className={`text-xs px-2 py-1 rounded-full bg-${insight.color}-200 text-${insight.color}-700 font-medium`}>
                  {insight.trend}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{insight.title}</h3>
              <p className={`text-2xl font-bold text-${insight.color}-600 mb-1`}>{insight.value}</p>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Cycle Prediction</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Next period expected:</span>
              <span className="font-bold text-rose-600">{mockData.nextPeriodDate.toLocaleDateString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">You're currently in the luteal phase of your cycle</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Wellness Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-gray-700">Continue tracking symptoms daily for better predictions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-gray-700">Try the turmeric golden milk remedy for cramps</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                <p className="text-gray-700">Maintain regular sleep schedule during PMS phase</p>
              </div>
              {userProfile?.showMenopause && (
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-amber-400 rounded-full mt-2"></div>
                  <p className="text-gray-700">Track menopause symptoms for better management</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}