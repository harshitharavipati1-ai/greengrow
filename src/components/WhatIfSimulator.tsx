import React, { useState } from 'react';
import { HelpCircle, Sparkles, RefreshCw, AlertTriangle, TrendingDown, TrendingUp, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';
import { WhatIfResult, PlantRecord } from '../types';

interface WhatIfSimulatorProps {
  selectedPlant: PlantRecord | null;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ selectedPlant }) => {
  const [scenarioType, setScenarioType] = useState<'no_water' | 'heavy_rain' | 'temp_increase' | 'extra_fertilizer' | 'custom'>('no_water');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<WhatIfResult | null>(null);

  const presetScenarios = [
    {
      id: 'no_water',
      label: 'Skip Watering for 3 Days',
      desc: 'Simulate hot dry spell with zero drip irrigation.'
    },
    {
      id: 'heavy_rain',
      label: 'Heavy Rain (50mm in 24h)',
      desc: 'Simulate sudden downpour & field waterlogging.'
    },
    {
      id: 'temp_increase',
      label: '+5°C Heatwave Increase',
      desc: 'Simulate summer heat spike during flowering phase.'
    },
    {
      id: 'extra_fertilizer',
      label: 'Apply 20% Extra Nitrogen',
      desc: 'Simulate chemical fertilizer over-application.'
    },
  ];

  const runSimulation = async () => {
    setSimulating(true);
    try {
      const resp = await fetch('/api/ai/what-if', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioType,
          customQuery,
          plantName: selectedPlant?.plantName || 'Tomato Crop',
          growthStage: selectedPlant?.growthStage || 'Flowering',
        }),
      });

      const data = await resp.json();
      setSimulating(false);

      if (data.success && data.simulation) {
        setSimulationResult(data.simulation);
      } else {
        alert('Simulation failed. Please try again.');
      }
    } catch (err) {
      console.error('What-If AI Simulation error:', err);
      setSimulating(false);
      alert('Error connecting to What-If AI Engine.');
    }
  };

  return (
    <div id="what-if-simulator-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Module 9: AI What-If Scenario Physics & Agronomy Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What-If Climate & Farm Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Simulate environmental stress, heavy rainfall, heatwaves, or over-fertilization before making decisions on your farm.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Scenario Controls (Left) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-lg">
            
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Select Scenario to Test</span>
            </h2>

            {/* Presets Grid */}
            <div className="space-y-2.5">
              {presetScenarios.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setScenarioType(p.id as any);
                    setCustomQuery('');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    scenarioType === p.id && !customQuery
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-100">{p.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Custom Scenario Input */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Or Type Custom Scenario Question</label>
              <textarea
                rows={3}
                placeholder="e.g., What happens if I use neem oil mixed with potassium nitrate during a 38°C afternoon?"
                value={customQuery}
                onChange={(e) => {
                  setCustomQuery(e.target.value);
                  setScenarioType('custom');
                }}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Run Button */}
            <button
              id="simulator-run-btn"
              onClick={runSimulation}
              disabled={simulating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              {simulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-950" />
                  <span>Simulating Agronomy Physics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>Run AI What-If Simulation</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Simulation Output Card (Right) */}
        <div className="lg:col-span-7 space-y-6">
          {simulationResult ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-800/80 space-y-6 shadow-xl relative overflow-hidden">
              
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 block">Simulation Report</span>
                <h2 className="text-lg font-bold text-white mt-1">{simulationResult.scenario}</h2>
                <p className="text-xs text-slate-400 mt-1">Target Crop: {selectedPlant?.plantName || 'Tomato Crop'}</p>
              </div>

              {/* Impact Meters Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                
                {/* Health Impact */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Plant Health Impact</span>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-black ${simulationResult.plantHealthImpactScore < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {simulationResult.plantHealthImpactScore > 0 ? `+${simulationResult.plantHealthImpactScore}` : simulationResult.plantHealthImpactScore} Pts
                    </span>
                  </div>
                </div>

                {/* Yield Impact */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Yield Delta %</span>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-black ${simulationResult.yieldImpactPct < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {simulationResult.yieldImpactPct > 0 ? `+${simulationResult.yieldImpactPct}%` : `${simulationResult.yieldImpactPct}%`}
                    </span>
                  </div>
                </div>

              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 text-xs">
                
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-300 block">Disease Risk Shift</span>
                  <p className="text-slate-300">{simulationResult.diseaseRiskChange}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-teal-300 block">Soil & Microbe Impact</span>
                  <p className="text-slate-300">{simulationResult.soilImpactDescription}</p>
                </div>

              </div>

              {/* AI Scientific Explanation & Recommended Action */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AI Mitigation & Action Strategy</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{simulationResult.aiExplanation}</p>
                <div className="p-3 rounded-lg bg-emerald-900/60 border border-emerald-700/50 text-emerald-200 font-semibold mt-2">
                  Action: {simulationResult.recommendedAction}
                </div>
              </div>

            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-800 p-12 text-center space-y-3 bg-slate-900/40">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <HelpCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No Simulation Executed</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Select a scenario or type a custom question on the left panel, then click "Run AI What-If Simulation".
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
