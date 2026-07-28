import React from 'react';
import { cn } from '../../lib/utils';

<<<<<<< HEAD
export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-beige/80 bg-white/90 backdrop-blur-xs text-earth shadow-warm-sm transition-all duration-300",
=======
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-beige/60 bg-white text-charcoal shadow-warm-sm transition-all duration-300 hover:shadow-warm-md hover:-translate-y-1 overflow-hidden",
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

<<<<<<< HEAD
export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
=======
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

<<<<<<< HEAD
export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-serif text-xl font-semibold leading-none tracking-tight text-earth", className)}
=======
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight text-mocha font-serif", className)}
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

<<<<<<< HEAD
export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-earth-muted leading-relaxed", className)}
=======
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-charcoal/70 leading-relaxed", className)}
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

<<<<<<< HEAD
export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
=======
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

<<<<<<< HEAD
export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
=======
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
<<<<<<< HEAD
=======

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
