import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Square, Droplets, FlaskConical, ShieldCheck, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CarePlanTask } from '../types';

export const WeeklyCarePlanner: React.FC = () => {
  const [tasks, setTasks] = useState<CarePlanTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [planDuration, setPlanDuration] = useState<7 | 14 | 30>(7);

  const fetchPlanner = () => {
    setLoading(true);
    fetch('/api/planner')
      .then(res => res.json())
      .then(data => {
        setTasks(data.carePlans || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Planner fetch error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlanner();
  }, []);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    fetch('/api/planner/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    }).catch(err => console.error('Toggle task error:', err));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'IRRIGATION': return <Droplets className="w-4 h-4 text-teal-400" />;
      case 'FERTILIZER': return <FlaskConical className="w-4 h-4 text-amber-400" />;
      case 'PEST_CONTROL': return <ShieldCheck className="w-4 h-4 text-rose-400" />;
      default: return <Eye className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div id="care-planner-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Module 10: Weekly Care Planner & Daily Tasks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Automated Plant Care Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Precision daily tasks generated for your crop species, growth stage, weather forecast, and irrigation regime.
          </p>
        </div>

        {/* Plan Horizon Switcher */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setPlanDuration(7)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${planDuration === 7 ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            7-Day Plan
          </button>
          <button
            onClick={() => setPlanDuration(14)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${planDuration === 14 ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            14-Day Plan
          </button>
          <button
            onClick={() => setPlanDuration(30)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${planDuration === 30 ? 'bg-emerald-500 text-emerald-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            30-Day Plan
          </button>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white text-sm">Schedule Completion</span>
          </div>
          <span className="font-extrabold text-emerald-400 text-sm">{completedCount} of {tasks.length} Tasks ({progressPct}%)</span>
        </div>

        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-400 mx-auto mb-2" />
          <p className="text-xs">Generating AI care plan tasks...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex items-start space-x-4 ${
                task.completed
                  ? 'bg-slate-950/60 border-slate-800/60 opacity-75'
                  : 'bg-slate-900/90 border-slate-800 hover:border-emerald-700/60 shadow-md'
              }`}
            >
              <button className="mt-0.5 text-emerald-400 hover:text-emerald-300 transition-all">
                {task.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                ) : (
                  <Square className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(task.category)}
                    <h3 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {task.taskTitle}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      task.priority === 'HIGH' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      {task.priority} Priority
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Day {task.dayNumber} ({task.dateStr})</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pl-6">
                  {task.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
