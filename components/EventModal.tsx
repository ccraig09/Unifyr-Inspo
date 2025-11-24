import React, { useEffect, useState } from 'react';
import { Event, Todo } from '../types';
import { X, MessageCircle, Clock, MapPin, DollarSign, CheckSquare, Plus, Play } from 'lucide-react';
import { generateTodoSuggestions } from '../services/geminiService';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (text: string, eventId?: string) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose, onAddTodo }) => {
  const [suggestedTodos, setSuggestedTodos] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (isOpen && event) {
        setLoadingSuggestions(true);
        generateTodoSuggestions(event.title).then(todos => {
            setSuggestedTodos(todos);
            setLoadingSuggestions(false);
        });
    }
  }, [isOpen, event]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl border border-neutral-800">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
        >
            <X size={20} />
        </button>

        {/* Left: Video Player */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative bg-black">
            <video 
                src={event.videoUrl} 
                poster={event.thumbnailUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
                <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {event.category}
                </span>
            </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto bg-neutral-900 scrollbar-thin scrollbar-thumb-neutral-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{event.title}</h2>
            
            {/* Host */}
            <div className="flex items-center justify-between bg-neutral-800/50 p-4 rounded-2xl mb-6 border border-neutral-800">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-neutral-700 overflow-hidden border border-neutral-600">
                        <img src={event.hostAvatar} alt={event.host} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-white font-bold">{event.host}</div>
                        <div className="text-neutral-400 text-xs">Host</div>
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
                    <MessageCircle size={16} />
                    Chat
                </button>
            </div>

            {/* Info List */}
            <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="bg-neutral-800 p-3 rounded-xl text-yellow-400">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">When</h4>
                        <p className="text-neutral-400 text-sm">{event.date}</p>
                        <p className="text-neutral-400 text-sm">{event.time}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-neutral-800 p-3 rounded-xl text-yellow-400">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Where</h4>
                        <p className="text-neutral-400 text-sm">{event.location}</p>
                        <p className="text-neutral-500 text-xs">{event.distance} away</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-neutral-800 p-3 rounded-xl text-yellow-400">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-1">Price</h4>
                        <p className="text-neutral-400 text-sm">{event.price === 0 ? 'Free' : `$${event.price}`}</p>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-white font-bold mb-2">About this event</h3>
                <p className="text-neutral-400 leading-relaxed">
                    {event.description}
                </p>
            </div>

            {/* AI Suggested Tasks */}
            <div className="mb-8 bg-neutral-800/30 p-4 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-3">
                    <CheckSquare size={18} className="text-neon-blue" />
                    <h3 className="text-white font-bold">Plan your attendance</h3>
                </div>
                {loadingSuggestions ? (
                    <div className="text-neutral-500 text-sm animate-pulse">AI is generating planning tasks...</div>
                ) : (
                    <div className="space-y-2">
                        {suggestedTodos.map((todo, idx) => (
                            <div key={idx} className="flex items-center justify-between text-sm group p-2 rounded hover:bg-neutral-800 transition-colors">
                                <span className="text-neutral-300">{todo}</span>
                                <button 
                                    onClick={() => onAddTodo(todo, event.id)}
                                    className="text-yellow-400 hover:text-white p-1 rounded hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition-colors text-lg shadow-lg flex items-center justify-center gap-2">
                Get Tickets
            </button>
        </div>
      </div>
    </div>
  );
};