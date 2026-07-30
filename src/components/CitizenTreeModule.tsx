import React, { useState, useEffect } from 'react';
import { Trees, MapPin, Upload, PlusCircle, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { CitizenTreeReport } from '../types';

export const CitizenTreeModule: React.FC = () => {
  const [reports, setReports] = useState<CitizenTreeReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState<string>('');
  const [treeSpecies, setTreeSpecies] = useState<string>('Azadirachta indica (Neem)');
  const [location, setLocation] = useState<string>('Jubilee Hills Circle 3, Hyderabad');
  const [healthStatus, setHealthStatus] = useState<'Healthy' | 'Needs Care' | 'Sick / Damaged' | 'Hazardous'>('Needs Care');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80');

  const fetchReports = () => {
    setLoading(true);
    fetch('/api/citizen/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data.reports || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Citizen reports error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/citizen/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        treeSpecies,
        location,
        lat: 17.4326 + (Math.random() - 0.5) * 0.05,
        lng: 78.4071 + (Math.random() - 0.5) * 0.05,
        imageUrl,
        healthStatus,
        description,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowForm(false);
          setTitle('');
          setDescription('');
          fetchReports();
        }
      })
      .catch(err => console.error('Submit report error:', err));
  };

  return (
    <div id="citizen-tree-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
            <Trees className="w-3.5 h-3.5" />
            <span>Module 13: Citizen Module & Urban Tree Mapping</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Urban Green Ecosystem & Public Tree Watch
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Empower citizens to map urban avenue trees, report damaged or sick trees to municipal authorities, and share home gardening tips.
          </p>
        </div>

        <button
          id="citizen-report-tree-btn"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-500/20 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald-950" />
          <span>{showForm ? 'Cancel Report' : 'Report Public Tree'}</span>
        </button>
      </div>

      {/* New Tree Report Form */}
      {showForm && (
        <form onSubmit={handleSubmitReport} className="p-6 rounded-2xl bg-slate-900 border border-emerald-700/60 space-y-4 text-xs shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>Report Urban Tree / Sick Plant</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Tree Observation Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Aged Banyan Tree Branch Damage"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Tree Species / Type</label>
              <input
                type="text"
                value={treeSpecies}
                onChange={(e) => setTreeSpecies(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Street Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Tree Health Condition</label>
              <select
                value={healthStatus}
                onChange={(e) => setHealthStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs Care">Needs Care</option>
                <option value="Sick / Damaged">Sick / Damaged</option>
                <option value="Hazardous">Hazardous / Fallen</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tree damage, disease symptoms, or maintenance needed..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-md"
          >
            Submit Public Tree Observation
          </button>
        </form>
      )}

      {/* Reported Trees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg relative">
            
            <div className="aspect-video rounded-xl overflow-hidden relative border border-slate-800">
              <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" />
              <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur-md border ${
                report.healthStatus === 'Healthy' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600' : 'bg-rose-950/90 text-rose-300 border-rose-600'
              }`}>
                {report.healthStatus}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-100 text-sm">{report.title}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{report.treeSpecies}</p>
              <div className="flex items-center space-x-1 text-slate-400 text-xs pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{report.location}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              {report.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
              <span>By {report.userName}</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-400 font-bold border border-slate-800">{report.status}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
