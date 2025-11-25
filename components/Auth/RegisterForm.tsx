
import React, { useState } from 'react';
import { Button, Input } from '../ui';
import { RoleSelect } from './RoleSelect';
import { UserRole } from '../../types';
import { Mail, Lock, User as UserIcon, AlertCircle, ArrowLeft, Loader2, ArrowRight } from 'lucide-react';

interface RegisterFormProps {
  onRegisterSuccess: (role: UserRole) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: null as UserRole | null,
    terms: false
  });

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields.");
        return false;
    }
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
    }
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return false;
    }
    if (!formData.terms) {
        setError("You must agree to the terms.");
        return false;
    }
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (validateStep1()) {
        setStep(2);
    }
  };

  const handleFinalSubmit = async () => {
    if (!formData.role) {
        setError("Please select a role to continue.");
        return;
    }
    setError(null);
    setIsLoading(true);

    // Mock API
    setTimeout(() => {
        setIsLoading(false);
        // TODO: Wire up to Register API
        onRegisterSuccess(formData.role!);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="mb-8">
        {step === 1 ? (
            <>
                <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                <p className="text-neutral-400">Join the video-first event community.</p>
            </>
        ) : (
            <div className="flex items-center gap-3">
                <button onClick={() => setStep(1)} className="p-2 -ml-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold">Select Role</h2>
                    <p className="text-neutral-400 text-sm">How will you use Unifyr?</p>
                </div>
            </div>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 mb-6 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleContinue} className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Full Name</label>
                <div className="relative">
                    <Input 
                        placeholder="Alex Designer" 
                        className="pl-10 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Email</label>
                <div className="relative">
                    <Input 
                        type="email"
                        placeholder="name@example.com" 
                        className="pl-10 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Password</label>
                    <div className="relative">
                        <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-neutral-500 ml-1">Confirm</label>
                    <div className="relative">
                        <Input 
                            type="password"
                            placeholder="••••••••" 
                            className="pl-10 bg-neutral-800/50 border-transparent focus:bg-neutral-800 focus:border-neon-blue rounded-2xl transition-all"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-3 ml-1 pt-2">
                <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-yellow-400 focus:ring-offset-black focus:ring-yellow-400"
                    checked={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                />
                <label htmlFor="terms" className="text-xs text-neutral-400 cursor-pointer select-none leading-relaxed">
                    I agree to the <span className="text-white hover:underline">Terms of Service</span> and <span className="text-white hover:underline">Privacy Policy</span>, including the Video-First Content Guidelines.
                </label>
            </div>

            <Button 
                type="submit" 
                className="w-full h-12 mt-4 text-base font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all rounded-full"
            >
                Continue <ArrowRight size={18} />
            </Button>
        </form>
      ) : (
        <div className="space-y-8">
            <RoleSelect 
                selectedRole={formData.role} 
                onSelect={(role) => setFormData({...formData, role})}
            />

            <Button 
                onClick={handleFinalSubmit}
                disabled={isLoading || !formData.role}
                className="w-full h-12 text-base font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all rounded-full"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" /> Creating Account...
                    </>
                ) : (
                    "Create Account"
                )}
            </Button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 text-center">
            <p className="text-neutral-500 text-sm">
                Already have an account?{' '}
                <button 
                    onClick={onSwitchToLogin}
                    className="text-white font-bold hover:text-yellow-400 transition-colors"
                >
                    Log in →
                </button>
            </p>
        </div>
      )}
    </div>
  );
};
