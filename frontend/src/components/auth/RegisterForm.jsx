import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Loader2, ArrowRight, Flower2, Sparkles, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { registerSchema } from '../../schemas/authSchema';
import { AuthInput } from './AuthInput';
import { PasswordInput } from './PasswordInput';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const calculatePasswordStrength = (password = '') => {
  if (!password) return { score: 0, label: '', color: 'bg-gray-200', textClass: 'text-gray-400' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return { score: 33, label: 'Weak', color: 'bg-red-500', textClass: 'text-red-500' };
  } else if (score <= 4) {
    return { score: 66, label: 'Medium', color: 'bg-olive-dark', textClass: 'text-olive-dark' };
  } else {
    return { score: 100, label: 'Strong', color: 'bg-sage', textClass: 'text-sage-dark' };
  }
};

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onSubmit',
  });

  const passwordValue = watch('password', '');
  const strength = calculatePasswordStrength(passwordValue);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success('Your Artful Stitches account has been created!', {
        description: `Welcome, ${user.name}! Please sign in with your credentials.`,
      });

      reset();
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.', {
        description: 'Please check your details and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Section */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-terracotta">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN OUR CREATIVE JOURNEY</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
          Create Your Account
        </h1>

        <p className="text-sm text-earth-muted/90 font-sans">
          Join Artful Stitches and discover the beauty of handmade embroidery.
        </p>

        {/* Small Botanical Accent Line */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-px w-12 bg-beige" />
          <Flower2 className="w-3.5 h-3.5 text-sage" />
          <div className="h-px w-full bg-beige/50" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
        {/* Full Name Field */}
        <AuthInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          icon={User}
          error={errors.name?.message}
          {...register('name')}
        />

        {/* Email Field */}
        <AuthInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          icon={Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Password Field */}
        <div className="space-y-1.5">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Create your password"
            error={errors.password?.message}
            {...register('password')}
          />

          {/* Password Strength Indicator */}
          {passwordValue && (
            <div className="pt-0.5 space-y-1 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-earth-muted flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-earth-muted" />
                  Password strength:
                </span>
                <span className={`font-semibold ${strength.textClass}`}>
                  {strength.label}
                </span>
              </div>
              <div className="w-full h-1.5 bg-beige/40 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {/* Terms and Conditions */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-earth-muted">
            <input
              type="checkbox"
              id="terms"
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? "terms-error" : undefined}
              className="mt-0.5 w-4 h-4 rounded border-beige text-sage focus:ring-sage/30 accent-sage cursor-pointer shrink-0"
              {...register('terms')}
            />
            <span className="leading-snug">
              I agree to the{' '}
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="font-medium text-sage-dark hover:text-terracotta underline"
              >
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a
                href="#privacy"
                onClick={(e) => e.preventDefault()}
                className="font-medium text-sage-dark hover:text-terracotta underline"
              >
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {errors.terms && (
            <p id="terms-error" className="text-xs text-red-500 font-medium pt-1 animate-fadeIn">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-sage text-cream font-medium hover:bg-terracotta hover:-translate-y-0.5 active:translate-y-0 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-cream" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="pt-3 border-t border-beige/60 text-center">
        <p className="text-xs text-earth-muted">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-sage-dark hover:text-terracotta transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
