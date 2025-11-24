import React from 'react';
import { Play, TrendingUp, Users } from 'lucide-react';
import { Card } from './ui';

export const StatCard: React.FC<{ label: string, value: string | number, icon: React.ElementType, trend?: string }> = ({ 
    label, value, icon: Icon, trend 
}) => (
    <Card className="p-6 relative group hover:border-neutral-600 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-neutral-800 rounded-xl text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Icon size={24} />
            </div>
            {trend && (
                <span className="text-green-400 text-xs font-bold bg-green-900/30 px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} /> {trend}
                </span>
            )}
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-neutral-500 text-sm font-medium">{label}</div>
    </Card>
);

export const VideoListRow: React.FC<{ title: string, videos: any[] }> = ({ title, videos }) => (
    <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4 px-1">{title}</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {videos.map((vid, idx) => (
                <div key={idx} className="min-w-[160px] w-[160px] h-[240px] bg-neutral-900 rounded-xl relative overflow-hidden flex-shrink-0 border border-neutral-800 group cursor-pointer">
                    <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur">
                            <Play size={20} fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                        <p className="text-xs font-bold text-white truncate">{vid.title}</p>
                        <p className="text-[10px] text-neutral-400">{vid.views || '1.2k'} views</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);