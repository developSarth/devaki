import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FeaturesPanel from './components/FeaturesPanel';
import AuthModal from './components/AuthModal';
import Calendar from './components/Calendar';
import RemediesView from './components/RemediesView';
import InsightsView from './components/InsightsView';
import EducationalView from './components/EducationalView';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentView, setCurrentView] = useState('calendar');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userId, setUserId] = useState<string>('demo-user-' + Date.now());

  useEffect(() => {
    const storedUser = localStorage.getItem('devaki_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserProfile(user);
      setUserId(user.id);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (credentials: any) => {
    const user = {
      id: userId,
      name: 'Demo User',
      email: credentials.email,
      showMenopause: false
    };
    setUserProfile(user);
    localStorage.setItem('devaki_user', JSON.stringify(user));
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleRegister = (userData: any) => {
    const user = {
      id: userId,
      name: userData.name,
      email: userData.email,
      age: userData.age,
      showMenopause: userData.showMenopause
    };
    setUserProfile(user);
    localStorage.setItem('devaki_user', JSON.stringify(user));
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('devaki_user');
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentView('calendar');
    setShowFeatures(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calendar':
      case 'symptoms':
        return <Calendar userProfile={userProfile} userId={userId} />;
      case 'remedies':
        return <RemediesView userProfile={userProfile} />;
      case 'insights':
        return <InsightsView userProfile={userProfile} userId={userId} />;
      case 'education':
        return <EducationalView userProfile={userProfile} />;
      default:
        return <Calendar userProfile={userProfile} userId={userId} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onShowAuth={() => setShowAuthModal(true)} />
        <Footer />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Header
        showFeatures={showFeatures}
        setShowFeatures={setShowFeatures}
        currentView={currentView}
        setCurrentView={setCurrentView}
        isAuthenticated={isAuthenticated}
        userProfile={userProfile}
        onLogout={handleLogout}
      />
      
      <FeaturesPanel
        isOpen={showFeatures}
        onClose={() => setShowFeatures(false)}
        setCurrentView={setCurrentView}
        userProfile={userProfile}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {userProfile?.name}! 
            {userProfile?.showMenopause && (
              <span className="text-amber-600 text-xl ml-2">🌙</span>
            )}
          </h1>
          <p className="text-gray-600">
            {userProfile?.showMenopause 
              ? "Track your menopause journey with personalized insights and remedies"
              : "Track your cycle and discover personalized wellness recommendations"
            }
          </p>
        </div>

        {renderCurrentView()}
      </main>

      <Footer />
    </div>
  );
}

export default App;