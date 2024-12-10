import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Login from './Login';
import Home from './Home';
import Messages from './Messages';
import Profile from './Profile';
import Notifications from './Notifications';

interface UserProfile {
  name: string;
  neighborhood: string;
  joinDate: string;
  helpCount: number;
}

interface LoginCredentials {
  name: string;
  neighborhood: string;
}

const KomsuApp: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string>('login');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { t } = useTranslation();

  const handleLogin = (credentials: LoginCredentials) => {
    setUserProfile({
      name: credentials.name,
      neighborhood: credentials.neighborhood,
      joinDate: new Date().toLocaleDateString(),
      helpCount: Math.floor(Math.random() * 50)
    });
    setActiveScreen('home');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return <Home />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile userProfile={userProfile} />;
      case 'notifications':
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {userProfile && (
        <Sidebar
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      )}
      <main className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{t('neighborhoodPlatform')}</h1>
        {renderScreen()}
      </main>
    </div>
  );
};

export default KomsuApp;

