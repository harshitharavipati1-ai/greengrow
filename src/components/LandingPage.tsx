import React from 'react';
import { Sprout, ShieldCheck, Droplets, Coins, Leaf, Cpu, ArrowRight, CheckCircle2, CloudSun, HelpCircle, Activity, Users } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onOpenAssistant: () => void;
  onOpenFarmerAuth?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onOpenAssistant, onOpenFarmerAuth }) => {
  return (
    <div id="landing-container" className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Hero Section */}
      <section id="landing-hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-950 border-b border-emerald-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>AI-Powered Sustainable Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Grow More. <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200 bg-clip-text text-transparent">Waste Less.</span> Protect Nature.
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                GreenGrow AI empowers farmers, home gardeners, and citizens with computer vision plant pathology, climate-adapted water savings, precision bio-fertilizer advice, and interactive what-if climate simulators.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-get-started-btn"
                  onClick={onStart}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 font-bold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
                >
                  <span>Launch AI Farming Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {onOpenFarmerAuth && (
                  <button
                    id="hero-farmer-auth-btn"
                    onClick={onOpenFarmerAuth}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border border-emerald-600/70 font-semibold text-base flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <Users className="w-5 h-5 text-emerald-300" />
                    <span>Farmer Login / Create Account</span>
                  </button>
                )}

                <button
                  id="hero-chat-assistant-btn"
                  onClick={onOpenAssistant}
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-200 border border-emerald-800/80 font-semibold text-base flex items-center justify-center space-x-2 transition-all"
                >
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span>Ask AI Assistant (Telugu & English)</span>
                </button>
              </div>

              {/* Key Impact Pills */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-center lg:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">35%+</p>
                  <p className="text-xs text-slate-400">Water Saved via Drip AI</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-green-400">96.4%</p>
                  <p className="text-xs text-slate-400">Plant Disease Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">₹24,500</p>
                  <p className="text-xs text-slate-400">Avg Cost Saved / Acre</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl p-1 bg-gradient-to-b from-emerald-500/30 to-slate-800/50 backdrop-blur-xl border border-emerald-500/20 shadow-2xl">
                <div className="rounded-xl bg-slate-900/90 p-6 space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Live AI Diagnostics</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[11px] font-mono border border-emerald-800">GEMINI VISION</span>
                  </div>

                  <div className="relative rounded-lg overflow-hidden border border-slate-700/60 aspect-video">
                    <img
                      src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80"
                      alt="Tomato Disease Detection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-md">
                      Disease: Early Blight Detected
                    </div>
                    <div className="absolute bottom-3 right-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-md">
                      Health Score: 88%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/50">
                      <p className="text-slate-400">Water Requirement</p>
                      <p className="text-sm font-bold text-slate-100">16 Liters / Day</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/50">
                      <p className="text-slate-400">Organic Remedy</p>
                      <p className="text-sm font-bold text-emerald-300">Neem Oil Spray</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Workflow Section */}
      <section id="landing-workflow" className="py-16 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">How GreenGrow AI Works</h2>
            <p className="text-slate-400 mt-2 text-sm">From plant photo upload to automated 30-day care plans and sustainability gauges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-700/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 font-bold mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-slate-100">Photo Capture & Vision</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Upload leaf or crop image via camera or file dropzone. AI detects plant species, growth stage, pests, and leaf spots.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-700/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 font-bold mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-slate-100">Weather & Soil Integration</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Connects live location with OpenWeatherMap data to evaluate humidity, soil moisture, and microclimate risk.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-700/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 font-bold mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-slate-100">AI Recommendations & What-If</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generates exact water & organic fertilizer doses. Test climate scenarios with the What-If AI Simulator.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-700/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 font-bold mb-4">
                04
              </div>
              <h3 className="text-base font-semibold text-slate-100">Weekly Plan & Eco Dashboard</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Receive daily task reminders, yield predictions, water/money saved calculators, and downloadable PDF reports.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section id="landing-audiences" className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">Built for the Entire Green Ecosystem</h2>
            <p className="text-slate-400 mt-2 text-sm">Tailored workflows for farmers, home gardeners, urban citizens, and government agriculture officers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Farmers</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Yield prediction per acre</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Drip irrigation optimization</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Money savings calculator</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Home Gardeners</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Pot & balcony plant care</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Organic home remedies</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Weekly care schedules</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Urban Citizens</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Public tree reporting map</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Tree health alerts</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Community eco scores</span></li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Agri Officers</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Regional disease heatmaps</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Public report moderation</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span>Ecosystem audit logs</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-slate-200">GreenGrow AI Platform</span>
            <span>— Sustainable Farming & Ecosystem Engine</span>
          </div>
          <p>© 2026 GreenGrow AI. Built with Google Gemini AI & Sustainable AgTech Principles.</p>
        </div>
      </footer>

    </div>
  );
};
