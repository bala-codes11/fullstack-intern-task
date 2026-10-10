
import { useState } from 'react';
import {
  ArrowRight,
  Layers3,
  LockKeyhole,
  Mail,
  Sparkles,
  Heart,
  Palette,
} from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from;
  const redirectTo =
    typeof destination === 'string'
      ? destination
      : destination?.pathname || '/templates';

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/templates" replace />;
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: form.email.trim(),
        password: form.password,
      });

      login(response.data);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to log in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-65px)] bg-white lg:grid lg:h-[calc(100dvh-65px)] lg:grid-cols-2 lg:overflow-hidden">
      {/* Left branding panel */}
      <section className="relative hidden h-full overflow-hidden bg-[#101c18] px-8 py-6 text-white lg:flex lg:flex-col lg:justify-between xl:px-12">
        <div className="pointer-events-none absolute -right-28 top-16 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

        <Link to="/templates" className="relative flex w-fit items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#101c18]">
            <Layers3 size={22} />
          </span>
          <span className="text-2xl font-black tracking-tight">
            forma<span className="text-emerald-400">.</span>
          </span>
        </Link>

        <div className="relative mx-auto my-4 w-full max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-emerald-300">
            <Sparkles size={14} />
            YOUR CREATIVE WORKSPACE
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
            Good design.
            <br />
            <span className="text-emerald-400">Less starting</span>
            <br />
            from scratch.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Discover thoughtfully crafted templates and build your next
            idea with confidence.
          </p>

          {/* CSS-based design illustration */}
          <div className="relative mx-auto mt-5 flex min-h-56 items-center justify-center sm:min-h-64">
            <div className="absolute h-44 w-44 rounded-full border border-emerald-400/20 sm:h-56 sm:w-56" />
            <div className="absolute h-36 w-36 rounded-full border border-emerald-400/20 sm:h-44 sm:w-44" />

            <div className="relative w-60 rotate-[-6deg] rounded-2xl border border-white/20 bg-white p-4 shadow-2xl transition-transform duration-500 hover:rotate-0 sm:w-64">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <Sparkles size={15} className="text-emerald-700" />
              </div>

              <div className="mt-4 rounded-xl bg-[#e6f4e9] p-3">
                <div className="h-1.5 w-12 rounded-full bg-emerald-700/40" />
                <div className="mt-3 h-2.5 w-full rounded-full bg-slate-900/80" />
                <div className="mt-2 h-2.5 w-3/4 rounded-full bg-slate-900/80" />
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-300" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-slate-300" />
                <div className="mt-4 h-7 w-20 rounded-lg bg-emerald-700" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-9 rounded-lg bg-emerald-200" />
                <div className="h-9 rounded-lg bg-amber-200" />
                <div className="h-9 rounded-lg bg-teal-300" />
              </div>
            </div>

            <div className="absolute right-0 top-4 flex h-11 w-11 items-center justify-center rotate-6 rounded-xl border border-white/15 bg-[#203a2e] shadow-xl sm:right-3">
              <Heart size={21} className="text-emerald-300" fill="currentColor" />
            </div>

            <div className="absolute bottom-3 left-0 flex -rotate-3 items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-xl sm:left-3">
              <Palette size={17} className="text-emerald-700" />
              <span className="text-xs font-bold text-slate-800">
                Your design space
              </span>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} Forma. Built for creative minds.
        </p>
      </section>

      {/* Login form */}
      <section className="flex min-h-[calc(100dvh-65px)] items-center justify-center px-5 py-8 sm:px-10 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-6 xl:px-16">
        <div className="w-full max-w-md">
          <Link
            to="/templates"
            className="mb-8 inline-flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Layers3 size={20} />
            </span>
            forma<span className="-ml-2 text-emerald-600">.</span>
          </Link>

          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Welcome back
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Sign in to Forma
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Pick up where you left off. Your saved templates are waiting.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  maxLength={72}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#142b22] px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              NEW TO FORMA?
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              state={location.state}
              className="font-bold text-emerald-700 transition hover:text-emerald-800 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            Your ideas deserve a beautiful starting point.
          </p>
        </div>
      </section>
    </main>
  );
}
