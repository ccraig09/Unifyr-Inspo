import React, { useState } from 'react';
import { Event, Category } from '../types';
import { EventCard } from '../components/EventCard';
import { Button, Input, Tabs, Badge } from '../components/ui';
import { Filter, Map, List, Search } from 'lucide-react';

interface EventsPageProps {
  events: Event[];
  onEventClick: (e: Event) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events, onEventClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [search, setSearch] = useState('');

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Search Header */}
      <div className="py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Explore Events</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                <Input 
                    placeholder="Search by name, location, or category..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12"
                />
            </div>
            <div className="flex gap-2">
                <Button variant="secondary" onClick={() => {}}>
                    <Filter size={18} /> Filters
                </Button>
                <div className="bg-neutral-900 p-1 rounded-xl border border-neutral-800 flex">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                        <List size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                        <Map size={20} />
                    </button>
                </div>
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
            <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800">Date: Any</Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800">Price: Free</Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800">Type: In-person</Badge>
            {Object.values(Category).filter(c => c !== Category.ALL).map(cat => (
                <Badge key={cat} variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800">{cat}</Badge>
            ))}
        </div>

        {/* Results */}
        {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} onClick={onEventClick} />
                ))}
            </div>
        ) : (
            <div className="h-[600px] bg-neutral-900 rounded-3xl flex items-center justify-center border border-neutral-800">
                <div className="text-center">
                    <Map size={48} className="text-neutral-700 mx-auto mb-4" />
                    <p className="text-neutral-400">Map view integration coming soon.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};