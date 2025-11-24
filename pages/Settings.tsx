import React, { useState } from 'react';
import { User } from '../types';
import { Button, Card, Switch, Input } from '../components/ui';
import { Bell, Lock, LogOut, User as UserIcon, Shield, Smartphone, Music, Video, Tv } from 'lucide-react';

export const SettingsPage: React.FC<{ user: User }> = ({ user }) => {
    const [notifications, setNotifications] = useState({ push: true, email: false, sms: true });
    
    const connectedAccounts = [
        { name: 'Spotify', icon: Music, connected: true, status: 'Connected' },
        { name: 'YouTube', icon: Video, connected: false, status: 'Not connected' },
        { name: 'Disney+', icon: Tv, connected: true, status: 'Syncing' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Settings & Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <Card className="p-6 text-center">
                        <div className="w-24 h-24 mx-auto bg-neutral-800 rounded-full overflow-hidden mb-4 border-2 border-neon-blue">
                             <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <div className="text-neon-blue text-sm font-bold uppercase tracking-wide mb-4">{user.role}</div>
                        <p className="text-neutral-400 text-sm mb-6">
                            Passionate about creating immersive music experiences. Based in SF.
                        </p>
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                    </Card>
                </div>

                {/* Settings Panels */}
                <div className="md:col-span-2 space-y-6">
                    {/* Security */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-yellow-400" />
                            <h3 className="text-lg font-bold">Security</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-sm">Two-Factor Authentication</div>
                                    <div className="text-xs text-neutral-500">Secure your account with 2FA</div>
                                </div>
                                <Switch checked={true} onChange={() => {}} />
                            </div>
                            <Button variant="secondary" size="sm" className="w-full">Change Password</Button>
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="text-neon-blue" />
                            <h3 className="text-lg font-bold">Notifications</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Push Notifications</span>
                                <Switch checked={notifications.push} onChange={(c) => setNotifications({...notifications, push: c})} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Email Updates</span>
                                <Switch checked={notifications.email} onChange={(c) => setNotifications({...notifications, email: c})} />
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="text-sm">SMS Reminders</span>
                                <Switch checked={notifications.sms} onChange={(c) => setNotifications({...notifications, sms: c})} />
                            </div>
                        </div>
                    </Card>

                    {/* Connected Accounts */}
                    <Card className="p-6">
                         <div className="flex items-center gap-3 mb-6">
                            <Smartphone className="text-green-400" />
                            <h3 className="text-lg font-bold">Connected Accounts</h3>
                        </div>
                        <div className="space-y-4">
                            {connectedAccounts.map(acc => (
                                <div key={acc.name} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-neutral-800 rounded-lg">
                                            <acc.icon size={18} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{acc.name}</div>
                                            <div className={`text-[10px] ${acc.connected ? 'text-green-400' : 'text-neutral-500'}`}>{acc.status}</div>
                                        </div>
                                    </div>
                                    <Button variant={acc.connected ? "outline" : "primary"} size="sm" className="text-xs px-3 py-1">
                                        {acc.connected ? 'Disconnect' : 'Connect'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Button variant="destructive" className="w-full">
                        <LogOut size={16} /> Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
};