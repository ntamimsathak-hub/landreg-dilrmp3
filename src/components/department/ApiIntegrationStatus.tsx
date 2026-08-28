import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import {
  Server,
  CheckCircle2,
  Activity,
  ShieldCheck,
  RefreshCw,
  Globe,
  Database,
  Key,
  HardDrive
} from 'lucide-react';

export const ApiIntegrationStatus: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      name: 'State LRMS Gateway (Tamil Nilam / Bhulekh)',
      protocol: 'REST / JSON (mTLS 1.3)',
      status: 'Connected',
      latency: '24 ms',
      uptime: '99.98%',
      lastSync: '2026-08-28 06:15 UTC',
      desc: 'Synchronizes mutation orders and title encumbrance certificates in real time.'
    },
    {
      name: 'DILRMP 2.0 Legacy National Repository Sync',
      protocol: 'gRPC / Protocol Buffers',
      status: 'Connected',
      latency: '41 ms',
      uptime: '99.95%',
      lastSync: '2026-08-28 06:20 UTC',
      desc: 'Central inter-state land index querying and duplicate parcel detection.'
    },
    {
      name: 'Bhunaksha Cadastral GIS Vector Service',
      protocol: 'OGC WFS / GeoJSON API',
      status: 'Connected',
      latency: '36 ms',
      uptime: '99.99%',
      lastSync: '2026-08-28 06:24 UTC',
      desc: 'Supplies high-resolution survey parcel polygons and drone orthophoto imagery.'
    },
    {
      name: 'DigiLocker Sovereign Document Vault Push',
      protocol: 'OAuth2 / Webhook Push',
      status: 'Connected',
      latency: '58 ms',
      uptime: '99.90%',
      lastSync: '2026-08-28 06:22 UTC',
      desc: 'Automatically publishes verified Patta / Chitta deeds into citizen DigiLocker accounts.'
    },
    {
      name: 'CDAC e-Sign & Digital Stamping Service',
      protocol: 'Aadhaar e-KYC XML / PKI',
      status: 'Connected',
      latency: '65 ms',
      uptime: '99.94%',
      lastSync: '2026-08-28 06:10 UTC',
      desc: 'Applies legally binding digital signatures and cryptographic seals on approval.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.apiIntegrations} (National Interoperability Layer)
          </h2>
          <p className="text-xs text-slate-600">
            Real-time health status, ping latencies, and transaction telemetry across national land registry nodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            All 5 Services Operational
          </span>
        </div>
      </div>

      {/* Services List Cards */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 hover:border-gov-blue-400 transition-colors"
          >
            <div className="flex items-center gap-3.5 min-w-[280px]">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>{s.name}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600">
                    {s.protocol}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Latency</span>
                <span className="font-bold text-slate-800">{s.latency}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">30d Uptime</span>
                <span className="font-bold text-emerald-700">{s.uptime}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Last Sync</span>
                <span className="text-slate-600">{s.lastSync}</span>
              </div>
              <div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {s.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
