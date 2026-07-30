import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  ArrowRight,
  Database,
  Layers
} from 'lucide-react';
import { User as UserType } from '../types';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  currentUser: UserType | null;
}

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [existingUsers, setExistingUsers] = useState<any[]>([]);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('ramesh.farmer@greengrow.ai');
  const [loginPassword, setLoginPassword] = useState('farmer123');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLocation, setRegLocation] = useState('Guntur, Andhra Pradesh');
  const [regFarmSize, setRegFarmSize] = useState('5.0');

  useEffect(() => {
    if (isOpen) {
      fetchExistingUsers();
    }
  }, [isOpen]);

  const fetchExistingUsers = async () => {
    try {
      const res = await fetch('/api/auth/users');
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setExistingUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch existing users from SQLite:', err);
    }
  };

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
          role: 'FARMER'
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Welcome back, ${data.user.name}! Connected via SQLite.`);
        onLoginSuccess(data.user);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMessage(data.error || 'Login failed. Please verify credentials.');
      }
    } catch (err: any) {
      setErrorMessage('Network error connecting to SQLite database.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (!regName.trim() || !regEmail.trim()) {
      setErrorMessage('Please enter both your name and email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword || 'farmer123',
          role: 'FARMER',
          location: regLocation,
          farmSizeAcres: Number(regFarmSize) || 4.0,
          phone: regPhone
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setSuccessMessage(`Farmer account created for ${data.user.name} and saved in SQLite!`);
        onLoginSuccess(data.user);
        await fetchExistingUsers();
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(data.error || 'Failed to register farmer account.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while registering account.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSelect = (user: any) => {
    setLoginEmail(user.email);
    setLoginPassword('farmer123');
    setActiveTab('login');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-emerald-100 overflow-hidden my-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/15 backdrop-blur-md rounded-xl border border-white/20">
              <Sprout className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Farmer Portal & SQLite Auth</h2>
              <p className="text-xs text-emerald-100 flex items-center gap-1.5 mt-0.5">
                <Database className="w-3.5 h-3.5" />
                Powered by Local SQLite Database Engine
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 gap-2 mt-6 bg-emerald-900/40 p-1 rounded-xl border border-emerald-500/30">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Farmer Login
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Create Farmer Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Authentication Notice</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800 text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Success</p>
                <p>{successMessage}</p>
              </div>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Farmer Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. ramesh.farmer@greengrow.ai"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      Sign In to Farmer Account
                    </>
                  )}
                </button>
              </div>

              {/* Quick Switch Registered Farmers from SQLite */}
              {existingUsers.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      SQLite Database Users (Quick Select)
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      {existingUsers.length} saved
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {existingUsers.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleQuickSelect(u)}
                        className={`text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                          loginEmail === u.email
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold text-slate-900 truncate">{u.name}</p>
                          <p className="text-slate-500 text-[10px] truncate">{u.email}</p>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                          {u.role}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Farmer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. ramesh@greengrow.ai"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Farm Location / District
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={regLocation}
                      onChange={(e) => setRegLocation(e.target.value)}
                      placeholder="e.g. Guntur, Andhra Pradesh"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Farm Size (in Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={regFarmSize}
                    onChange={(e) => setRegFarmSize(e.target.value)}
                    placeholder="e.g. 5.0"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  Your profile and farm acreage are stored permanently in the local SQLite database for crop recommendations.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-sm shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Create Farmer Account
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Database Engine: <strong className="text-slate-700">node:sqlite v22</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-slate-800 font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
