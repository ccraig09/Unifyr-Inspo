import React, { useState } from 'react';
import { Layout } from './components/layout';
import { HomePage } from './pages/Home';
import { EventsPage } from './pages/Events';
import { HostDashboard, VendorDashboard, AttendeeDashboard } from './pages/Dashboards';
import { SettingsPage } from './pages/Settings';
import { SocialPage } from './pages/Social';
import { MediaPage } from './pages/Media';
import { EventModal } from './components/EventModal';
import { CreateEventModal } from './components/CreateEventModal';
import { AuthModal } from './components/AuthModal';
import { Category, Event, User, UserRole, ViewState } from './types';
import { MOCK_EVENTS, MOCK_APPLICATIONS, MOCK_USER } from './constants';

const App: React.FC = () => {
  // State
  const [user, setUser] = useState<User | null>(null); // Start logged out for demo, or set MOCK_USER
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  
  // Modals
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Handlers
  const handleLogin = (role: UserRole) => {
    setUser({ ...MOCK_USER, role });
    setIsAuthOpen(false);
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

  const handleDashboardRedirect = () => {
     if (!user) {
         setIsAuthOpen(true);
         return;
     }
     if (user.role === UserRole.HOST) setCurrentView('dashboard-host');
     else if (user.role === UserRole.VENDOR) setCurrentView('dashboard-vendor');
     else setCurrentView('dashboard-attendee');
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
                    onSignUp={() => setIsAuthOpen(true)}
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
        default:
            return (
                <HomePage 
                    events={events} 
                    user={user} 
                    selectedCategory={selectedCategory} 
                    onEventClick={setActiveEvent}
                    onSignUp={() => setIsAuthOpen(true)}
                />
            );
    }
  };

  return (
    <Layout 
        user={user} 
        onLogin={() => setIsAuthOpen(true)} 
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

        <AuthModal 
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLogin={handleLogin}
        />
    </Layout>
  );
};

export default App;