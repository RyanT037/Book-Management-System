import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthActions } from '../../hooks/useAuthActions';

// Define the shape of the login form data
type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  // Local state to manage the loading status during form submission
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  // Handle form submission by calling the login action from the auth hook
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch {
      toast.error('Email or password is incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your library dashboard."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email Input Field with validation */}
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@library.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />

        {/* Password Input Field with validation */}
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {/* Submit Button with loading state */}
        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>

        {/* Navigation link to the registration page */}
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
