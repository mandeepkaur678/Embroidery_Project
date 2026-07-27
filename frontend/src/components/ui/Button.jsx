import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-mocha text-cream hover:bg-mocha-dark shadow-warm-sm hover:shadow-warm-md",
        secondary: "bg-sage text-white hover:bg-sage-dark shadow-warm-sm hover:shadow-warm-md",
        outline: "border-2 border-beige bg-transparent text-mocha hover:bg-cream-dark hover:border-mocha",
        ghost: "bg-transparent text-mocha hover:bg-beige-subtle hover:text-mocha-dark",
        accent: "bg-beige text-charcoal-dark hover:bg-mocha hover:text-cream shadow-warm-sm",
        link: "text-mocha underline-offset-4 hover:underline p-0 h-auto font-normal",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm md:text-base",
        sm: "h-9 px-4 text-xs md:text-sm",
        lg: "h-13 px-8 py-3 text-base md:text-lg rounded-xl",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
