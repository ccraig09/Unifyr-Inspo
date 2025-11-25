
import React, { useState } from 'react';
import { Button, Input } from '../ui';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginFormProps {
  onLoginSuccess: (role: UserRole) => void; // Passing generic role for mock
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic Validation
    if (!formData.email || !formData.password) {
        setError("Please fill in all fields.");
        setIsLoading(false);
        return;
    }

    // Mock API Call
    setTimeout(() => {
        setIsLoading(false);
        // Simulate Success
        // TODO: Wire up to real Login API
        onLoginSuccess(UserRole.HOST); // Defaulting to Host for demo
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-neutral-400">Enter your credentials to access your dashboard.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-6 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Email Address</label>
            <div className="relative">
                <Input 
                    type="email"
                    placeholder="name@example.com" 
                    className="pl-10 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={isLoading}
                />
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Password</label>
            <div className="relative">
                <Input 
                    type="password"
                    placeholder="••••••••" 
                    className="pl-10 pr-36 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    disabled={isLoading}
                />
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                
                <button 
                    type="button" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-neon-blue hover:text-white transition-colors"
                    tabIndex={-1}
                >
                    Forgot password?
                </button>
            </div>
        </div>

        <div className="flex items-center gap-2 ml-1">
            <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-yellow-400 focus:ring-offset-black focus:ring-yellow-400"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
            />
            <label htmlFor="remember" className="text-sm text-neutral-300 cursor-pointer select-none">Remember me for 30 days</label>
        </div>

        <Button 
            type="submit" 
            className="w-full h-12 text-base font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all rounded-full"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 size={20} className="animate-spin" /> Logging in...
                </>
            ) : (
                "Log In"
            )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-neutral-500 text-sm">
            New to Unifyr?{' '}
            <button 
                onClick={onSwitchToRegister}
                className="text-white font-bold hover:text-yellow-400 transition-colors"
            >
                Create an account →
            </button>
        </p>
      </div>
    </div>
  );
};
