import React from 'react';
import { Menu, Calendar, Heart, Settings, BookOpen, TrendingUp, User, LogOut } from 'lucide-react';

interface HeaderProps {
  showFeatures: boolean;
  setShowFeatures: (show: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  isAuthenticated: boolean;
  userProfile: any;
  onLogout: () => void;
}

export default function Header({ 
  showFeatures, 
  setShowFeatures, 
  currentView, 
  setCurrentView, 
  isAuthenticated, 
  userProfile, 
  onLogout 
}: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-rose-50/90 to-pink-50/90 border-b border-rose-100 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <Menu className="h-5 w-5 text-rose-600 group-hover:scale-110 transition-transform duration-200" />
              </button>
            )}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="h-8 w-8 text-rose-500" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-pink-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Devaki
              </h1>
            </div>
          </div>
          
          {isAuthenticated && (
            <>
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    currentView === 'calendar' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </button>
                <button
                  onClick={() => setCurrentView('remedies')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    currentView === 'remedies' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Remedies</span>
                </button>
                <button
                  onClick={() => setCurrentView('insights')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                    currentView === 'insights' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-600 hover:text-rose-500 hover:bg-rose-50 hover:shadow-sm'
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Insights</span>
                </button>
              </nav>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userProfile?.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-xl hover:bg-rose-50 transition-all duration-200 group"
                >
                  <LogOut className="h-5 w-5 text-gray-600 group-hover:text-rose-500" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}