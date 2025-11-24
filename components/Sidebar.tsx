import React from 'react';
import { 
  Music, 
  Smile, 
  Trophy, 
  Gamepad2, 
  Heart, 
  Tv, 
  Mic2, 
  MoreHorizontal,
  Crown,
  Flame
} from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  const menuItems = [
    { label: Category.SINGING_DANCING, icon: Music },
    { label: Category.COMEDY, icon: Smile },
    { label: Category.SPORTS, icon: Trophy },
    { label: Category.ANIME_COMICS, icon: Gamepad2 },
    { label: Category.RELATIONSHIP, icon: Heart },
    { label: Category.SHOWS, icon: Tv },
    { label: Category.LIPSYNC, icon: Mic2 },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col h-screen fixed left-0 top-0 bg-black border-r border-neutral-800 pt-20 pb-4 overflow-y-auto z-10">
      <div className="px-4 mb-6">
        <button 
          onClick={() => onSelectCategory(Category.ALL)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${selectedCategory === Category.ALL ? 'bg-yellow-400 text-black font-bold' : 'text-neutral-400 hover:bg-neutral-900'}`}
        >
          <Flame size={20} />
          All Events
        </button>
      </div>

      <div className="px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelectCategory(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
              selectedCategory === item.label 
                ? 'bg-neutral-800 text-white' 
                : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors text-sm font-medium">
          <MoreHorizontal size={18} />
          More
        </button>
      </div>

      <div className="mt-8 px-6">
        <div className="flex items-center gap-2 text-neon-blue font-bold mb-4">
          <Crown size={18} />
          <span>Sponsored</span>
        </div>
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <h4 className="text-white font-semibold mb-1">Discover trending events in your area</h4>
            <p className="text-xs text-neutral-500">Boost your reach today.</p>
        </div>
      </div>
    </aside>
  );
};