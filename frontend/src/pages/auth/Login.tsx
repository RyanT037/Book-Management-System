import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Input } from '../../components/ui/Input';
import { loginSchema, type LoginFormValues } from '../../schemas/auth.schema';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = async (_data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Connect to backend API on Day 5 — useAuthActions().login()
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success('Welcome back! (UI preview — auth connects on Day 5)');
      navigate('/dashboard');
    } catch {
      toast.error('Something went wrong. Please try again.');
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
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@library.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Checkbox label="Remember me" {...register('rememberMe')} />
          <button
            type="button"
            className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            onClick={() =>
              toast('Password reset will be available on Day 5', { icon: '🔒' })
            }
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>

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
