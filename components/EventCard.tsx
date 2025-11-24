import React, { useRef, useState } from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, Volume2, VolumeX, Play } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  featured?: boolean; // Horizontal top picks
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, featured = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Style configurations
  // Featured: Fixed width for horizontal scroll
  // Not Featured (Grid): Responsive aspect ratio (9:16) for grid
  const containerClasses = featured
    ? "min-w-[260px] w-[260px] h-[380px] relative rounded-2xl overflow-hidden group cursor-pointer shrink-0 snap-start border border-neutral-800"
    : "relative w-full aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer shadow-lg border border-neutral-800 bg-neutral-900";

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          console.log("Auto-play prevented:", error);
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className={containerClasses} 
      onClick={() => onClick(event)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media Layer */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <img 
            src={event.thumbnailUrl} 
            alt={event.title} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
            ref={videoRef}
            src={event.videoUrl}
            muted={isMuted}
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

      {/* Mute Control - Visible on Hover */}
      {isHovering && (
        <button 
            onClick={toggleMute}
            className="absolute top-3 right-3 z-30 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 backdrop-blur-md transition-all"
        >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      )}

      {/* Promoted Badge */}
      {event.isPromoted && !isHovering && (
        <div className="absolute top-3 left-3 bg-neon-blue text-white text-[10px] font-bold px-2 py-1 rounded z-20 uppercase tracking-wide">
            Promoted
        </div>
      )}

      {/* View Count / Play Icon (TikTok style overlay) */}
      {!isHovering && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80">
            <Play size={40} fill="currentColor" className="opacity-50" />
        </div>
      )}
      
      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end">
        
        {/* Host Info */}
        <div className="flex items-center gap-2 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-6 h-6 rounded-full border border-white overflow-hidden">
                <img src={event.hostAvatar} alt={event.host} className="w-full h-full object-cover" />
            </div>
            <span className="text-white/90 font-medium text-xs drop-shadow-md truncate max-w-[150px]">{event.host}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold leading-tight drop-shadow-lg mb-2 line-clamp-2 group-hover:line-clamp-none transition-all">
            {event.title}
        </h3>

        {/* Quick Stats Grid */}
        <div className={`grid grid-cols-2 gap-1 text-[11px] text-neutral-300 transition-all duration-300 ${isHovering ? 'opacity-100 max-h-20' : 'opacity-80 max-h-0 overflow-hidden'}`}>
            <div className="flex items-center gap-1">
                <Calendar size={12} className="text-yellow-400" />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
                <MapPin size={12} className="text-yellow-400" />
                <span>{event.distance}</span>
            </div>
            <div className="flex items-center gap-1 col-span-2">
                <Users size={12} className="text-yellow-400" />
                <span>{event.attendees} attending</span>
            </div>
        </div>
      </div>
    </div>
  );
};