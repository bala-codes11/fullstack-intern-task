
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Layers3, LogOut, Heart, Menu } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  };

  const user = getUser();

  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    user?.email ||
    'User';

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? 'bg-emerald-50 font-semibold text-emerald-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-700'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link to="/templates" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition group-hover:bg-emerald-700">
            <Layers3 size={21} />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            forma<span className="text-emerald-600">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/templates" className={linkClass}>
            Templates
          </NavLink>

          {token && (
            <NavLink to="/favorites" className={linkClass}>
              <Heart size={16} />
              Favorites
            </NavLink>
          )}

          <div className="mx-2 hidden h-7 w-px bg-slate-200 sm:block" />

          {token ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden max-w-32 truncate text-sm font-medium text-slate-700 md:block">
                Hi, {userName}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 sm:px-4"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700 sm:px-4"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md sm:px-5"
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
