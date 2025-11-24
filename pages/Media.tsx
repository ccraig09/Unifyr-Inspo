import React from 'react';
import { MOCK_UPLOADS } from '../constants';
import { Card, Button, Progress, Badge } from '../components/ui';
import { CloudUpload, Play, Trash2, Edit2, Film, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const MediaPage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Media Manager</h1>

            {/* Upload Zone */}
            <div className="mb-10">
                <div className="border-2 border-dashed border-neutral-700 bg-neutral-900/30 rounded-3xl p-10 flex flex-col items-center justify-center hover:border-neon-blue hover:bg-neutral-900/50 transition-all cursor-pointer group">
                    <div className="p-4 bg-neutral-800 rounded-full mb-4 group-hover:bg-neon-blue group-hover:text-white transition-colors">
                        <CloudUpload size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Drag and drop video files</h3>
                    <p className="text-neutral-500 text-sm mb-6">MP4, MOV up to 100MB. Duration 15-120s.</p>
                    <Button>Select Files</Button>
                </div>
            </div>

            {/* Processing Timeline (Mock for active upload) */}
            <div className="mb-12">
                <h3 className="text-lg font-bold mb-4">Processing Queue</h3>
                <Card className="p-6 border-neon-blue/30">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-neutral-800 rounded-lg">
                            <Film size={24} className="text-neon-blue" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold text-sm">interview_clip.mov</span>
                                <span className="text-xs text-neon-blue font-bold">Transcoding...</span>
                            </div>
                            <Progress value={45} />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 px-2">
                        <div className="flex items-center gap-2 text-green-400"><CheckCircle size={12}/> Uploaded</div>
                        <div className="flex items-center gap-2 text-neon-blue"><Loader2 size={12} className="animate-spin"/> Transcoding</div>
                        <div className="flex items-center gap-2">CDN Push</div>
                        <div className="flex items-center gap-2">Ready</div>
                    </div>
                </Card>
            </div>

            {/* Library */}
            <h3 className="text-lg font-bold mb-4">Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_UPLOADS.map(vid => (
                    <div key={vid.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group">
                        <div className="aspect-[9/16] bg-black relative">
                            {vid.posterUrl ? (
                                <img src={vid.posterUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                                    <Film size={32} />
                                </div>
                            )}
                            
                            <div className="absolute top-2 right-2">
                                <Badge variant={vid.status === 'Ready' ? 'success' : vid.status === 'Error' ? 'danger' : 'warning'}>
                                    {vid.status}
                                </Badge>
                            </div>

                            {vid.status === 'Ready' && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                                    <button className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform">
                                        <Play size={20} fill="currentColor" />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-sm truncate mb-1">{vid.fileName}</h4>
                            <div className="flex justify-between items-center text-xs text-neutral-500 mb-3">
                                <span>{vid.duration}</span>
                                <span>{vid.uploadDate}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" className="flex-1 text-xs">
                                    <Edit2 size={12} /> Edit
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50">
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};