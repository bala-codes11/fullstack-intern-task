
import { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Heart,
  RefreshCw,
  Sparkles,
  BookmarkCheck,
  Layers3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import api from '../api/axios';
import TemplateCard from '../components/TemplateCard';

export default function Favorites() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/favorites');
      setTemplates(response.data.templates || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not load your favorites. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeFavorite = async (template) => {
    setBusyId(template._id);
    setError('');

    try {
      await api.delete(`/favorites/${template._id}`);

      setTemplates((current) =>
        current.filter((item) => item._id !== template._id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not remove this favorite. Please try again.'
      );
    } finally {
      setBusyId('');
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50">
      {/* Collection header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-teal-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                <Sparkles size={14} />
                YOUR PERSONAL COLLECTION
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Things you
                <br className="sm:hidden" /> love<span className="text-emerald-600">.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                All your favorite designs in one place. Keep the inspiration
                close and find the perfect starting point for your next idea.
              </p>

              {!loading && !error && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                  <BookmarkCheck size={18} className="text-emerald-700" />
                  <span className="text-sm font-bold text-slate-800">
                    {templates.length}
                  </span>
                  <span className="text-sm text-slate-500">
                    {templates.length === 1 ? 'template saved' : 'templates saved'}
                  </span>
                </div>
              )}
            </div>

            <div className="hidden shrink-0 sm:block">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[#13291f] shadow-xl shadow-emerald-950/10 lg:h-44 lg:w-44">
                <div className="absolute inset-3 rounded-[1.5rem] border border-white/10" />
                <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg">
                  <Heart size={23} fill="currentColor" />
                </div>
                <div className="flex flex-col items-center">
                  <Layers3 size={38} className="text-emerald-300" />
                  <span className="mt-3 text-xs font-bold tracking-[0.2em] text-white">
                    COLLECT
                  </span>
                  <span className="mt-1 text-[10px] text-slate-400">
                    Curate your ideas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites collection */}
      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Your collection
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Designs you've bookmarked for later.
            </p>
          </div>

          <Link
            to="/templates"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700 sm:px-4"
          >
            <span className="hidden sm:inline">Explore more</span>
            <span className="sm:hidden">Explore</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchFavorites}
              className="inline-flex items-center gap-2 self-start rounded-lg px-2 py-1 font-semibold transition hover:bg-rose-100 sm:self-auto"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] animate-pulse bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-emerald-100" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : !error && templates.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-emerald-200 bg-white px-6 py-14 text-center sm:py-20">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-50" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-teal-50" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
              <Heart size={34} />
              <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Sparkles size={14} />
              </span>
            </div>

            <h2 className="relative mt-6 text-2xl font-bold tracking-tight text-slate-950">
              Your story starts with a favorite.
            </h2>

            <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              You haven't saved any templates yet. Explore the collection,
              find something you love, and tap the heart to keep it here.
            </p>

            <Link
              to="/templates"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200/60 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Discover templates
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  isFavorite
                  isLoading={busyId === template._id}
                  onToggleFavorite={removeFavorite}
                />
              ))}
            </div>
          )
        )}
      </section>
    </main>
  );
}
