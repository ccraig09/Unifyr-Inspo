
import React from 'react';
import { SAMPLE_VIDEOS } from '../../constants';
import { CheckCircle2, Play } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT: Cinematic Video Hero */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-neutral-900 overflow-hidden">
        {/* Video Background */}
        <video
          src={SAMPLE_VIDEOS[5]} // Using "ForBiggerJoyrides" or similar energetic clip
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

        {/* Content Content */}
        <div className="relative z-10 flex flex-col justify-end h-full p-16 pb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-neon-blue/20 border border-neon-blue/50 text-neon-blue px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 w-fit backdrop-blur-md">
            <Play size={10} fill="currentColor" />
            Video-First Events
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-4 text-white drop-shadow-xl">
            {title}
          </h1>
          
          <p className="text-lg text-neutral-300 mb-8 leading-relaxed max-w-lg">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            {['VIP Hosting', 'Realtime Chat', 'Smart Suggestions'].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 size={16} className="text-yellow-400" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Form Container */}
      <div className="w-full lg:w-[40%] flex flex-col bg-black border-l border-neutral-800 h-screen overflow-y-auto relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden h-40 relative flex-shrink-0">
          <video
            src={SAMPLE_VIDEOS[5]}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          <div className="absolute bottom-4 left-6 z-10">
             <h1 className="text-2xl font-bold text-white">Unifyr</h1>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 max-w-xl mx-auto w-full">
            {children}
        </div>

        {/* Footer Links */}
        <div className="p-6 text-center text-xs text-neutral-500">
           &copy; 2025 Unifyr. <a href="#" className="hover:text-white underline">Privacy</a> &bull; <a href="#" className="hover:text-white underline">Terms</a>
        </div>
      </div>
    </div>
  );
};
