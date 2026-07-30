import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { PlantVisionUpload } from './components/PlantVisionUpload';
import { WeatherIntelligence } from './components/WeatherIntelligence';
import { RecommendationPrediction } from './components/RecommendationPrediction';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { WeeklyCarePlanner } from './components/WeeklyCarePlanner';
import { SustainabilityCalculator } from './components/SustainabilityCalculator';
import { CitizenTreeModule } from './components/CitizenTreeModule';
import { AiFarmingAssistant } from './components/AiFarmingAssistant';
import { AlertsManager } from './components/AlertsManager';
import { ReportGeneratorModal } from './components/ReportGeneratorModal';
import { FarmerAuthModal } from './components/FarmerAuthModal';
import { AdminPanel } from './components/AdminPanel';
import { User, UserRole, PlantRecord, AlertItem, AnalysisResult } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr_farmer1',
    name: 'Ramesh Patel',
    email: 'ramesh.farmer@greengrow.ai',
    role: 'FARMER',
    location: 'Guntur, Andhra Pradesh',
    farmSizeAcres: 5.5,
  });

  const [activeTab, setActiveTab] = useState<string>('landing');
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [plants, setPlants] = useState<PlantRecord[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantRecord | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isFarmerAuthOpen, setIsFarmerAuthOpen] = useState<boolean>(false);

  // Fetch initial plants and alerts
  const fetchPlantsAndAlerts = () => {
    fetch('/api/plants')
      .then(res => res.json())
      .then(data => {
        const loadedPlants: PlantRecord[] = data.plants || [];
        setPlants(loadedPlants);
        if (loadedPlants.length > 0 && !selectedPlant) {
          setSelectedPlant(loadedPlants[0]);
        }
      })
      .catch(err => console.error('Error fetching plants:', err));

    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data.alerts || []);
      })
      .catch(err => console.error('Error fetching alerts:', err));
  };

  useEffect(() => {
    fetchPlantsAndAlerts();
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === 'CITIZEN' ? 'Ananya Sharma' : newRole === 'OFFICER' ? 'Dr. V. K. Rao' : newRole === 'ADMIN' ? 'System Admin' : 'Ramesh Patel'
    }));
  };

  const handleAnalysisComplete = (result: AnalysisResult, newRecordId?: string) => {
    fetchPlantsAndAlerts();
    if (newRecordId) {
      setTimeout(() => {
        fetch('/api/plants')
          .then(res => res.json())
          .then(data => {
            const updated: PlantRecord[] = data.plants || [];
            setPlants(updated);
            const newlyCreated = updated.find(p => p.id === newRecordId);
            if (newlyCreated) {
              setSelectedPlant(newlyCreated);
            }
          });
      }, 500);
    }
  };

  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
    fetch('/api/alerts/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId: id }),
    }).catch(err => console.error('Mark alert read error:', err));
  };

  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  return (
    <div id="greengrow-app-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-emerald-950">
      
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadAlertsCount={unreadAlertsCount}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />

      {/* View Switcher */}
      <main className="pb-16">
        {activeTab === 'landing' && (
          <LandingPage
            onStart={() => setActiveTab('dashboard')}
            onOpenAssistant={() => setActiveTab('assistant')}
            onOpenFarmerAuth={() => setIsFarmerAuthOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            plants={plants}
            alerts={alerts}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectPlant={(plant) => setSelectedPlant(plant)}
          />
        )}

        {activeTab === 'vision' && (
          <PlantVisionUpload
            onAnalysisComplete={handleAnalysisComplete}
            onNavigateToRecommendations={() => setActiveTab('recommendations')}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherIntelligence />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationPrediction
            selectedPlant={selectedPlant}
            onNavigateToSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'simulator' && (
          <WhatIfSimulator
            selectedPlant={selectedPlant}
          />
        )}

        {activeTab === 'planner' && (
          <WeeklyCarePlanner />
        )}

        {activeTab === 'sustainability' && (
          <SustainabilityCalculator />
        )}

        {activeTab === 'citizen' && (
          <CitizenTreeModule />
        )}

        {activeTab === 'assistant' && (
          <AiFarmingAssistant
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            citizenReports={[]}
          />
        )}
      </main>

      {/* Floating Bottom Quick Navigation for Quick Modules Access */}
      <div id="quick-floating-nav" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-emerald-950/90 border border-emerald-800/80 backdrop-blur-xl rounded-full px-4 py-2 flex items-center space-x-3 text-xs font-bold text-emerald-200 shadow-2xl">
        <button onClick={() => setActiveTab('vision')} className={`hover:text-white transition-all ${activeTab === 'vision' ? 'text-emerald-400 font-extrabold' : ''}`}>
          🌱 Scan Photo
        </button>
        <span className="text-slate-700">•</span>
        <button onClick={() => setActiveTab('simulator')} className={`hover:text-white transition-all ${activeTab === 'simulator' ? 'text-emerald-400 font-extrabold' : ''}`}>
          🔮 What-If AI
        </button>
        <span className="text-slate-700">•</span>
        <button onClick={() => setActiveTab('sustainability')} className={`hover:text-white transition-all ${activeTab === 'sustainability' ? 'text-emerald-400 font-extrabold' : ''}`}>
          📊 Eco Savings
        </button>
        <span className="text-slate-700">•</span>
        <button onClick={() => setActiveTab('assistant')} className={`hover:text-white transition-all ${activeTab === 'assistant' ? 'text-emerald-400 font-extrabold' : ''}`}>
          🤖 AI Assistant
        </button>
      </div>

      {/* Alerts Manager Drawer */}
      <AlertsManager
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onMarkRead={handleMarkAlertRead}
      />

      {/* Downloadable PDF Report Modal */}
      <ReportGeneratorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        currentUser={currentUser}
        plants={plants}
      />

      {/* Farmer Auth Modal (SQLite backed) */}
      <FarmerAuthModal
        isOpen={isFarmerAuthOpen}
        onClose={() => setIsFarmerAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
        currentUser={currentUser}
      />

    </div>
  );
}
