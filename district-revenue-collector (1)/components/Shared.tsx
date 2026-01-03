
import React from 'react';

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ children, onClick, type = 'button', variant = 'primary', disabled, className = '', size = 'md' }) => {
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-95',
    secondary: 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 active:scale-95',
    ghost: 'bg-transparent text-emerald-600 hover:bg-emerald-50 active:scale-95',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:scale-95'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 font-medium',
    lg: 'px-6 py-4 text-lg font-bold',
    xl: 'px-8 py-5 text-xl font-black uppercase tracking-wider'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const StepIndicator: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div className="flex gap-2 mb-6">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
          i < current ? 'bg-emerald-500' : i === current ? 'bg-amber-400' : 'bg-slate-200'
        }`}
      />
    ))}
  </div>
);
