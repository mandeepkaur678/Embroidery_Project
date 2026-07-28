import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2, ArrowRight, Flower2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { loginSchema } from '../../schemas/authSchema';
import { AuthInput } from './AuthInput';
import { PasswordInput } from './PasswordInput';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await login({ email: data.email, password: data.password });
      toast.success(`Welcome back, ${user.name}!`, {
        description: 'You have successfully signed in to Artful Stitches.',
      });
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.', {
        description: 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-terracotta">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WELCOME BACK</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth tracking-tight">
          Welcome Back
        </h1>

        <p className="text-sm text-earth-muted/90 font-sans">
          Sign in to continue your Artful Stitches journey.
        </p>

        {/* Small Botanical Accent Line */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-px w-12 bg-beige" />
          <Flower2 className="w-3.5 h-3.5 text-sage" />
          <div className="h-px w-full bg-beige/50" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Login Options Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none text-earth-muted hover:text-earth transition-colors">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-beige text-sage focus:ring-sage/30 accent-sage cursor-pointer"
            />
            <span className="text-xs">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-xs font-medium text-terracotta hover:text-sage-dark transition-colors duration-200 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-sage text-cream font-medium hover:bg-terracotta hover:-translate-y-0.5 active:translate-y-0 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-cream" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="pt-4 border-t border-beige/60 text-center">
        <p className="text-xs text-earth-muted">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-sage-dark hover:text-terracotta transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};
