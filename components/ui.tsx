import React from 'react';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}
export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', className = '', ...props 
}) => {
  const baseStyle = "font-bold rounded-full transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/20",
    secondary: "bg-white text-black hover:bg-neutral-200",
    ghost: "text-white hover:bg-white/10",
    outline: "border border-neutral-700 text-white hover:border-white",
    destructive: "bg-red-500 text-white hover:bg-red-600"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Card
export const Card: React.FC<{ children?: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

// Badge
export const Badge: React.FC<{ children?: React.ReactNode, variant?: 'default' | 'outline' | 'neon' | 'success' | 'warning' | 'danger', className?: string }> = ({ 
  children, variant = 'default', className = '' 
}) => {
  const variants = {
    default: "bg-neutral-800 text-white",
    outline: "border border-neutral-700 text-neutral-300",
    neon: "bg-neon-blue/20 text-neon-blue border border-neon-blue/50",
    success: "bg-green-500/20 text-green-400 border border-green-500/50",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
    danger: "bg-red-500/20 text-red-400 border border-red-500/50",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Tabs
interface TabItem {
    id: string;
    label: string;
}
export const Tabs: React.FC<{ items: TabItem[], activeId: string, onChange: (id: string) => void, className?: string }> = ({ 
    items, activeId, onChange, className = '' 
}) => (
    <div className={`flex items-center gap-1 bg-neutral-900/50 p-1 rounded-xl border border-neutral-800 ${className}`}>
        {items.map(item => (
            <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeId === item.id 
                    ? 'bg-neutral-800 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
            >
                {item.label}
            </button>
        ))}
    </div>
);

// Input
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none placeholder:text-neutral-600 transition-colors"
        {...props}
    />
);

// Switch
export const Switch: React.FC<{ checked: boolean, onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button 
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-neon-blue' : 'bg-neutral-700'}`}
        role="switch"
        aria-checked={checked}
    >
        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
);

// Progress
export const Progress: React.FC<{ value: number, className?: string }> = ({ value, className = '' }) => (
    <div className={`h-2 bg-neutral-800 rounded-full overflow-hidden ${className}`}>
        <div 
            className="h-full bg-neon-blue transition-all duration-500"
            style={{ width: `${value}%` }}
        />
    </div>
);