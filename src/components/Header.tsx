import React from 'react';
import { Leaf, Bell, Globe, UserCheck, Shield, Sprout, BarChart3, CloudSun, Calendar, HelpCircle, FileText, Trees } from 'lucide-react';
import { User, UserRole } from '../types';

interface HeaderProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadAlertsCount: number;
  onOpenAlerts: () => void;
  onOpenReport: () => void;
  onOpenFarmerAuth?: () => void;
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onRoleChange,
  activeTab,
  setActiveTab,
  unreadAlertsCount,
  onOpenAlerts,
  onOpenReport,
  onOpenFarmerAuth,
  language,
  setLanguage,
}) => {
  return (
    <header id="header-main" className="sticky top-0 z-40 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div id="brand-logo-icon" className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sprout className="w-6 h-6 text-emerald-950 stroke-[2.5]" />
            </div>
            <div>
              <span id="brand-title" className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-200 via-green-100 to-white bg-clip-text text-transparent">
                GreenGrow AI
              </span>
              <p className="text-[10px] text-emerald-400 font-medium tracking-wide uppercase">Sustainable Farming Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
            <button
              id="nav-btn-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'dashboard' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-btn-vision"
              onClick={() => setActiveTab('vision')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'vision' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>AI Vision</span>
            </button>

            <button
              id="nav-btn-weather"
              onClick={() => setActiveTab('weather')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'weather' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <CloudSun className="w-4 h-4 text-emerald-400" />
              <span>Weather</span>
            </button>

            <button
              id="nav-btn-planner"
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'planner' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Care Planner</span>
            </button>

            <button
              id="nav-btn-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'simulator' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>What-If AI</span>
            </button>

            <button
              id="nav-btn-citizen"
              onClick={() => setActiveTab('citizen')}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'citizen' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>Urban Trees</span>
            </button>

            {currentUser.role === 'ADMIN' || currentUser.role === 'OFFICER' ? (
              <button
                id="nav-btn-admin"
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-all ${
                  activeTab === 'admin' ? 'bg-emerald-800 text-emerald-100 shadow-inner' : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Admin Panel</span>
              </button>
            ) : null}
          </nav>

          {/* Action Tools & User Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Language Switcher */}
            <button
              id="header-lang-btn"
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold flex items-center space-x-1.5 border border-emerald-700/50 transition-all"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'English' : 'తెలుగు'}</span>
            </button>

            {/* Generate Report Button */}
            <button
              id="header-report-btn"
              onClick={onOpenReport}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            {/* Farmer Auth Button */}
            {onOpenFarmerAuth && (
              <button
                type="button"
                id="header-farmer-auth-btn"
                onClick={onOpenFarmerAuth}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all border border-emerald-400/40"
                title="Farmer Login & Account Creation (SQLite)"
              >
                <UserCheck className="w-3.5 h-3.5 text-white" />
                <span>Farmer Login</span>
              </button>
            )}

            {/* Alert Notifications Bell */}
            <button
              id="header-alerts-btn"
              onClick={onOpenAlerts}
              className="relative p-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50 transition-all"
              aria-label="Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span id="header-alerts-badge" className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Role Selector & Profile */}
            <div className="flex items-center space-x-2 pl-2 border-l border-emerald-800">
              <div className="hidden md:block text-right">
                <p className="text-xs font-semibold text-emerald-100">{currentUser.name}</p>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">{currentUser.role}</span>
                </div>
              </div>

              {/* Role Dropdown */}
              <select
                id="role-select-dropdown"
                value={currentUser.role}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-emerald-900 border border-emerald-700 text-emerald-200 text-xs rounded-lg px-2 py-1.5 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="FARMER">Farmer Role</option>
                <option value="CITIZEN">Citizen Role</option>
                <option value="OFFICER">Agri Officer</option>
                <option value="ADMIN">System Admin</option>
              </select>
            </div>

          </div>

        </div>
      </div>
      
      {/* Mobile Bar */}
      <div className="lg:hidden flex items-center justify-around bg-emerald-950 py-2 border-t border-emerald-800/60 text-xs font-medium text-emerald-200">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : ''}>Dashboard</button>
        <button onClick={() => setActiveTab('vision')} className={activeTab === 'vision' ? 'text-emerald-400 font-bold' : ''}>AI Vision</button>
        <button onClick={() => setActiveTab('weather')} className={activeTab === 'weather' ? 'text-emerald-400 font-bold' : ''}>Weather</button>
        <button onClick={() => setActiveTab('planner')} className={activeTab === 'planner' ? 'text-emerald-400 font-bold' : ''}>Planner</button>
        <button onClick={() => setActiveTab('simulator')} className={activeTab === 'simulator' ? 'text-emerald-400 font-bold' : ''}>Simulator</button>
        <button onClick={() => setActiveTab('assistant')} className={activeTab === 'assistant' ? 'text-emerald-400 font-bold' : ''}>AI Assistant</button>
      </div>
    </header>
  );
};
