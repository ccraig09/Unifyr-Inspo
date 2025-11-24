import React, { useState } from 'react';
import { MOCK_THREADS, MOCK_MESSAGES } from '../constants';
import { Card, Input, Button, Badge } from '../components/ui';
import { Send, Paperclip, Video, FileText, Sparkles, MoreVertical, Search } from 'lucide-react';

export const SocialPage: React.FC = () => {
    const [selectedThreadId, setSelectedThreadId] = useState(MOCK_THREADS[0].id);
    const [messageInput, setMessageInput] = useState('');
    
    const activeThread = MOCK_THREADS.find(t => t.id === selectedThreadId);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-black">
            {/* Sidebar List */}
            <div className="w-full md:w-80 border-r border-neutral-800 flex flex-col">
                <div className="p-4 border-b border-neutral-800">
                    <h2 className="font-bold text-xl mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                        <Input placeholder="Search chats..." className="pl-9 py-2 text-sm" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {MOCK_THREADS.map(thread => (
                        <div 
                            key={thread.id}
                            onClick={() => setSelectedThreadId(thread.id)}
                            className={`p-4 border-b border-neutral-800 cursor-pointer hover:bg-neutral-900 transition-colors ${selectedThreadId === thread.id ? 'bg-neutral-900' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm truncate w-32">{thread.eventName}</h4>
                                <span className="text-[10px] text-neutral-500">{thread.lastMessageTime}</span>
                            </div>
                            <p className="text-xs text-neutral-400 truncate mb-2">{thread.lastMessage}</p>
                            <div className="flex items-center gap-1">
                                {thread.participants.map((p, i) => (
                                    <img key={i} src={p.avatar} className="w-5 h-5 rounded-full border border-black" title={p.name} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <div className="h-16 border-b border-neutral-800 flex items-center justify-between px-6 bg-black/50 backdrop-blur">
                    <div>
                        <h3 className="font-bold">{activeThread?.eventName}</h3>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                        </span>
                    </div>
                    <Button variant="ghost" size="sm"><MoreVertical size={18} /></Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* AI Summary Banner */}
                    <div className="bg-neutral-900/50 border border-neon-blue/30 p-3 rounded-xl flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-neon-blue" />
                            <span className="text-sm text-neutral-300">Catch up on what you missed.</span>
                         </div>
                         <Button size="sm" variant="ghost" className="text-neon-blue hover:text-white">Summarize</Button>
                    </div>

                    {MOCK_MESSAGES.map(msg => (
                        <div key={msg.id} className={`flex gap-3 ${msg.senderName === 'Alex Designer' ? 'flex-row-reverse' : ''}`}>
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0">
                                <img src={msg.senderAvatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className={`max-w-[70%] space-y-1 ${msg.senderName === 'Alex Designer' ? 'items-end flex flex-col' : ''}`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-neutral-400">{msg.senderName}</span>
                                    <span className="text-[10px] text-neutral-600">{msg.timestamp}</span>
                                </div>
                                
                                {msg.type === 'text' && (
                                    <div className={`px-4 py-2 rounded-2xl text-sm ${msg.senderName === 'Alex Designer' ? 'bg-neon-blue text-white' : 'bg-neutral-800 text-neutral-200'}`}>
                                        {msg.content}
                                    </div>
                                )}

                                {msg.type === 'logisticCard' && (
                                    <Card className="p-3 w-64 border-neutral-700 bg-neutral-800 hover:border-neon-blue transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-white">{msg.metadata.title}</div>
                                                <div className="text-[10px] text-neutral-500">{msg.metadata.size}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-neon-blue font-bold uppercase tracking-wider group-hover:underline">Download PDF</div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-neutral-800 bg-black">
                    {/* Quick Chips */}
                    <div className="flex gap-2 mb-3 overflow-x-auto">
                        <Badge variant="outline" className="cursor-pointer hover:bg-neutral-800 py-1">Confirm arrival</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-neutral-800 py-1">Share location</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-neutral-800 py-1">Upload invoice</Badge>
                    </div>
                    
                    <div className="flex gap-2">
                        <Button variant="secondary" className="px-3 rounded-xl"><Paperclip size={18} /></Button>
                        <div className="flex-1 relative">
                            <input 
                                className="w-full h-full bg-neutral-900 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-blue"
                                placeholder="Type a message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                        </div>
                        <Button className="px-6 rounded-xl bg-neon-blue hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                            <Send size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};