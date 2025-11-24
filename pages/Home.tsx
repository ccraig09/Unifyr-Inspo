import React from 'react';
import { Event, Category } from '../types';
import { TopPicks } from '../components/TopPicks';
import { EventCard } from '../components/EventCard';
import { Info } from 'lucide-react';

interface HomePageProps {
  events: Event[];
  user: any;
  selectedCategory: Category;
  onEventClick: (e: Event) => void;
  onSignUp: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ events, user, selectedCategory, onEventClick, onSignUp }) => {
  const feedEvents = selectedCategory === Category.ALL 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto">
        {!user && (
            <div className="px-6 mb-6">
                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Info size={16} className="text-neon-magenta" />
                        <span>Browsing as guest. Create an account to save preferences.</span>
                    </div>
                    <button onClick={onSignUp} className="bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                        Sign Up Free
                    </button>
                </div>
            </div>
        )}

        <TopPicks 
            events={events} 
            onEventClick={onEventClick} 
            selectedCategory={selectedCategory}
        />
        
        <div className="px-4 pb-20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Discover
                <span className="text-neutral-500 text-sm font-normal">
                    {feedEvents.length} events
                </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {feedEvents.map(event => (
                    <EventCard 
                        key={event.id} 
                        event={event} 
                        onClick={onEventClick} 
                    />
                ))}
            </div>
        </div>
    </div>
  );
};