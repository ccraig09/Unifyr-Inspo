import React, { useState } from 'react';
import { Search, Map, MessageCircle, User as UserIcon, Plus, CheckSquare, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import { User, UserRole, ViewState } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
  onOpenCreate: () => void;
  onOpenTodos: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onNavigate, onOpenCreate, onOpenTodos }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const canCreate = user?.role === UserRole.HOST || user?.role === UserRole.VENDOR;

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    setShowDropdown(false);
  };

  const getDashboardView = (role: UserRole): ViewState => {
      switch(role) {
          case UserRole.HOST: return 'dashboard-host';
          case UserRole.VENDOR: return 'dashboard-vendor';
          default: return 'dashboard-attendee';
      }
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-neutral-800 z-[40] flex items-center px-4 md:px-6 justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-neon-blue rounded-lg flex items-center justify-center font-bold text-xl text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]">
            U
          </div>
          <span className="text-white text-2xl font-bold tracking-tight hidden sm:block">Unifyr</span>
        </div>

        {/* Location & Search */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer">
            <Map size={14} className="text-yellow-400" />
            <span className="text-white text-sm font-medium">San Francisco, CA</span>
          </div>
          
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search events, hosts, or categories..." 
              className="bg-neutral-900 border border-neutral-800 text-white text-sm rounded-full pl-10 pr-4 py-2 w-80 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button 
            onClick={() => onNavigate('messages')}
            className="text-white hover:text-yellow-400 transition-colors relative hidden md:block"
        >
          <MessageCircle size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-blue text-[10px] flex items-center justify-center rounded-full text-white animate-pulse">3</span>
        </button>
        
        <button 
          onClick={onOpenTodos}
          className="text-white hover:text-yellow-400 transition-colors relative flex items-center gap-2"
        >
          <CheckSquare size={20} />
          <span className="hidden md:inline text-sm font-medium">Planner</span>
        </button>

        {canCreate && (
            <button 
                onClick={onOpenCreate}
                className="hidden md:flex items-center gap-2 text-black bg-white hover:bg-neutral-200 px-4 py-2 rounded-full transition-colors shadow-lg shadow-white/10"
            >
                <Plus size={16} strokeWidth={3} />
                <span className="text-xs font-bold uppercase tracking-wide">Create</span>
            </button>
        )}

        <div className="h-6 w-px bg-neutral-800 mx-2 hidden md:block"></div>

        {user ? (
          <div className="relative">
             <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 cursor-pointer group focus:outline-none"
             >
                <div className="text-right hidden md:block">
                    <div className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors">{user.name}</div>
                    <div className="text-neutral-500 text-xs">{user.role}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon size={20} className="text-neutral-400" />
                    )}
                </div>
                <ChevronDown size={14} className={`text-neutral-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
             </button>

             {showDropdown && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                    <div className="absolute right-0 top-full mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-neutral-800 md:hidden">
                            <div className="font-bold text-white">{user.name}</div>
                            <div className="text-xs text-neutral-500">{user.role}</div>
                        </div>
                        
                        <button 
                            onClick={() => handleNavigate(getDashboardView(user.role))}
                            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-neutral-800 flex items-center gap-3 transition-colors"
                        >
                            <LayoutDashboard size={16} className="text-neon-blue" /> 
                            Dashboard
                        </button>
                        
                        <button 
                            onClick={() => handleNavigate('settings')}
                            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-neutral-800 flex items-center gap-3 transition-colors"
                        >
                            <Settings size={16} className="text-neutral-400" /> 
                            Settings & Profile
                        </button>

                        <div className="h-px bg-neutral-800 my-1"></div>
                        
                        <button 
                            onClick={() => {
                                onLogout();
                                setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-neutral-800 flex items-center gap-3 transition-colors"
                        >
                            <LogOut size={16} /> 
                            Log Out
                        </button>
                    </div>
                </>
             )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="text-white text-sm font-medium hover:text-yellow-400">Log in</button>
            <button onClick={onLogin} className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};