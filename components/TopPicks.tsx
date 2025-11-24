import React from 'react';
import { Event, Category } from '../types';
import { EventCard } from './EventCard';
import { RefreshCw, SlidersHorizontal, Calendar, MapPin, Tag, DollarSign } from 'lucide-react';

interface TopPicksProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  selectedCategory: Category;
}

export const TopPicks: React.FC<TopPicksProps> = ({ events, onEventClick, selectedCategory }) => {
  // Filter logic would go here, for now passing all
  const displayedEvents = selectedCategory === Category.ALL 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-xl font-bold text-white">Pick Six</h2>
        <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
            <RefreshCw size={14} />
            Refresh mix
        </button>
      </div>

      {/* Quick Filters for Top Picks */}
      <div className="flex items-center gap-2 px-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {['Tonight', 'This Week', 'Next Week'].map((filter, idx) => (
            <button 
                key={filter}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${idx === 0 ? 'bg-yellow-400 text-black' : 'bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-600'}`}
            >
                {filter}
            </button>
        ))}
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-8 snap-x scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
        {displayedEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={onEventClick} 
            featured={true} 
          />
        ))}
        {displayedEvents.length === 0 && (
            <div className="w-full text-center py-10 text-neutral-500">
                No events found in this category.
            </div>
        )}
      </div>

      {/* Bottom Filter Bar */}
      <div className="border-t border-neutral-800 pt-4 px-4 mt-2 flex flex-wrap gap-6">
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400">
            <Calendar size={16} />
            Date
        </button>
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400">
            <MapPin size={16} />
            Distance
            <span className="bg-neutral-800 text-xs px-1.5 py-0.5 rounded text-neutral-300">25 mi</span>
        </button>
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400">
            <Tag size={16} />
            Category
        </button>
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400">
            <DollarSign size={16} />
            Price
        </button>
        <button className="flex items-center gap-2 text-white text-sm font-medium hover:text-yellow-400 ml-auto">
            <SlidersHorizontal size={16} />
            Accessibility
        </button>
      </div>
    </div>
  );
};