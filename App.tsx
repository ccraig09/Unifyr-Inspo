
import React, { useState } from 'react';
import { Layout } from './components/layout';
import { HomePage } from './pages/Home';
import { EventsPage } from './pages/Events';
import { HostDashboard, VendorDashboard, AttendeeDashboard } from './pages/Dashboards';
import { SettingsPage } from './pages/Settings';
import { SocialPage } from './pages/Social';
import { MediaPage } from './pages/Media';
import { AuthPage } from './pages/Auth';
import { EventModal } from './components/EventModal';
import { CreateEventModal } from './components/CreateEventModal';
// import { AuthModal } from './components/AuthModal'; // Deprecated in favor of full page
import { Category, Event, User, UserRole, ViewState } from './types';
import { MOCK_EVENTS, MOCK_APPLICATIONS, MOCK_USER } from './constants';

const App: React.FC = () => {
  // State
  const [user, setUser] = useState<User | null>(null); 
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  
  // Modals
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  // const [isAuthOpen, setIsAuthOpen] = useState(false); // Removed modal auth
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Handlers
  const handleLogin = (role: UserRole) => {
    setUser({ ...MOCK_USER, role });
    // Redirect to appropriate dashboard on login
    if (role === UserRole.HOST) setCurrentView('dashboard-host');
    else if (role === UserRole.VENDOR) setCurrentView('dashboard-vendor');
    else setCurrentView('dashboard-attendee');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
    setSelectedCategory(Category.ALL);
  };

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0,0);
  };

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
    setCurrentView('dashboard-host'); // Redirect back to dashboard
  };

  const handleAuthRequest = () => {
      // Navigate to full auth page instead of modal
      setCurrentView('auth-login'); 
  };

  // Render View based on State
  const renderContent = () => {
    switch (currentView) {
        case 'home':
            return (
                <HomePage 
                    events={events} 
                    user={user} 
                    selectedCategory={selectedCategory} 
                    onEventClick={setActiveEvent}
                    onSignUp={handleAuthRequest}
                />
            );
        case 'events-list':
            return <EventsPage events={events} onEventClick={setActiveEvent} />;
        case 'dashboard-host':
            return <HostDashboard user={user!} events={events} />;
        case 'dashboard-vendor':
            return <VendorDashboard user={user!} applications={MOCK_APPLICATIONS} />;
        case 'dashboard-attendee':
            return <AttendeeDashboard user={user!} events={events} />;
        case 'settings':
            return <SettingsPage user={user || MOCK_USER} />;
        case 'messages':
            return <SocialPage />;
        case 'media-manager':
            return <MediaPage />;
        case 'auth-login':
            return <AuthPage initialTab="login" onLogin={handleLogin} />;
        case 'auth-register':
            return <AuthPage initialTab="register" onLogin={handleLogin} />;
        default:
            return (
                <HomePage 
                    events={events} 
                    user={user} 
                    selectedCategory={selectedCategory} 
                    onEventClick={setActiveEvent}
                    onSignUp={handleAuthRequest}
                />
            );
    }
  };

  // If viewing Auth pages, we might not want the main App Shell (Sidebar/Header)
  // or we might want a simplified one. The Prompt requested "Full-page Auth screens".
  // So we return AuthPage directly without Layout if currentView is auth-login/register.
  
  if (currentView === 'auth-login' || currentView === 'auth-register') {
      return renderContent();
  }

  return (
    <Layout 
        user={user} 
        onLogin={handleAuthRequest} 
        onLogout={handleLogout}
        onNavigate={navigate}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
    >
        {renderContent()}

        {/* Global Modals */}
        <EventModal 
            event={activeEvent} 
            isOpen={!!activeEvent} 
            onClose={() => setActiveEvent(null)}
            onAddTodo={() => {}}
        />

        <CreateEventModal 
            isOpen={currentView === 'create-event'} 
            onClose={() => navigate('dashboard-host')}
            onSubmit={handleCreateEvent}
        />
    </Layout>
  );
};

export default App;
