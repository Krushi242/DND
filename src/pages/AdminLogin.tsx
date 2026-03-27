import React, { useState } from 'react';
import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { getApiUrl } from '../utils/api';
import { isAdminAuthenticated, saveAdminSession } from '../utils/adminAuth';

const localAdminEmail = import.meta.env.VITE_LOCAL_ADMIN_EMAIL || 'admin@drd.local';
const localAdminPassword = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || 'admin123';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const redirectTo = (location.state as { from?: string } | null)?.from || '/admin';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (import.meta.env.DEV && response.status === 404) {
        if (
          form.email.trim().toLowerCase() === localAdminEmail.toLowerCase() &&
          form.password === localAdminPassword
        ) {
          saveAdminSession({
            id: 0,
            username: 'Local Admin',
            email: localAdminEmail,
            role: 'admin',
            token: 'local-dev-session',
          });

          navigate(redirectTo, { replace: true });
          return;
        }

        throw new Error('Local admin credentials are invalid.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Invalid admin credentials.');
      }

      saveAdminSession({
        id: data.admin?.id,
        username: data.admin?.username || form.email.trim(),
        email: data.admin?.email || form.email.trim(),
        role: data.admin?.role || 'admin',
        token: data.token,
      });

      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to login right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#eef4f2_0%,#f8fafc_50%,#f1f5f9_100%)] p-4">
      <div className="grid w-full max-w-[980px] overflow-hidden rounded-[10px] border border-[#DDE7E3] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-[#0B5E52] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-[10px] border border-white/10 bg-white/5 px-4 py-3">
              <img src={logo} alt="DRD Plantech logo" className="h-[54px] w-[50px] object-contain" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/60">Admin Login</p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">Secure Access</p>
              <h2 className="mt-4 text-[34px] font-semibold leading-[1.15] text-white">
                Sign in
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-7 text-white/72">
                Only approved admin accounts should have access to the dashboard. Use your admin email and password to continue.
              </p>
            </div>
          </div>

          <p className="text-sm text-white/60">Protected admin workspace for DRD Plantech LLP.</p>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="lg:hidden">
              <img src={logo} alt="DRD Plantech logo" className="h-[58px] w-[54px] object-contain" />
              <h1 className="mt-5 text-[34px] font-semibold leading-none text-[#12263F]">Admin Login</h1>
              <p className="mt-3 text-[15px] leading-7 text-[#64748B]">
                Use your admin credentials to access the dashboard.
              </p>
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0B5E52]">Welcome Back</p>
              <h1 className="mt-3 text-[38px] font-semibold leading-none text-[#12263F]">Admin Login</h1>
              <p className="mt-3 text-[15px] leading-7 text-[#64748B]">
                Enter your admin account details below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-[#334155]">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-[10px] border border-[#CBD5E1] bg-white px-4">
                  <Mail size={18} className="text-[#64748B]" />
                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="w-full bg-transparent py-3.5 text-sm text-[#1E293B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-[#334155]">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-[10px] border border-[#CBD5E1] bg-white px-4">
                  <Lock size={18} className="text-[#64748B]" />
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    className="w-full bg-transparent py-3.5 text-sm text-[#1E293B] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[#64748B] transition-colors hover:text-[#12263F]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {import.meta.env.DEV && (
                <div className="rounded-[10px] border border-[#DDE7E3] bg-[#F8FAFC] px-4 py-3 text-sm text-[#475569]">
                  Local fallback login:
                  <div className="mt-1 font-medium text-[#1E293B]">Email: {localAdminEmail}</div>
                  <div className="font-medium text-[#1E293B]">Password: {localAdminPassword}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <LogIn size={18} />
                {loading ? 'Signing In...' : 'Login To Admin'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
