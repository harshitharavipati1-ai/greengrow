import React from 'react';
import { FileText, X, Printer, Sprout, CheckCircle2, ShieldCheck, Droplets, Coins } from 'lucide-react';
import { PlantRecord, User } from '../types';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  plants: PlantRecord[];
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  plants,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const primaryPlant = plants[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-slate-100 p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Controls Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <FileText className="w-5 h-5" />
            <span>GreenGrow AI Farm Diagnostic Report</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div id="printable-report" className="space-y-6 text-slate-200">
          
          {/* Letterhead */}
          <div className="flex items-center justify-between border-b-2 border-emerald-500 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-bold">
                <Sprout className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-white">GreenGrow AI AgTech Platform</h1>
                <p className="text-xs text-emerald-400 font-medium">Sustainable Ecosystem Diagnostic & Yield Certificate</p>
              </div>
            </div>

            <div className="text-right text-xs">
              <p className="font-bold text-white">Report Ref: #GG-{Date.now().toString().slice(-6)}</p>
              <p className="text-slate-400">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* User & Farm Profile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Farmer / Owner</span>
              <span className="font-bold text-white">{currentUser.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Role</span>
              <span className="font-bold text-emerald-400">{currentUser.role}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Location</span>
              <span className="font-bold text-white">{currentUser.location}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Farm Size</span>
              <span className="font-bold text-white">{currentUser.farmSizeAcres || 5.5} Acres</span>
            </div>
          </div>

          {/* Plant Health & Pathology Summary */}
          {primaryPlant && (
            <div className="space-y-3 p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Primary Crop Pathology Diagnostic</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <span className="text-slate-500 block">Crop Name</span>
                  <span className="font-bold text-white">{primaryPlant.plantName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Health Score</span>
                  <span className="font-bold text-emerald-400">{primaryPlant.healthScore}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Disease Identified</span>
                  <span className="font-bold text-rose-300">{primaryPlant.diseaseName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Confidence</span>
                  <span className="font-bold text-white">{primaryPlant.confidenceScore}%</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-slate-300 space-y-1">
                <span className="font-bold text-emerald-300">Organic Remedy: </span>
                <span>{primaryPlant.recommendations?.organicAlternative}</span>
              </div>
            </div>
          )}

          {/* Environmental & Financial Metrics */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-teal-300 flex items-center space-x-1">
                <Droplets className="w-3.5 h-3.5" />
                <span>Water Conservation</span>
              </span>
              <p className="text-lg font-black text-white">14,850 Liters Saved</p>
              <p className="text-slate-400">35% reduction via drip AI schedules.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-amber-300 flex items-center space-x-1">
                <Coins className="w-3.5 h-3.5" />
                <span>Financial Cost Benefit</span>
              </span>
              <p className="text-lg font-black text-white">₹24,600 Net Savings</p>
              <p className="text-slate-400">+18% projected net harvest revenue boost.</p>
            </div>
          </div>

          {/* Signature / Certification Footer */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <div>
              <p className="font-bold text-slate-300">Certified by GreenGrow AI Computer Vision Engine</p>
              <p>Google Gemini AI • OpenWeatherMap API Integration</p>
            </div>
            <div className="text-right">
              <div className="w-24 border-b border-slate-700 mb-1" />
              <p>Agri Officer Signature</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
