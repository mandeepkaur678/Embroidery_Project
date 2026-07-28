import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    default: "bg-sage text-white hover:bg-sage-dark shadow-warm-sm hover:shadow-warm-md",
    primary: "bg-sage text-white hover:bg-sage-dark shadow-warm-sm hover:shadow-warm-md",
    secondary: "bg-terracotta text-white hover:bg-terracotta-dark shadow-warm-sm hover:shadow-warm-md",
    outline: "border-2 border-sage text-sage-dark hover:bg-sage hover:text-white bg-transparent",
    outlineTerracotta: "border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white bg-transparent",
    beige: "bg-beige text-earth hover:bg-beige-dark shadow-warm-sm",
    ghost: "text-earth-muted hover:text-sage-dark hover:bg-sage/10 bg-transparent",
    link: "text-terracotta hover:text-terracotta-dark underline-offset-4 hover:underline bg-transparent p-0",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-2.5 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5",
    icon: "h-10 w-10 p-0 rounded-full",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}

      {...props}
    >
      {children}
    </button>
  );
});


Button.displayName = 'Button';


