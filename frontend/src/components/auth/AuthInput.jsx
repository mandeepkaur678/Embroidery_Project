import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const AuthInput = forwardRef(({
  label,
  icon: Icon,
  error,
  id,
  type = 'text',
  placeholder,
  className,
  containerClassName,
  ...props
}, ref) => {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col space-y-1.5", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-earth/80 select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth/50 pointer-events-none transition-colors">
            <Icon className="w-4 h-4 text-earth-muted/70" />
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            "w-full py-2.5 bg-cream/70 text-earth text-sm rounded-xl border border-beige/90 transition-all duration-300 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 focus:bg-white placeholder:text-earth-muted/50 shadow-xs",
            Icon ? "pl-10 pr-3.5" : "px-3.5",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50/20",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p id={errorId} className="text-xs text-red-500 font-medium pt-0.5 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
});

AuthInput.displayName = 'AuthInput';
