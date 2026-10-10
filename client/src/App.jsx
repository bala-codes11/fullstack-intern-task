
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Templates from './pages/Templates';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="min-h-[calc(100vh-65px)]">
        <Routes>
          <Route path="/" element={<Navigate to="/templates" replace />} />

          <Route path="/templates" element={<Templates />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route path="*" element={<Navigate to="/templates" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
