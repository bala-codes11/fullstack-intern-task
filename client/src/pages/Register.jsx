
import { useState } from 'react';
import {
  ArrowRight,
  Layers3,
  LockKeyhole,
  Mail,
  UserRound,
  Sparkles,
  CheckCircle2,
  Palette,
  Heart,
} from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from;
  const redirectTo =
    typeof destination === 'string'
      ? destination
      : destination?.pathname || '/templates';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const name = form.name.trim();
    const email = form.email.trim();

    if (name.length < 2 || name.length > 60) {
      setError('Name must contain between 2 and 60 characters.');
      return;
    }

    if (form.password.length < 8 || form.password.length > 72) {
      setError('Password must contain between 8 and 72 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password: form.password,
      });

      login(response.data);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to create your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-65px)] bg-white lg:grid lg:h-[calc(100dvh-65px)] lg:grid-cols-2 lg:overflow-hidden">
      {/* Left branding panel */}
      <section className="relative hidden h-full overflow-hidden bg-[#101c18] px-8 py-5 text-white lg:flex lg:flex-col lg:justify-between xl:px-12">
        <div className="pointer-events-none absolute -left-28 top-12 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

        <Link to="/templates" className="relative flex w-fit items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#101c18]">
            <Layers3 size={22} />
          </span>
          <span className="text-2xl font-black tracking-tight">
            forma<span className="text-emerald-400">.</span>
          </span>
        </Link>

        <div className="relative mx-auto my-3 w-full max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-emerald-300">
            <Sparkles size={14} />
            MAKE ROOM FOR IDEAS
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight xl:text-5xl">
            Create your
            <br />
            space. Save
            <br />
            <span className="text-emerald-400">your inspiration.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Build your own collection of beautiful templates and find the
            perfect starting point for your next project.
          </p>

          {/* Abstract geometric design */}
          <div className="relative mx-auto mt-5 flex min-h-56 items-center justify-center sm:min-h-64">
            <div className="absolute left-8 top-5 h-20 w-20 rotate-12 rounded-3xl bg-emerald-400/15 sm:left-12" />
            <div className="absolute bottom-4 right-8 h-24 w-24 rounded-full border-2 border-emerald-400/30 sm:right-12" />

            <div className="relative grid w-full max-w-sm grid-cols-2 gap-3">
              <div className="flex min-h-36 flex-col justify-between rounded-2xl bg-[#e6f4e9] p-4 shadow-xl shadow-black/10">
                <Palette size={22} className="text-emerald-800" />
                <div>
                  <div className="h-2 w-14 rounded-full bg-emerald-700/40" />
                  <div className="mt-3 h-2.5 w-full rounded-full bg-slate-900/80" />
                  <div className="mt-2 h-2.5 w-3/4 rounded-full bg-slate-900/80" />
                </div>
              </div>

              <div className="mt-6 flex min-h-36 flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <Sparkles size={22} className="text-emerald-300" />
                <div>
                  <div className="h-2 w-full rounded-full bg-white/60" />
                  <div className="mt-2 h-2 w-2/3 rounded-full bg-white/25" />
                  <div className="mt-3 flex gap-2">
                    <div className="h-6 w-6 rounded-lg bg-emerald-400" />
                    <div className="h-6 w-6 rounded-lg bg-amber-300" />
                    <div className="h-6 w-6 rounded-lg bg-teal-500" />
                  </div>
                </div>
              </div>

              <div className="flex min-h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-700 shadow-xl shadow-black/10">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <span
                      key={item}
                      className="h-5 w-5 rounded-md border border-white/40 bg-white/20"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 flex min-h-24 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
                    <Heart size={20} fill="currentColor" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Your collection</p>
                    <p className="mt-1 text-xs text-slate-400">Made personal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-300">
            <p className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Discover curated templates
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Keep your favorite designs together
            </p>
          </div>
        </div>

        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} Forma. Make room for ideas.
        </p>
      </section>

      {/* Registration form */}
      <section className="flex min-h-[calc(100dvh-65px)] items-center justify-center px-5 py-6 sm:px-10 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-5 xl:px-16">
        <div className="w-full max-w-md">
          <Link
            to="/templates"
            className="mb-6 inline-flex items-center gap-2 text-lg font-black tracking-tight text-slate-900 lg:hidden"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Layers3 size={20} />
            </span>
            forma<span className="-ml-2 text-emerald-600">.</span>
          </Link>

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Get started for free
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Create account<span className="text-emerald-600">.</span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              A few details and your personal collection is ready.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
              >
                Full name
              </label>
              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={60}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
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
                  autoComplete="new-password"
                  required
                  minLength={8}
                  maxLength={72}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
              >
                Confirm password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  maxLength={72}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#142b22] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'Create my account'}
              {!loading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="font-bold text-emerald-700 transition hover:text-emerald-800 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
