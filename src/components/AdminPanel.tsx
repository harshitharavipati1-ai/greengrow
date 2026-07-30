import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, Activity, Database, CheckCircle2, Search } from 'lucide-react';
import { User, CitizenTreeReport } from '../types';

interface AdminPanelProps {
  currentUser: User;
  citizenReports: CitizenTreeReport[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, citizenReports }) => {
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'reports' | 'logs'>('users');

  const sampleUsers: User[] = [
    { id: 'usr_farmer1', name: 'Ramesh Patel', email: 'ramesh.farmer@greengrow.ai', role: 'FARMER', location: 'Guntur, Andhra Pradesh', farmSizeAcres: 5.5 },
    { id: 'usr_citizen1', name: 'Ananya Sharma', email: 'ananya.citizen@greengrow.ai', role: 'CITIZEN', location: 'Hyderabad, Telangana' },
    { id: 'usr_officer1', name: 'Dr. V. K. Rao', email: 'vk.rao@agri.gov.in', role: 'OFFICER', location: 'Vijayawada Region' },
    { id: 'usr_admin1', name: 'System Admin', email: 'admin@greengrow.ai', role: 'ADMIN', location: 'HQ Central' },
  ];

  const systemLogs = [
    { id: 'log_1', event: 'Gemini Vision Pathology Execution', status: 'SUCCESS', latency: '480ms', timestamp: '10 mins ago' },
    { id: 'log_2', event: 'OpenWeatherMap Regional Telemetry Sync', status: 'SUCCESS', latency: '120ms', timestamp: '25 mins ago' },
    { id: 'log_3', event: 'Drip Irrigation Schedule Trigger', status: 'SUCCESS', latency: '95ms', timestamp: '1 hour ago' },
    { id: 'log_4', event: 'What-If Physics Simulator Calculation', status: 'SUCCESS', latency: '340ms', timestamp: '2 hours ago' },
  ];

  return (
    <div id="admin-panel-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Module 17: Admin & Agricultural Officer Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System Governance & Regional Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            User role authorization, community tree report review, regional disease heatmaps, and audit logs.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === 'users' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            User Roles
          </button>
          <button
            onClick={() => setActiveSubTab('reports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === 'reports' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Tree Moderation
          </button>
          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === 'logs' ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* View 1: Users List */}
      {activeSubTab === 'users' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Registered Platform Users</span>
            </h2>
            <span className="text-xs text-slate-400">{sampleUsers.length} Users Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sampleUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-950/60 transition-all">
                    <td className="p-3 font-bold text-slate-100">{u.name}</td>
                    <td className="p-3 text-slate-400">{u.email}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] border border-emerald-800">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{u.location}</td>
                    <td className="p-3 text-emerald-400 font-bold">Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: Tree Reports Review */}
      {activeSubTab === 'reports' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white">Community Tree Observations Moderation</h2>
          <div className="space-y-3 text-xs">
            {citizenReports.map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-100">{r.title}</p>
                  <p className="text-slate-400">{r.treeSpecies} • {r.location}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-emerald-950 font-bold text-xs shadow">
                  Approve Report
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: System Logs */}
      {activeSubTab === 'logs' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>AI Studio Engine Telemetry & Audit Trail</span>
          </h2>

          <div className="space-y-2 text-xs font-mono">
            {systemLogs.map((l) => (
              <div key={l.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{l.event}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-emerald-400">{l.status} ({l.latency})</span>
                  <span className="text-slate-500">{l.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
