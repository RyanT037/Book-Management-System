import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthActions } from '../../hooks/useAuthActions';

// Define the shape of the registration form data
type RegisterFormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  // Local state to manage the loading status during form submission
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerAction } = useAuthActions();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  // Handle form submission by calling the register action from the auth hook
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await registerAction(data);
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the platform and start managing your library."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Full Name Input Field with validation */}
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Librarian"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />

        {/* Username Input Field with validation */}
        <Input
          label="Username"
          type="text"
          autoComplete="username"
          placeholder="janedoe"
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username must be at least 3 characters',
            },
          })}
        />

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
          autoComplete="new-password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {/* Confirm Password Input Field with matching validation */}
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === getValues('password') || 'Passwords do not match',
          })}
        />

        {/* Submit Button with loading state */}
        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create account'}
        </Button>

        {/* Navigation link to the login page */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
