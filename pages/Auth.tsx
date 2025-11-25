
import React, { useState } from 'react';
import { AuthLayout } from '../components/Auth/AuthLayout';
import { LoginForm } from '../components/Auth/LoginForm';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { UserRole } from '../types';

type AuthTab = 'login' | 'register';

interface AuthPageProps {
  initialTab?: 'login' | 'register';
  onLogin: (role: UserRole) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialTab = 'login', onLogin }) => {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  return (
    <AuthLayout
      title={activeTab === 'login' ? "Sign in to plan your next night out." : "Join the future of event discovery."}
      subtitle="Connect with top hosts, discover exclusive video-first events, and manage your nightlife logistics all in one place."
    >
      {/* Top Logo & Tabs */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-8">
           <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-neon-blue rounded-xl flex items-center justify-center font-bold text-2xl text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]">
            U
          </div>
          <span className="text-3xl font-bold tracking-tight text-white">Unifyr</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-neutral-900 border border-neutral-800 rounded-full w-full max-w-sm relative">
            {/* Animated Background Slider could go here for polish, doing simple conditional classes for now */}
            <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                    activeTab === 'login' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-neutral-500 hover:text-white'
                }`}
            >
                Log In
            </button>
            <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all duration-300 ${
                    activeTab === 'register' 
                    ? 'bg-yellow-400 text-black shadow-lg' 
                    : 'text-neutral-500 hover:text-white'
                }`}
            >
                Create Account
            </button>
        </div>
      </div>

      {/* Forms */}
      <div className="relative">
        {activeTab === 'login' ? (
            <LoginForm 
                onLoginSuccess={onLogin} 
                onSwitchToRegister={() => setActiveTab('register')} 
            />
        ) : (
            <RegisterForm 
                onRegisterSuccess={onLogin} 
                onSwitchToLogin={() => setActiveTab('login')} 
            />
        )}
      </div>
    </AuthLayout>
  );
};
