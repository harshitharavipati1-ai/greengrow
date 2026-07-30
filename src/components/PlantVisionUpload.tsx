import React, { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, Sparkles, RefreshCw, Layers, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { AnalysisResult, PlantRecord } from '../types';

interface PlantVisionUploadProps {
  onAnalysisComplete: (result: AnalysisResult, newRecordId?: string) => void;
  onNavigateToRecommendations: () => void;
}

export const PlantVisionUpload: React.FC<PlantVisionUploadProps> = ({
  onAnalysisComplete,
  onNavigateToRecommendations,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [plantTypeHint, setPlantTypeHint] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [location, setLocation] = useState<string>('Guntur Field Sector A');
  const [soilType, setSoilType] = useState<string>('Red Loam Soil');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Preset sample plant images for quick testing
  const sampleImages = [
    {
      name: 'Tomato Early Blight',
      url: '/tomato_early_blight.jpg',
      hint: 'Tomato'
    },
    {
      name: 'Healthy Paddy Rice',
      url: '/healthy_paddy_rice.jpg',
      hint: 'Paddy Rice'
    },
    {
      name: 'Cotton Leaf Curl Virus',
      url: '/cotton_leaf_curl.jpg',
      hint: 'Cotton'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof sampleImages[0]) => {
    setImagePreview(sample.url);
    setPlantTypeHint(sample.hint);
    setAnalysisResult(null);
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access failed or frame permission denied. Using file upload mode.');
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImagePreview(dataUrl);
        // stop video track
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setCameraActive(false);
        setAnalysisResult(null);
      }
    }
  };

  const runAnalysis = async () => {
    if (!imagePreview) {
      alert('Please upload or select a plant photo first.');
      return;
    }

    setAnalyzing(true);
    try {
      const resp = await fetch('/api/ai/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          plantType: plantTypeHint,
          notes,
          location,
          soilType,
        }),
      });

      const data = await resp.json();
      setAnalyzing(false);

      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
        onAnalysisComplete(data.analysis, data.recordId);
      } else {
        alert('Vision analysis failed. Please try again.');
      }
    } catch (err) {
      console.error('Vision API call error:', err);
      setAnalyzing(false);
      alert('Error connecting to AI Vision service.');
    }
  };

  return (
    <div id="plant-vision-container" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module 3 & 4: Computer Vision Plant Pathology Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Plant Vision Diagnostic & Leaf Spot Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Upload or capture plant photos to instantly detect species, growth stage, diseases, pests, and leaf spot coordinates with confidence metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Upload & Form Control (Left) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-lg">
            
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Plant Photo Input</span>
            </h2>

            {/* Camera View or Image Preview */}
            {cameraActive ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-emerald-700">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>
                <button
                  id="vision-capture-photo-btn"
                  onClick={capturePhoto}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs shadow-md"
                >
                  Snap Photo
                </button>
              </div>
            ) : imagePreview ? (
              <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700 bg-slate-950">
                <img src={imagePreview} alt="Plant Preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-900/90 text-slate-300 text-[10px] font-bold border border-slate-700 hover:bg-rose-950 hover:text-rose-300"
                >
                  Clear Photo
                </button>
              </div>
            ) : (
              <label id="vision-file-dropzone" className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/60 hover:bg-slate-950">
                <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                <span className="text-xs font-semibold text-slate-200">Drag & drop plant photo or click to browse</span>
                <span className="text-[10px] text-slate-500 mt-1">Supports JPG, PNG, WEBP up to 15MB</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}

            {!cameraActive && !imagePreview && (
              <button
                id="vision-open-camera-btn"
                onClick={startCamera}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-800 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Use Live Camera Capture</span>
              </button>
            )}

            {/* Quick Sample Selector */}
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Or select sample crop:</p>
              <div className="grid grid-cols-3 gap-2">
                {sampleImages.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(s)}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-600 text-left transition-all"
                  >
                    <img src={s.url} alt={s.name} className="w-full h-12 object-cover rounded mb-1" />
                    <p className="text-[10px] font-bold text-slate-300 truncate">{s.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Metadata Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Plant Hint (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Paddy, Cotton, Maize"
                  value={plantTypeHint}
                  onChange={(e) => setPlantTypeHint(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Field Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Soil Type</label>
                  <input
                    type="text"
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Execute Analysis Button */}
            <button
              id="vision-run-analysis-btn"
              onClick={runAnalysis}
              disabled={analyzing || !imagePreview}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all ${
                analyzing || !imagePreview
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-emerald-950 shadow-emerald-500/20'
              }`}
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-950" />
                  <span>Gemini Computer Vision Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  <span>Analyze Plant & Leaf Pathology</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Vision Diagnostic Results Output (Right) */}
        <div className="lg:col-span-7 space-y-6">
          
          {analysisResult ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-800/80 space-y-6 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <h2 className="text-lg font-bold text-white">{analysisResult.plantName}</h2>
                  </div>
                  <p className="text-xs text-slate-400 italic">{analysisResult.species}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">AI Confidence</span>
                  <span className="text-lg font-extrabold text-emerald-400">{analysisResult.confidenceScore}%</span>
                </div>
              </div>

              {/* Plant Photo with Spot Highlights */}
              {imagePreview && (
                <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-800 bg-slate-950">
                  <img src={imagePreview} alt="Analyzed Crop" className="w-full h-full object-cover" />
                  
                  {/* Bounding box leaf spot pins */}
                  {analysisResult.leafSpotCoordinates?.map((spot, idx) => (
                    <div
                      key={idx}
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1 bg-rose-950/90 border border-rose-500 text-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg backdrop-blur-md animate-pulse"
                    >
                      <AlertCircle className="w-3 h-3 text-rose-400" />
                      <span>{spot.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Diagnostic Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Growth Stage</span>
                  <span className="text-slate-100 font-bold text-sm">{analysisResult.growthStage}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Leaf Health Score</span>
                  <span className="text-emerald-400 font-bold text-sm">{analysisResult.healthScore} / 100</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Disease Identified</span>
                  <span className={`font-bold text-sm ${analysisResult.diseaseName.includes('Healthy') || analysisResult.diseaseName.includes('None') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {analysisResult.diseaseName}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Pest Detected</span>
                  <span className="text-amber-300 font-bold text-sm">{analysisResult.pestDetected}</span>
                </div>

              </div>

              {/* Organic Remediation Brief */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Organic Remediation</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {analysisResult.recommendations?.organicAlternative}
                </p>
                <p className="text-emerald-400/90 text-[11px] italic">
                  "{analysisResult.recommendations?.explanation}"
                </p>
              </div>

              {/* Link to Full Recommendations */}
              <button
                id="vision-view-full-rec-btn"
                onClick={onNavigateToRecommendations}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>View Complete Recommendations & Yield Predictions</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-800 p-12 text-center space-y-3 bg-slate-900/40">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Layers className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Awaiting Image Input</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Upload or capture a plant photo on the left panel to execute Gemini Computer Vision disease detection and leaf spot analysis.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
