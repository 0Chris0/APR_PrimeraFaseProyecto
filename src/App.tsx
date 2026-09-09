import { useEffect, useState } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { HomeScreen } from './components/HomeScreen';
import ProfileView from './components/ProfileView';
import PublicationsView from './components/PublicationsView';
import NewPublicationView from './components/NewPublication';
import { getStoredSessionToken, getStoredSessionUser, logoutService } from './services/api';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'home' | 'profile' | 'publications' | 'newPublication'>('login');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedToken = getStoredSessionToken();
    const storedUser = getStoredSessionUser();

    if (storedToken && storedUser) {
      setUser(storedUser);
      setCurrentScreen('home');
    }
  }, []);

  const handleAuthSuccess = (userData?: any) => {
    if (userData) {
      const nextUser = userData.user || userData;
      setUser(nextUser);
    }
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    logoutService();
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <MobileContainer>
      {currentScreen === 'login' && (
        <LoginScreen
          onLoginSuccess={handleAuthSuccess}
          onNavigateToRegister={() => setCurrentScreen('register')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onRegisterSuccess={handleAuthSuccess}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onNavigateToPublish={() => setCurrentScreen('publications')}
          onNavigateToProfile={() => setCurrentScreen('profile')}
        />
      )}

      {currentScreen === 'publications' && (
        <PublicationsView
          onBack={() => setCurrentScreen('home')}
          onNewPost={() => setCurrentScreen('newPublication')}
        />
      )}

      {currentScreen === 'newPublication' && (
        <NewPublicationView
          onBack={() => setCurrentScreen('publications')}
          onSuccess={() => setCurrentScreen('publications')}
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileView
          user={user}
          onNavigateToHome={() => setCurrentScreen('home')}
          onLogout={handleLogout}
        />
      )}
    </MobileContainer>
  );
}

export default App;