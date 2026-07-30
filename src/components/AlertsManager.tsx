import React from 'react';
import { Bell, X, AlertTriangle, Droplets, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AlertItem } from '../types';

interface AlertsManagerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertItem[];
  onMarkRead: (id: string) => void;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({
  isOpen,
  onClose,
  alerts,
  onMarkRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-950 h-full border-l border-slate-800 p-6 space-y-6 overflow-y-auto text-slate-100 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Active Farm Alerts</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p>No unread alerts. Your ecosystem is operating smoothly.</p>
            </div>
          ) : (
            alerts.map((alt) => (
              <div
                key={alt.id}
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  alt.severity === 'HIGH'
                    ? 'bg-rose-950/40 border-rose-800/80 text-rose-100'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>{alt.title}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{alt.category}</span>
                </div>

                <p className="text-slate-300 leading-relaxed">{alt.message}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
                  <span className="text-slate-500">{new Date(alt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {!alt.read && (
                    <button
                      onClick={() => onMarkRead(alt.id)}
                      className="text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
