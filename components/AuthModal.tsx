import React from 'react';
import { X, User, Briefcase, Star } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const roles = [
    {
      id: UserRole.ATTENDEE,
      label: 'Attendee',
      icon: User,
      description: 'Discover and attend events',
      color: 'bg-blue-500'
    },
    {
      id: UserRole.HOST,
      label: 'Event Host',
      icon: Star,
      description: 'Create and manage personal events',
      color: 'bg-neon-blue'
    },
    {
      id: UserRole.VENDOR,
      label: 'Vendor',
      icon: Briefcase,
      description: 'Promote commercial events & services',
      color: 'bg-yellow-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 w-full max-w-md rounded-3xl border border-neutral-800 p-8 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Unifyr</h2>
            <p className="text-neutral-400 text-sm">Choose how you want to continue</p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onLogin(role.id)}
              className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 transition-all text-left"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role.color} text-black font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                <role.icon size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{role.label}</div>
                <div className="text-neutral-400 text-xs">{role.description}</div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-neutral-500 text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};