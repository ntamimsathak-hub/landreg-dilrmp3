import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { mockCadastralPlots } from '../../data/mockGisPlots';
import { CadastralPlot } from '../../types/gis';
import { StatusBadge } from '../common/StatusBadge';
import {
  MapPin,
  Layers,
  Search,
  Compass,
  Eye,
  Maximize2,
  Minimize2,
  Info,
  Building,
  Award,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GisMapView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPlot, setSelectedPlot] = useState<CadastralPlot>(mockCadastralPlots[0]);
  const [mapLayer, setMapLayer] = useState<'cadastral_2d' | 'satellite' | 'hybrid'>('cadastral_2d');
  const [searchSurveyNo, setSearchSurveyNo] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredPlots = mockCadastralPlots.filter((p) =>
    searchSurveyNo ? p.surveyNumber.includes(searchSurveyNo) || p.khasraNumber.includes(searchSurveyNo) : true
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.cadastralMapTitle}
          </h2>
          <p className="text-xs text-slate-600">
            {t.cadastralSubtitle} (Bhunaksha Interoperability Layer)
          </p>
        </div>

        {/* Map Layer Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs font-semibold">
          <button
            onClick={() => setMapLayer('cadastral_2d')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mapLayer === 'cadastral_2d'
                ? 'bg-gov-blue-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.cadastralLayer2D}
          </button>
          <button
            onClick={() => setMapLayer('satellite')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mapLayer === 'satellite'
                ? 'bg-gov-blue-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.satelliteLayer}
          </button>
          <button
            onClick={() => setMapLayer('hybrid')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mapLayer === 'hybrid'
                ? 'bg-gov-blue-800 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.hybridLayer}
          </button>
        </div>
      </div>

      {/* Main Map & Parcel Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Interactive Cadastral Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl flex flex-col relative">
          {/* Top Floating Map Search */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-lg border border-slate-200 flex items-center gap-2 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 ml-1" />
            <input
              type="text"
              placeholder="Search Survey / Khasra No..."
              value={searchSurveyNo}
              onChange={(e) => setSearchSurveyNo(e.target.value)}
              className="text-xs bg-transparent outline-none w-44 font-mono font-bold"
            />
          </div>

          {/* Layer Status Badge */}
          <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-slate-700 shadow flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Layer: {mapLayer.toUpperCase()} (EPSG:4326)</span>
          </div>

          {/* Simulated Cadastral & Satellite Canvas */}
          <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
            {/* Background Map Imagery Style */}
            {mapLayer === 'satellite' ? (
              <div className="absolute inset-0 bg-cover bg-center opacity-85" style={{
                backgroundImage: `radial-gradient(circle, rgba(16,75,44,0.7) 0%, rgba(10,35,20,0.95) 100%), linear-gradient(#1e3a29 1px, transparent 1px), linear-gradient(90deg, #1e3a29 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px'
              }}>
                {/* Satellite terrain simulated river and fields */}
                <svg className="w-full h-full opacity-40">
                  <path d="M 0,300 Q 300,200 600,450 T 1000,400" fill="none" stroke="#0284c7" strokeWidth="24" />
                  <path d="M 150,0 Q 400,300 300,700" fill="none" stroke="#ca8a04" strokeWidth="8" strokeDasharray="12,6" />
                </svg>
              </div>
            ) : mapLayer === 'hybrid' ? (
              <div className="absolute inset-0 bg-slate-900" style={{
                backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}>
                <svg className="w-full h-full opacity-30">
                  <path d="M 0,300 Q 300,200 600,450 T 1000,400" fill="none" stroke="#38bdf8" strokeWidth="18" />
                </svg>
              </div>
            ) : (
              // 2D Cadastral Blueprint / Revenue Map
              <div className="absolute inset-0 bg-[#071e3d]" style={{
                backgroundImage: `linear-gradient(#0b3b6e 1px, transparent 1px), linear-gradient(90deg, #0b3b6e 1px, transparent 1px)`,
                backgroundSize: '25px 25px'
              }}>
              </div>
            )}

            {/* Interactive Vector Cadastral Parcels Overlay */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full max-w-2xl max-h-[500px] relative z-10 filter drop-shadow-2xl"
            >
              {/* Plot 1: Survey 142/7A (Primary) */}
              <g
                onClick={() => setSelectedPlot(mockCadastralPlots[0])}
                className="cursor-pointer group transition-all"
              >
                <polygon
                  points="220,180 440,160 480,340 240,360"
                  fill={selectedPlot.id === 'plot-mdu-142-7a' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(59, 130, 246, 0.25)'}
                  stroke={selectedPlot.id === 'plot-mdu-142-7a' ? '#10b981' : '#38bdf8'}
                  strokeWidth={selectedPlot.id === 'plot-mdu-142-7a' ? '4' : '2'}
                  className="transition-all hover:fill-emerald-500/50"
                />
                <text x="340" y="260" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">
                  Survey 142/7A
                </text>
                <text x="340" y="280" fill="#93c5fd" fontSize="11" textAnchor="middle">
                  4.54 Acres (Sundaralingam)
                </text>
              </g>

              {/* Plot 2: Survey 142/7B */}
              <g
                onClick={() => setSelectedPlot(mockCadastralPlots[1])}
                className="cursor-pointer group transition-all"
              >
                <polygon
                  points="240,360 480,340 450,490 200,480"
                  fill={selectedPlot.id === 'plot-mdu-142-7b' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(148, 163, 184, 0.2)'}
                  stroke={selectedPlot.id === 'plot-mdu-142-7b' ? '#10b981' : '#94a3b8'}
                  strokeWidth={selectedPlot.id === 'plot-mdu-142-7b' ? '4' : '2'}
                  className="transition-all hover:fill-slate-400/40"
                />
                <text x="340" y="420" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">
                  Survey 142/7B
                </text>
                <text x="340" y="440" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                  2.38 Acres (M. Muthiah)
                </text>
              </g>

              {/* Plot 3: Survey 141 (Govt Poramboke / Channel) */}
              <g
                onClick={() => setSelectedPlot(mockCadastralPlots[2])}
                className="cursor-pointer group transition-all"
              >
                <polygon
                  points="200,80 460,70 440,160 220,180"
                  fill={selectedPlot.id === 'plot-mdu-141-govt' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.15)'}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                  className="transition-all hover:fill-rose-500/30"
                />
                <text x="330" y="125" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Survey 141 • Govt Poramboke Channel
                </text>
              </g>

              {/* Surrounding neighbor plot outlines */}
              <polygon points="440,160 620,150 650,330 480,340" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="540" y="250" fill="#64748b" fontSize="11" textAnchor="middle">Khasra 143/2</text>

              <polygon points="50,190 220,180 240,360 80,370" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="140" y="270" fill="#64748b" fontSize="11" textAnchor="middle">Khasra 142/6</text>
            </svg>
          </div>

          {/* Map Compass & Scale Footer */}
          <div className="bg-slate-950/90 text-slate-400 p-3 flex items-center justify-between text-xs font-mono border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Center: 10.0245° N, 78.3382° E • Melur, Madurai</span>
            </div>
            <span>Scale 1:2500 • Cadastral Survey 2025-26</span>
          </div>
        </div>

        {/* Right: Selected Parcel Details & Linked Record (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Cadastral Plot Selected
                </span>
                <h3 className="font-bold text-base text-gov-blue-900 font-mono">
                  Survey {selectedPlot.surveyNumber}/{selectedPlot.subdivisionNumber}
                </h3>
              </div>
              <StatusBadge status={selectedPlot.status} size="sm" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Landowner / Occupant:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedPlot.ownerName}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Plot Area:</span>
                  <span className="font-bold font-mono text-slate-900">{selectedPlot.areaAcres} Acres</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Classification:</span>
                  <span className="font-semibold text-emerald-800">{selectedPlot.landType}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 block">Jurisdiction:</span>
                <p className="font-medium text-slate-800">
                  {selectedPlot.village}, {selectedPlot.district} ({selectedPlot.state})
                </p>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Last Resurvey: {selectedPlot.lastSurveyDate} by {selectedPlot.surveyorId}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-100">
            <Link
              to="/officer/validation-workspace"
              className="w-full py-2.5 bg-gov-blue-800 hover:bg-gov-blue-900 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Linked Digitized Record
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
