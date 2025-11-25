
import React from 'react';
import { UserRole } from '../../types';
import { Star, Briefcase, User, Check } from 'lucide-react';

interface RoleSelectProps {
  selectedRole: UserRole | null;
  onSelect: (role: UserRole) => void;
}

export const RoleSelect: React.FC<RoleSelectProps> = ({ selectedRole, onSelect }) => {
  const roles = [
    {
      id: UserRole.HOST,
      title: 'Event Host',
      icon: Star,
      description: 'I want to create events, sell tickets, and manage lineups.',
      benefits: ['Create unlimited events', 'Access host dashboard', 'Manage vendors'],
      color: 'text-yellow-400',
      borderHover: 'group-hover:border-yellow-400'
    },
    {
      id: UserRole.VENDOR,
      title: 'Vendor',
      icon: Briefcase,
      description: 'I offer services (food, tech, security) to event hosts.',
      benefits: ['Apply to gigs', 'Showcase services', 'Get booked'],
      color: 'text-neon-teal',
      borderHover: 'group-hover:border-neon-teal'
    },
    {
      id: UserRole.ATTENDEE,
      title: 'Attendee',
      icon: User,
      description: 'I want to discover events, buy tickets, and have fun.',
      benefits: ['Personalized feed', 'Group chat', 'Exclusive drops'],
      color: 'text-neon-blue',
      borderHover: 'group-hover:border-neon-blue'
    }
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
      {roles.map((role) => {
        const isSelected = selectedRole === role.id;
        
        return (
            <div 
                key={role.id}
                onClick={() => onSelect(role.id)}
                className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected 
                    ? `bg-neutral-900 border-neon-blue shadow-[0_0_15px_rgba(37,99,235,0.2)]` 
                    : `bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 ${role.borderHover}`
                }`}
            >
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700 ${role.color}`}>
                        <role.icon size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className={`font-bold text-lg mb-1 flex items-center justify-between ${isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                            {role.title}
                            {isSelected && <Check size={18} className="text-neon-blue" />}
                        </h3>
                        <p className="text-sm text-neutral-400 mb-3 leading-snug">
                            {role.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {role.benefits.slice(0, 2).map((b, i) => (
                                <span key={i} className="text-[10px] bg-neutral-800 px-2 py-1 rounded text-neutral-500 group-hover:text-neutral-300 transition-colors">
                                    {b}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
      })}
    </div>
  );
};
