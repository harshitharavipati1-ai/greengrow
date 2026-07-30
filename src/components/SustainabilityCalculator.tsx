import React, { useState } from 'react';
import { Leaf, Droplets, Coins, ShieldCheck, Sprout, TrendingUp, Calculator } from 'lucide-react';

export const SustainabilityCalculator: React.FC = () => {
  const [acres, setAcres] = useState<number>(5);
  const [waterCostPerKL, setWaterCostPerKL] = useState<number>(45); // ₹45 per 1000L
  const [fertilizerCostPerKg, setFertilizerCostPerKg] = useState<number>(38); // ₹38 per kg

  // Interactive Calculations based on acreage
  const waterSavedLiters = Math.round(acres * 3200); // 3200L saved per acre per month
  const waterMoneySaved = Math.round((waterSavedLiters / 1000) * waterCostPerKL);
  
  const fertilizerSavedKg = Math.round(acres * 42); // 42kg chemical fertilizer saved per acre
  const fertilizerMoneySaved = Math.round(fertilizerSavedKg * fertilizerCostPerKg);
  
  const pesticideMoneySaved = Math.round(acres * 850); // ₹850 pesticide cost saved per acre
  const totalMoneySaved = waterMoneySaved + fertilizerMoneySaved + pesticideMoneySaved;
  const estimatedProfitBoost = Math.round(totalMoneySaved + (acres * 3200)); // Increased crop quality yield value

  return (
    <div id="sustainability-calculator-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
          <Leaf className="w-3.5 h-3.5" />
          <span>Module 11 & 12: Sustainability Engine & Money Saving Calculator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ecosystem Sustainability & Financial Impact
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Quantify water volume saved, chemical fertilizer reduction, soil organic carbon index, and net financial profit increase.
        </p>
      </div>

      {/* Module 11: Sustainability Score Gauges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Water Saving Gauge */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3 shadow-lg">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-teal-400" strokeWidth="3.5" strokeDasharray="88, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-2xl font-black text-teal-300">88%</span>
          </div>
          <h3 className="font-bold text-slate-100 text-sm">Water Saving Score</h3>
          <p className="text-[11px] text-slate-400">Precision drip reduces evaporative runoff loss.</p>
        </div>

        {/* Fertilizer Saving Gauge */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3 shadow-lg">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-amber-400" strokeWidth="3.5" strokeDasharray="85, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-2xl font-black text-amber-300">85%</span>
          </div>
          <h3 className="font-bold text-slate-100 text-sm">Fertilizer Saving Score</h3>
          <p className="text-[11px] text-slate-400">Chemical nitrogen leaching suppressed.</p>
        </div>

        {/* Soil Health Score */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-3 shadow-lg">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-emerald-400" strokeWidth="3.5" strokeDasharray="92, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-2xl font-black text-emerald-300">92%</span>
          </div>
          <h3 className="font-bold text-slate-100 text-sm">Soil Microbial Health</h3>
          <p className="text-[11px] text-slate-400">High organic matter & earthworm activity.</p>
        </div>

        {/* Overall Eco Score */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-700/60 text-center space-y-3 shadow-lg">
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-green-300" strokeWidth="3.5" strokeDasharray="89, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-2xl font-black text-white">89</span>
          </div>
          <h3 className="font-extrabold text-emerald-300 text-sm">Overall Green Eco Score</h3>
          <p className="text-[11px] text-slate-300">Ranked in top 5% sustainable farms.</p>
        </div>

      </div>

      {/* Module 12: Interactive Money Saving Calculator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Money & Resource Savings Calculator</h2>
              <p className="text-xs text-slate-400">Adjust farm parameters to see monthly financial return on GreenGrow AI technology.</p>
            </div>
          </div>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Farm Land Size (Acres): <span className="text-emerald-400 font-black">{acres} Acres</span></label>
            <input
              type="range"
              min={1}
              max={50}
              value={acres}
              onChange={(e) => setAcres(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Water Cost (₹ / 1000 Liters)</label>
            <input
              type="number"
              value={waterCostPerKL}
              onChange={(e) => setWaterCostPerKL(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Fertilizer Cost (₹ / Kg)</label>
            <input
              type="number"
              value={fertilizerCostPerKg}
              onChange={(e) => setFertilizerCostPerKg(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Calculated Financial Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block">Water Saved</span>
            <p className="text-xl font-extrabold text-teal-300">{waterSavedLiters.toLocaleString()} Liters</p>
            <p className="text-emerald-400 font-bold">₹{waterMoneySaved.toLocaleString()} Saved</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block">Fertilizer Saved</span>
            <p className="text-xl font-extrabold text-amber-300">{fertilizerSavedKg.toLocaleString()} Kg</p>
            <p className="text-emerald-400 font-bold">₹{fertilizerMoneySaved.toLocaleString()} Saved</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block">Pesticide Cost Cut</span>
            <p className="text-xl font-extrabold text-rose-300">Organic Neem Drench</p>
            <p className="text-emerald-400 font-bold">₹{pesticideMoneySaved.toLocaleString()} Saved</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-green-950 border border-emerald-700/80 space-y-1">
            <span className="text-emerald-300 font-bold block">Estimated Profit Boost</span>
            <p className="text-2xl font-black text-white">₹{estimatedProfitBoost.toLocaleString()}</p>
            <p className="text-emerald-300 text-[10px] font-semibold">+18% Yield Revenue Gain</p>
          </div>

        </div>

      </div>

    </div>
  );
};
