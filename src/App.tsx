import React, { useState } from 'react';
import Header from './components/Header';
import FeaturesPanel from './components/FeaturesPanel';
import AuthModal from './components/AuthModal';
import Calendar from './components/Calendar';
import RemediesView from './components/RemediesView';
import InsightsView from './components/InsightsView';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [currentView, setCurrentView] = useState('calendar');
  const [userProfile, setUserProfile] = useState(null);

  const handleLogin = (credentials: any) => {
    // Simulate login
    setUserProfile({ 
      name: 'Demo User', 
      email: credentials.email,
      showMenopause: false 
    });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleRegister = (userData: any) => {
    // Simulate registration
    setUserProfile({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      showMenopause: userData.showMenopause
    });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentView('calendar');
    setShowFeatures(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calendar':
      case 'symptoms':
        return <Calendar userProfile={userProfile} />;
      case 'remedies':
        return <RemediesView userProfile={userProfile} />;
      case 'insights':
        return <InsightsView userProfile={userProfile} />;
      default:
        return <Calendar userProfile={userProfile} />;
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