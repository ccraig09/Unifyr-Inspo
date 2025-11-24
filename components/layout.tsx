import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { User, Category, ViewState } from '../types';

interface LayoutProps {
  children?: React.ReactNode;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, user, onLogin, onLogout, onNavigate, selectedCategory, onSelectCategory 
}) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <Header 
        user={user} 
        onLogin={onLogin} 
        onLogout={onLogout}
        onNavigate={onNavigate}
        onOpenCreate={() => onNavigate('create-event')}
        onOpenTodos={() => {}} 
      />
      
      <Sidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={onSelectCategory} 
      />
      
      <main className="pt-20 md:pl-64 min-h-screen pb-12">
        {children}
      </main>

      {/* Mobile Nav - Visible only on small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-neutral-900 border-t border-neutral-800 z-50 flex items-center justify-around px-2">
        {['Home', 'Explore', 'Chat', 'Profile'].map((item) => (
            <button key={item} className="flex flex-col items-center justify-center w-full h-full text-neutral-500 hover:text-white">
                <span className="text-[10px] uppercase font-bold mt-1">{item}</span>
            </button>
        ))}
      </nav>
    </div>
  );
};