import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PasswordInput = forwardRef(({
  label = "Password",
  error,
  id = "password",
  placeholder = "Enter your password",
  showIcon = true,
  className,
  containerClassName,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col space-y-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-earth/80 select-none flex items-center justify-between"
        >
          <span>{label}</span>
        </label>
      )}

      <div className="relative flex items-center">
        {showIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth/50 pointer-events-none transition-colors">
            <Lock className="w-4 h-4 text-earth-muted/70" />
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            "w-full py-2.5 bg-cream/70 text-earth text-sm rounded-xl border border-beige/90 transition-all duration-300 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 focus:bg-white placeholder:text-earth-muted/50 shadow-xs",
            showIcon ? "pl-10 pr-11" : "pl-3.5 pr-11",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-earth-muted hover:text-sage transition-colors duration-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sage/30"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 transition-transform duration-200 scale-100" />
          ) : (
            <Eye className="w-4 h-4 transition-transform duration-200 scale-100" />
          )}
        </button>
      </div>

      {error && (
        <p id={errorId} className="text-xs text-red-500 font-medium pt-0.5 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
