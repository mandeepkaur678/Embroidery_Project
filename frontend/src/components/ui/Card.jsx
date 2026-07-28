import React from 'react';
import { cn } from '../../lib/utils';


const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-beige/80 bg-white/90 backdrop-blur-xs text-earth shadow-warm-sm transition-all duration-300",

      className
    )}
    {...props}
  />
));
Card.displayName = "Card";


const CardHeader = React.forwardRef(({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";


const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-serif text-xl font-semibold leading-none tracking-tight text-earth", className)}

    {...props}
  />
));
CardTitle.displayName = "CardTitle";


const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-earth-muted leading-relaxed", className)}

    {...props}

  />
));
CardDescription.displayName = "CardDescription";


const CardContent = React.forwardRef(({ className, ...props }, ref) => (

  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";


const CardFooter = React.forwardRef(({ className, ...props }, ref) => (

  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";


export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

