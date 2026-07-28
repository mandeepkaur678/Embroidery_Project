<<<<<<< HEAD
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
=======
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
>>>>>>> bbcd3489f6d0c19ebc258fd1e7c0aa79580e6481
}
