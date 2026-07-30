export type UserRole = 'FARMER' | 'CITIZEN' | 'OFFICER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
  avatar?: string;
  farmSizeAcres?: number;
}

export interface PlantRecord {
  id: string;
  userId: string;
  plantName: string;
  species: string;
  growthStage: string; // Germination, Vegetative, Flowering, Fruiting, Mature
  healthScore: number; // 0 - 100
  diseaseName: string;
  pestDetected: string;
  confidenceScore: number; // 0 - 100
  imageUrl: string;
  location: string;
  soilType: string;
  createdAt: string;
  recommendations?: Recommendation;
  predictions?: Prediction;
}

export interface AnalysisResult {
  plantName: string;
  species: string;
  growthStage: string;
  healthScore: number;
  diseaseName: string;
  diseaseSeverity: 'None' | 'Low' | 'Moderate' | 'Severe';
  pestDetected: string;
  confidenceScore: number;
  leafSpotCoordinates?: Array<{ x: number; y: number; label: string }>;
  recommendations: Recommendation;
  predictions: Prediction;
  sustainability: SustainabilityScore;
  financials: MoneySavings;
}

export interface WeatherData {
  temperatureC: number;
  humidityPct: number;
  rainfallProbPct: number;
  windSpeedKmh: number;
  condition: string;
  uvIndex: number;
  soilMoisturePct: number;
  locationName: string;
  forecast: Array<{
    day: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    condition: string;
  }>;
}

export interface Recommendation {
  bestSoil: string;
  waterReqLitersPerDay: number;
  minWaterNeededLiters: number;
  fertilizerType: string;
  minFertilizerKgPerAcre: number;
  organicAlternative: string;
  optimalIrrigationTime: string;
  diseasePrevention: string;
  nutrientAdvice: string;
  explanation: string;
}

export interface Prediction {
  daysToHarvest: number;
  estimatedYieldKgPerAcre: number;
  harvestDate: string;
  diseaseRiskLevel: 'Low' | 'Medium' | 'High';
  nutrientDeficiencyRisk: string;
  waterStressRiskLevel: 'Low' | 'Medium' | 'High';
  growthProjectionSummary: string;
}

export interface WhatIfQuery {
  plantId?: string;
  scenarioType: 'no_water' | 'heavy_rain' | 'temp_increase' | 'extra_fertilizer' | 'custom';
  customQuery?: string;
  daysDuration?: number;
}

export interface WhatIfResult {
  scenario: string;
  plantHealthImpactScore: number; // -50 to +20
  yieldImpactPct: number; // -100 to +30
  diseaseRiskChange: string;
  soilImpactDescription: string;
  waterImpactLiters: number;
  aiExplanation: string;
  recommendedAction: string;
}

export interface CarePlanTask {
  id: string;
  dayNumber: number;
  dateStr: string;
  taskTitle: string;
  category: 'IRRIGATION' | 'FERTILIZER' | 'PEST_CONTROL' | 'INSPECTION' | 'SOIL_CARE';
  completed: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  instructions: string;
}

export interface SustainabilityScore {
  waterSavingScore: number; // 0 - 100
  fertilizerSavingScore: number; // 0 - 100
  soilHealthScore: number; // 0 - 100
  plantHealthScore: number; // 0 - 100
  overallEcoScore: number; // 0 - 100
}

export interface MoneySavings {
  waterSavedLiters: number;
  waterMoneySaved: number; // Currency
  fertilizerSavedKg: number;
  fertilizerMoneySaved: number;
  pesticideMoneySaved: number;
  totalMoneySaved: number;
  estimatedProfitBoost: number;
}

export interface CitizenTreeReport {
  id: string;
  userId: string;
  userName: string;
  title: string;
  treeSpecies: string;
  location: string;
  lat: number;
  lng: number;
  imageUrl: string;
  healthStatus: 'Healthy' | 'Needs Care' | 'Sick / Damaged' | 'Hazardous';
  description: string;
  reportedAt: string;
  status: 'REPORTED' | 'IN_REVIEW' | 'RESOLVED';
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: 'HIGH' | 'MEDIUM' | 'INFO';
  category: 'DISEASE' | 'WEATHER' | 'WATER' | 'HARVEST' | 'CARE';
  createdAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  language: 'en' | 'te';
  timestamp: string;
  audioBase64?: string;
}
