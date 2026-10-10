
import {
  ArrowUpRight,
  ExternalLink,
  Heart,
  LoaderCircle,
  Eye,
} from 'lucide-react';

export default function TemplateCard({
  template,
  isFavorite = false,
  onToggleFavorite,
  isLoading = false,
}) {
  const previewUrl = template.thumbnail_url
    ? template.thumbnail_url.replace(/^\/previews\//, '/templates/')
    : '';

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-950/10">
      {/* Live preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title={`${template.name} live preview`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            Preview unavailable
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          {template.category}
        </span>

        {/* Favorite action */}
        <button
          type="button"
          onClick={() => onToggleFavorite?.(template)}
          disabled={isLoading}
          aria-label={
            isFavorite
              ? `Remove ${template.name} from favorites`
              : `Add ${template.name} to favorites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFavorite
              ? 'border-rose-500 bg-rose-500 text-white'
              : 'border-white/70 bg-white/95 text-slate-700 hover:scale-105 hover:border-rose-200 hover:text-rose-500'
          }`}
        >
          {isLoading ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Heart
              size={18}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          )}
        </button>

        {/* Quick preview link */}
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-2 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-all duration-200 hover:bg-emerald-600 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
          >
            <Eye size={14} />
            Quick preview
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Template details */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Template
            </p>

            <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-emerald-700">
              {template.name}
            </h3>
          </div>

          <ArrowUpRight
            size={19}
            className="mt-1 shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
          />
        </div>

        <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-500">
          {template.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onToggleFavorite?.(template)}
            disabled={isLoading}
            className={`inline-flex min-w-0 items-center gap-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isFavorite
                ? 'text-rose-600 hover:text-rose-700'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <Heart
              size={16}
              fill={isFavorite ? 'currentColor' : 'none'}
            />
            <span className="truncate">
              {isLoading
                ? 'Please wait...'
                : isFavorite
                  ? 'Saved'
                  : 'Add to favorites'}
            </span>
          </button>

          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              Preview
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
