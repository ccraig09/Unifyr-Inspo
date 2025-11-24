import React, { useState } from 'react';
import { X, Wand2, Loader2, Video } from 'lucide-react';
import { Category } from '../types';
import { generateEventDescription } from '../services/geminiService';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.SINGING_DANCING);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerateDescription = async () => {
    if (!title || !location) {
        alert("Please enter a title and location first.");
        return;
    }
    setIsGenerating(true);
    const aiDesc = await generateEventDescription(title, category, location);
    setDescription(aiDesc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Video URL validation
    if (!videoUrl) {
        alert("A video is required to create an event.");
        return;
    }

    const newEvent = {
        id: Date.now().toString(),
        title,
        category,
        location,
        date,
        time,
        description,
        host: 'You (Host)',
        hostAvatar: 'https://picsum.photos/seed/me/50/50',
        distance: '0.1 mi',
        price: 0,
        attendees: 1,
        videoUrl: videoUrl,
        thumbnailUrl: 'https://picsum.photos/seed/video_placeholder/400/600', // Fallback thumb
        isPromoted: false
    };
    onSubmit(newEvent);
    onClose();
    // Reset form
    setTitle('');
    setLocation('');
    setVideoUrl('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 w-full max-w-lg rounded-2xl border border-neutral-800 p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white">
            <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Video className="text-neon-blue" />
            Create Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Event Title</label>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                    placeholder="e.g., Rooftop Sunset Yoga"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                    >
                        {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Location</label>
                    <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="San Francisco, CA"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Event Video URL</label>
                <div className="relative">
                    <input 
                        type="url" 
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 pl-10 text-white focus:border-yellow-400 focus:outline-none"
                        placeholder="https://example.com/video.mp4"
                    />
                    <Video size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Photos are not allowed. Please provide a direct video link (mp4/webm).</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Date</label>
                    <input 
                        type="text" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Fri, Nov 24"
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Time</label>
                    <input 
                        type="text" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="8:00 PM"
                        required
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-neutral-400 uppercase">Description</label>
                    <button 
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={isGenerating}
                        className="flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300 font-medium"
                    >
                        {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12} />}
                        {isGenerating ? 'Generating...' : 'AI Enhance'}
                    </button>
                </div>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none h-24 resize-none"
                    placeholder="Tell people what makes your event special..."
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition-colors mt-4"
            >
                Launch Event
            </button>
        </form>
      </div>
    </div>
  );
};