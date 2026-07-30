import React from 'react';
import { Sprout, Droplets, FlaskConical, ShieldCheck, Clock, TrendingUp, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';
import { PlantRecord } from '../types';

interface RecommendationPredictionProps {
  selectedPlant: PlantRecord | null;
  onNavigateToSimulator: () => void;
}

export const RecommendationPrediction: React.FC<RecommendationPredictionProps> = ({
  selectedPlant,
  onNavigateToSimulator,
}) => {
  if (!selectedPlant) {
    return (
      <div className="p-12 text-center text-slate-400 bg-slate-950 min-h-screen">
        <Sprout className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-200">No Plant Selected</h2>
        <p className="text-xs text-slate-400">Please scan a plant or select one from the Dashboard first.</p>
      </div>
    );
  }

  const rec = selectedPlant.recommendations || {
    bestSoil: 'Well-draining Red Loam Soil (pH 6.2 - 6.8)',
    waterReqLitersPerDay: 18,
    minWaterNeededLiters: 12,
    fertilizerType: 'NPK 19-19-19 + Calcium Nitrate',
    minFertilizerKgPerAcre: 4.5,
    organicAlternative: 'Neem Cake (50kg/acre) + Bio-Vermicompost',
    optimalIrrigationTime: 'Early Morning (6:00 AM - 7:30 AM)',
    diseasePrevention: 'Apply Copper Oxychloride 3g/L or Neem Oil 5ml/L spray.',
    nutrientAdvice: 'Magnesium and Micronutrient spray during flowering.',
    explanation: 'Drip irrigation coupled with targeted organic neem oil spray prevents spore proliferation while preserving soil micro-organisms.'
  };

  const pred = selectedPlant.predictions || {
    daysToHarvest: 38,
    estimatedYieldKgPerAcre: 4200,
    harvestDate: '2026-09-06',
    diseaseRiskLevel: 'Medium',
    nutrientDeficiencyRisk: 'Nitrogen & Calcium deficiency if rain occurs',
    waterStressRiskLevel: 'Low',
    growthProjectionSummary: 'Plant canopy is progressing steadily toward fruiting stage.'
  };

  return (
    <div id="recommendation-prediction-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>Module 7 & 8: AI Recommendation & Yield Prediction Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Agronomy Recommendations for {selectedPlant.plantName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Field: {selectedPlant.location} • Species: {selectedPlant.species} • Stage: {selectedPlant.growthStage}
          </p>
        </div>

        <button
          id="rec-open-simulator-btn"
          onClick={onNavigateToSimulator}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center space-x-2 shadow-md shadow-emerald-500/20 transition-all self-start md:self-auto"
        >
          <HelpCircle className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
          <span>Test What-If Climate Scenarios</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module 7: AI Recommendation Engine (Left) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <span>Precision Farming Recommendations</span>
            </h2>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Water Requirement */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-teal-400 font-bold">
                  <Droplets className="w-4 h-4" />
                  <span>Water Requirement</span>
                </div>
                <p className="text-sm font-extrabold text-white">{rec.waterReqLitersPerDay} Liters / Day</p>
                <p className="text-slate-400">Minimum needed: <span className="text-teal-300 font-bold">{rec.minWaterNeededLiters} L</span> (Saves 35% water)</p>
              </div>

              {/* Optimal Irrigation Time */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-blue-400 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Optimal Irrigation Window</span>
                </div>
                <p className="text-sm font-extrabold text-white">{rec.optimalIrrigationTime}</p>
                <p className="text-slate-400">Avoid midday watering to prevent root thermal shock.</p>
              </div>

              {/* Fertilizer Recommendation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <FlaskConical className="w-4 h-4" />
                  <span>Fertilizer Dose</span>
                </div>
                <p className="text-sm font-extrabold text-white">{rec.fertilizerType}</p>
                <p className="text-slate-400">Min dosage: <span className="text-amber-300 font-bold">{rec.minFertilizerKgPerAcre} Kg / Acre</span></p>
              </div>

              {/* Organic Alternative */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <Sprout className="w-4 h-4" />
                  <span>Organic Alternative</span>
                </div>
                <p className="text-sm font-extrabold text-emerald-300">{rec.organicAlternative}</p>
                <p className="text-slate-400">Maintains soil organic carbon and microbial health.</p>
              </div>

            </div>

            {/* Disease Prevention & Nutrient Advice */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-rose-300 block">Disease Prevention Strategy</span>
                <p className="text-slate-300">{rec.diseasePrevention}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block">Nutrient & Micronutrient Advice</span>
                <p className="text-slate-300">{rec.nutrientAdvice}</p>
              </div>
            </div>

            {/* AI Scientific Explanation */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-1">
              <span className="font-bold text-emerald-300 block">AI Agronomy Rationale</span>
              <p className="text-slate-300 leading-relaxed italic">"{rec.explanation}"</p>
            </div>

          </div>
        </div>

        {/* Module 8: AI Prediction Engine (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
            
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Yield & Growth Predictions</span>
            </h2>

            {/* Harvest Countdown Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-950 border border-emerald-700/60 text-center space-y-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Target Harvest Date</span>
              <p className="text-3xl font-black text-white">{pred.harvestDate}</p>
              <p className="text-xs text-emerald-300 font-bold">{pred.daysToHarvest} Days Remaining</p>
            </div>

            {/* Predicted Metrics */}
            <div className="space-y-3 text-xs">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block">Estimated Yield / Acre</span>
                  <span className="text-lg font-extrabold text-emerald-400">{pred.estimatedYieldKgPerAcre.toLocaleString()} Kg</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px] border border-emerald-800">
                  +28% vs Avg
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block">Disease Risk Index</span>
                  <span className="text-sm font-bold text-amber-300">{pred.diseaseRiskLevel} Risk</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 font-bold text-[10px] border border-amber-800">
                  Monitored
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block">Water Stress Risk</span>
                  <span className="text-sm font-bold text-teal-300">{pred.waterStressRiskLevel} Risk</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 font-bold text-[10px] border border-teal-800">
                  Drip Protected
                </span>
              </div>

            </div>

            {/* Projection Summary */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-300 block">Growth Trajectory</span>
              <p className="text-slate-400">{pred.growthProjectionSummary}</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
