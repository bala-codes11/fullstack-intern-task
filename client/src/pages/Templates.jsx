
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  LayoutGrid,
  Search,
  Sparkles,
  Heart,
  Layers3,
  X,
  RefreshCw,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TemplateCard from '../components/TemplateCard';

export default function Templates() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [busyId, setBusyId] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTemplates = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/templates');

        if (!cancelled) {
          setTemplates(response.data.templates || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              'Could not load templates. Check that the backend is running.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTemplates();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadFavorites = async () => {
      if (!isAuthenticated) {
        setFavoriteIds([]);
        return;
      }

      try {
        const response = await api.get('/favorites');

        if (!cancelled) {
          setFavoriteIds(
            (response.data.templates || []).map(
              (template) => template._id
            )
          );
        }
      } catch (err) {
        if (!cancelled) {
          setActionError(
            err.response?.data?.message ||
              'Unable to load your saved favorites.'
          );
        }
      }
    };

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const categories = useMemo(
    () => [
      'All',
      ...new Set(templates.map((template) => template.category)),
    ],
    [templates]
  );

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesCategory =
        category === 'All' || template.category === category;

      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [templates, search, category]);

  const toggleFavorite = async (template) => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: '/templates' },
      });
      return;
    }

    setActionError('');
    setBusyId(template._id);

    const alreadyFavorite = favoriteIds.includes(template._id);

    try {
      if (alreadyFavorite) {
        await api.delete(`/favorites/${template._id}`);

        setFavoriteIds((current) =>
          current.filter((id) => id !== template._id)
        );
      } else {
        await api.post(`/favorites/${template._id}`);

        setFavoriteIds((current) =>
          current.includes(template._id)
            ? current
            : [...current, template._id]
        );
      }
    } catch (err) {
      setActionError(
        err.response?.data?.message ||
          'Could not update your favorites. Please try again.'
      );
    } finally {
      setBusyId('');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white">
        <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-20 -z-10 h-48 w-48 rounded-full bg-sky-100/50 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-10 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-700">
              <Sparkles size={16} />
              A better starting point for your next idea
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Build something
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                worth looking at.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Explore thoughtfully designed website templates for dashboards,
              portfolios, business websites, and more. Find a design you love
              and save it for your next project.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#template-library"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200/70 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                Explore templates
                <ArrowRight size={18} />
              </a>

              <Link
                to={isAuthenticated ? '/favorites' : '/register'}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                <Heart size={17} />
                {isAuthenticated ? 'My favorites' : 'Create free account'}
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-slate-200/80 pt-7">
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-slate-950">
                  {templates.length}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Ready-to-explore templates
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold tracking-tight text-slate-950">
                  {Math.max(categories.length - 1, 0)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Design categories
                </p>
              </div>

              <div>
                <p className="text-2xl font-extrabold tracking-tight text-slate-950">
                  <Heart
                    size={22}
                    className="inline text-rose-500"
                    fill="currentColor"
                  />
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Save your favorites
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-100 via-violet-100 to-sky-100 opacity-80 blur-xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-2xl shadow-indigo-950/10 sm:p-4">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-2 pb-4 pt-1">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Template collection
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Find your next inspiration
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Explore
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-1 pt-4">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="flex h-28 flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 p-3 sm:h-36">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-white/80" />
                      <span className="h-2 w-2 rounded-full bg-white/50" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-white/90" />
                      <div className="h-2 w-1/2 rounded-full bg-white/40" />
                      <div className="mt-3 h-5 w-16 rounded-md bg-white/90" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-slate-800">
                      Landing pages
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Make an impression
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="h-28 bg-slate-900 p-3 sm:h-36">
                    <div className="flex gap-2">
                      <div className="w-1/4 space-y-2 rounded-lg bg-white/10 p-2">
                        <div className="h-2 rounded bg-white/30" />
                        <div className="h-2 rounded bg-white/20" />
                        <div className="h-2 rounded bg-white/20" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 rounded bg-white/10" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 rounded-lg bg-emerald-400/80" />
                          <div className="h-8 rounded-lg bg-violet-400/80" />
                        </div>
                        <div className="h-8 rounded-lg bg-white/10" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-slate-800">
                      Dashboards
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Make data clearer
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="h-24 bg-gradient-to-br from-amber-100 to-orange-200 p-3 sm:h-28">
                    <div className="flex h-full items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-orange-400/80" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 rounded-full bg-orange-700/40" />
                        <div className="h-2 w-2/3 rounded-full bg-orange-700/20" />
                        <div className="h-4 w-12 rounded-full bg-white/80" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-slate-800">
                      Portfolios
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Show your work
                    </p>
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="h-24 bg-gradient-to-br from-emerald-100 to-teal-200 p-3 sm:h-28">
                    <div className="grid h-full grid-cols-3 items-center gap-2">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="flex h-14 flex-col justify-end rounded-lg bg-white/80 p-2 shadow-sm"
                        >
                          <div className="h-2 rounded bg-emerald-300" />
                          <div className="mt-1 h-2 w-2/3 rounded bg-slate-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-slate-800">
                      Storefronts
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Showcase products
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <Layers3 size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    Your next project starts here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Browse, preview, and save your picks.
                  </p>
                </div>
                <Sparkles
                  size={18}
                  className="shrink-0 text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template library */}
      <section
        id="template-library"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              <LayoutGrid size={16} />
              The collection
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Explore templates
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Browse the collection, preview each design, and save your
              favorites for later.
            </p>
          </div>

          <div className="relative w-full lg:max-w-md">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search templates, categories..."
              aria-label="Search templates"
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                category === item
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Action feedback */}
        {actionError && (
          <div
            role="alert"
            className="mt-6 flex items-start justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm text-amber-800"
          >
            <p>{actionError}</p>
            <button
              type="button"
              onClick={() => setActionError('')}
              aria-label="Dismiss message"
              className="shrink-0 rounded-lg p-1 hover:bg-amber-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Loading error */}
        {error && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-red-200 bg-white p-6 sm:p-8"
          >
            <h3 className="font-bold text-slate-900">
              We couldn't load the collection
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/4 rounded bg-slate-200" />
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 rounded bg-slate-100" />
                  <div className="h-4 w-1/2 rounded bg-slate-100" />
                  <div className="mt-5 h-10 rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : !error && filteredTemplates.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Search size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No templates found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              We couldn't find a template matching your search. Try a
              different keyword or reset your filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Clear all filters
              <X size={16} />
            </button>
          </div>
        ) : (
          !error && (
            <>
              <div className="mb-5 mt-9 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                  Showing{' '}
                  <span className="font-bold text-slate-900">
                    {filteredTemplates.length}
                  </span>{' '}
                  {filteredTemplates.length === 1 ? 'template' : 'templates'}
                </p>

                {(search || category !== 'All') && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Clear filters
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template._id}
                    template={template}
                    isFavorite={favoriteIds.includes(template._id)}
                    isLoading={busyId === template._id}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </>
          )
        )}
      </section>
    </main>
  );
}
