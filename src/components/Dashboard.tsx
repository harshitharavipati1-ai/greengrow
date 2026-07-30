import React, { useEffect, useState } from 'react';
import { 
  Sprout, Droplets, Coins, Activity, AlertTriangle, ArrowUpRight, 
  Leaf, Calendar, HelpCircle, Trees, ShieldAlert, CheckCircle2, TrendingUp 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, CartesianGrid, Legend 
} from 'recharts';
import { User, PlantRecord, AlertItem } from '../types';

interface DashboardProps {
  currentUser: User;
  plants: PlantRecord[];
  alerts: AlertItem[];
  onNavigate: (tab: string) => void;
  onSelectPlant: (plant: PlantRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  plants,
  alerts,
  onNavigate,
  onSelectPlant,
}) => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard summary:', err);
        setLoading(false);
      });
  }, [plants]);

  const kpis = summary?.kpis || {
    totalPlants: plants.length,
    averagePlantHealth: 88,
    waterSavedLiters: 14850,
    moneySavedINR: 24600,
    fertilizerSavedKg: 185,
    ecoScore: 89,
    treesReported: 4,
    activeAlerts: alerts.filter(a => !a.read).length
  };

  const yieldData = summary?.yieldPredictionData || [
    { month: 'Jan', traditionalYield: 3200, greenGrowYield: 4100 },
    { month: 'Feb', traditionalYield: 3100, greenGrowYield: 4250 },
    { month: 'Mar', traditionalYield: 3400, greenGrowYield: 4500 },
    { month: 'Apr', traditionalYield: 3000, greenGrowYield: 4300 },
    { month: 'May', traditionalYield: 3300, greenGrowYield: 4700 },
    { month: 'Jun', traditionalYield: 3500, greenGrowYield: 5100 },
  ];

  const waterSavingsTrend = summary?.waterSavingsTrend || [
    { week: 'W1', litersSaved: 1800, costSaved: 540 },
    { week: 'W2', litersSaved: 2400, costSaved: 720 },
    { week: 'W3', litersSaved: 3100, costSaved: 930 },
    { week: 'W4', litersSaved: 4200, costSaved: 1260 },
    { week: 'W5', litersSaved: 3350, costSaved: 1005 },
  ];

  return (
    <div id="dashboard-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Top Banner / Role Greeting */}
      <div id="dashboard-hero-banner" className="relative rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-900 border border-emerald-800/60 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentUser.role} Control Center</span>
              <span className="text-slate-500">•</span>
              <span>{currentUser.location}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              Your green ecosystem is performing <span className="text-emerald-300 font-bold">18% above regional baseline</span>. Precision drip irrigation and organic disease controls saved 14,850L water this month.
            </p>
          </div>

          {/* Quick Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="dash-quick-scan-btn"
              onClick={() => onNavigate('vision')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Sprout className="w-4 h-4 stroke-[2.5]" />
              <span>Scan Plant Photo</span>
            </button>

            <button
              id="dash-quick-simulator-btn"
              onClick={() => onNavigate('simulator')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-200 border border-emerald-700/60 font-semibold text-xs flex items-center space-x-2 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>What-If Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div id="dashboard-kpis-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Plant Health Score KPI */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/50 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Plant Health</span>
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">{kpis.averagePlantHealth}%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +4.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{plants.length} Crops Monitored in Farm</p>
        </div>

        {/* Eco Score KPI */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/50 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Sustainability Score</span>
            <div className="p-2 rounded-lg bg-green-950 text-green-400 border border-green-800">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-green-400">{kpis.ecoScore} / 100</span>
            <span className="text-xs font-semibold text-green-400">Optimal</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Soil & Chemical Toxicity Low</p>
        </div>

        {/* Water Saved KPI */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/50 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Water Saved</span>
            <div className="p-2 rounded-lg bg-teal-950 text-teal-400 border border-teal-800">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-teal-300">{kpis.waterSavedLiters.toLocaleString()} L</span>
            <span className="text-xs font-semibold text-teal-400">35% Saved</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Drip + AWD Alternate Wetting</p>
        </div>

        {/* Money Saved KPI */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-700/50 transition-all shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Money Saved</span>
            <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-amber-300">₹{kpis.moneySavedINR.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-400">+18% Profit</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Fertilizer & Water Cost Cut</p>
        </div>

      </div>

      {/* Main Charts & Analytics Grid */}
      <div id="dashboard-charts-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Yield Prediction Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Yield Prediction vs Traditional Baseline (Kg / Acre)</span>
              </h2>
              <p className="text-xs text-slate-400">AI precision farming increases projected yield by ~28%.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
              AI Forecast
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }} 
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="traditionalYield" name="Traditional Method" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="greenGrowYield" name="GreenGrow AI Method" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Savings Trend Area Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-teal-400" />
                <span>Weekly Water Conservation (Liters)</span>
              </h2>
              <p className="text-xs text-slate-400">Drip sensor schedule efficiency score.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-teal-950 text-teal-300 text-xs font-semibold border border-teal-800">
              +35% Saved
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterSavingsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }} />
                <Area type="monotone" dataKey="litersSaved" name="Liters Saved" stroke="#14b8a6" fillOpacity={1} fill="url(#colorLiters)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Monitored Crops List Section */}
      <div id="dashboard-crops-section" className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>Active Plant Diagnostics & Crop Health</span>
            </h2>
            <p className="text-xs text-slate-400">Monitored plants with disease detection, confidence score, and harvest countdown.</p>
          </div>

          <button
            id="dash-add-plant-btn"
            onClick={() => onNavigate('vision')}
            className="px-3.5 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold border border-emerald-700/60 flex items-center space-x-1.5 transition-all"
          >
            <span>+ Scan New Plant</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plants.map((plant) => (
            <div
              key={plant.id}
              id={`plant-card-${plant.id}`}
              onClick={() => {
                onSelectPlant(plant);
                onNavigate('recommendations');
              }}
              className="group cursor-pointer rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-600/60 transition-all p-4 space-y-3 relative overflow-hidden shadow-md"
            >
              <div className="aspect-video rounded-lg overflow-hidden relative border border-slate-800">
                <img
                  src={plant.imageUrl}
                  alt={plant.plantName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-white text-[10px] font-bold border border-slate-700">
                  {plant.growthStage}
                </div>
                
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-md ${
                  plant.diseaseName.includes('None') || plant.diseaseName.includes('Healthy')
                    ? 'bg-emerald-950/90 text-emerald-300 border-emerald-600'
                    : 'bg-rose-950/90 text-rose-300 border-rose-600'
                }`}>
                  {plant.diseaseName}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-100 text-sm">{plant.plantName}</h3>
                  <span className="text-xs font-bold text-emerald-400">{plant.healthScore}% Health</span>
                </div>
                <p className="text-[11px] text-slate-400 italic">{plant.species}</p>
              </div>

              <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <span className="text-slate-300 font-medium">{plant.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Harvest Date</span>
                  <span className="text-emerald-300 font-medium">{plant.predictions?.harvestDate || '38 Days'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
