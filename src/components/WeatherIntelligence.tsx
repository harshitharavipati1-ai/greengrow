import React, { useState, useEffect } from 'react';
import { CloudSun, Thermometer, Droplets, Wind, Sun, Compass, AlertTriangle, RefreshCw, CheckCircle2, MapPin } from 'lucide-react';
import { WeatherData } from '../types';

export const WeatherIntelligence: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationName, setLocationName] = useState<string>('Guntur Agricultural Belt');

  const fetchWeather = (loc?: string) => {
    setLoading(true);
    fetch(`/api/weather?location=${encodeURIComponent(loc || locationName)}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Weather fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div id="weather-intelligence-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Module 5 & 6: Weather & Environmental Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Agri-Climate Weather Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time atmospheric analysis, rainfall probability, soil moisture index, and micro-climate crop risk advisors.
          </p>
        </div>

        {/* Location Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Search region..."
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <button
            id="weather-search-btn"
            onClick={() => fetchWeather(locationName)}
            className="px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-all"
          >
            Update
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto mb-2" />
          <p className="text-xs">Fetching live weather telemetry & soil moisture...</p>
        </div>
      ) : weather ? (
        <div className="space-y-6">
          
          {/* Main Weather Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Current Weather Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800/80 space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-800/50 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">{weather.locationName}</h2>
                  <p className="text-xs text-emerald-300 font-medium">Micro-climate Sensor Station</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-bold border border-emerald-700">
                  {weather.condition}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-5xl font-black text-white tracking-tight">{weather.temperatureC}°C</span>
                  <p className="text-xs text-slate-400 mt-1">Soil Temp: {weather.temperatureC - 2}°C</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center text-emerald-300">
                  <CloudSun className="w-10 h-10" />
                </div>
              </div>

              {/* Environmental Risk Advisor Callout */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center space-x-2 text-amber-300 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Micro-climate Agronomy Advisor</span>
                </div>
                <p className="text-slate-300">
                  {weather.humidityPct > 75 
                    ? `Relative humidity is high (${weather.humidityPct}%). Monitor tomatoes and chillies for fungal leaf spot spores.`
                    : `Optimal evaporation rates. Good window for morning drip irrigation.`}
                </p>
              </div>

            </div>

            {/* Weather Metrics Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Humidity</span>
                  <Droplets className="w-4 h-4 text-teal-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">{weather.humidityPct}%</p>
                <p className="text-[10px] text-slate-400">Transpiration index</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Rain Probability</span>
                  <CloudSun className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-extrabold text-blue-300">{weather.rainfallProbPct}%</p>
                <p className="text-[10px] text-slate-400">24-hour precipitation forecast</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Soil Moisture</span>
                  <Droplets className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-extrabold text-emerald-300">{weather.soilMoisturePct}%</p>
                <p className="text-[10px] text-slate-400">Root zone moisture depth</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Wind Speed</span>
                  <Wind className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">{weather.windSpeedKmh} km/h</p>
                <p className="text-[10px] text-slate-400">Spray drift factor low</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">UV Index</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-extrabold text-amber-300">{weather.uvIndex}</p>
                <p className="text-[10px] text-slate-400">High solar radiation</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-semibold uppercase">Irrigation Status</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-sm font-bold text-emerald-300 mt-1">Drip Recommended</p>
                <p className="text-[10px] text-slate-400">At 6:00 AM</p>
              </div>

            </div>

          </div>

          {/* 7-Day Forecast Row */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <CloudSun className="w-4 h-4 text-emerald-400" />
              <span>7-Day Agricultural Weather Forecast</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast?.map((day, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-200">{day.day}</p>
                  <p className="text-xs text-emerald-400 font-extrabold">{day.tempMax}° / {day.tempMin}°</p>
                  <p className="text-[10px] text-blue-300 font-semibold">{day.rainProb}% Rain</p>
                  <p className="text-[10px] text-slate-400 truncate">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
};
