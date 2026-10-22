import React, { useState } from 'react';
import { 
  MapPin, 
  Radio, 
  Users, 
  Store, 
  CheckCircle, 
  ArrowRight, 
  Navigation,
  Compass
} from 'lucide-react';

export interface ZoneData {
  id: string;
  name: string;
  shortName: string;
  region: 'Zona Norte' | 'Zona Oeste' | 'Zona Nobre';
  coordinates: { x: number; y: number };
  pointsOfInterest: string[];
  recommendedRadius: string;
  idealBusinesses: string[];
  estimatedAudience: string;
  description: string;
}

export const RIO_ZONES: ZoneData[] = [
  {
    id: 'tijuca-maracana',
    name: 'Tijuca & Maracanã',
    shortName: 'Tijuca / Maracanã',
    region: 'Zona Norte',
    coordinates: { x: 58, y: 38 },
    pointsOfInterest: ['Praça Saens Peña', 'Praça Varnhagen', 'Polo Gastronômico', 'Estádio do Maracanã', 'Rua Conde de Bonfim'],
    recommendedRadius: '2.5 km a 4.0 km',
    idealBusinesses: ['Bares & Gastronomia', 'Clínicas Médicas & Odonto', 'Academias & Pilates', 'Comércio de Rua'],
    estimatedAudience: '180.000 moradores ativos',
    description: 'Polo comercial de altíssima densidade demográfica com público fiel que consome diariamente no comércio de rua e delivery.'
  },
  {
    id: 'vila-isabel-grajau',
    name: 'Vila Isabel & Grajaú',
    shortName: 'Vila Isabel',
    region: 'Zona Norte',
    coordinates: { x: 50, y: 35 },
    pointsOfInterest: ['Boulevard 28 de Setembro', 'Praça Edmundo Rego', 'Rua Teodoro da Silva', 'Residenciais Grajaú'],
    recommendedRadius: '2.0 km a 3.5 km',
    idealBusinesses: ['Pet Shops & Veterinárias', 'Restaurantes Tradicionais', 'Salões de Beleza & Barbearias', 'Confeitarias & Padarias'],
    estimatedAudience: '140.000 moradores ativos',
    description: 'Forte senso comunitário com comércio tradicional de calçada e alta taxa de conversão para vizinhança que valoriza lojas locais.'
  },
  {
    id: 'alto-boa-vista',
    name: 'Alto da Boa Vista',
    shortName: 'Alto da Boa Vista',
    region: 'Zona Norte',
    coordinates: { x: 44, y: 46 },
    pointsOfInterest: ['Estrada das Furnas', 'Parque Nacional da Tijuca', 'Casas de Festas & Eventos', 'Restaurantes Rústicos'],
    recommendedRadius: '3.0 km a 6.0 km',
    idealBusinesses: ['Gastronomia Intimista & Bistrôs', 'Casas de Eventos & Casamentos', 'Ecoturismo & Lazer', 'Serviços Residenciais'],
    estimatedAudience: '35.000 moradores e frequentadores qualificados',
    description: 'Região nobre cercada de natureza com público de alto poder aquisitivo e atração de frequentadores para finais de semana.'
  },
  {
    id: 'jacarepagua',
    name: 'Jacarepaguá (Freguesia, Taquara, Anil, Pechincha)',
    shortName: 'Jacarepaguá',
    region: 'Zona Oeste',
    coordinates: { x: 30, y: 55 },
    pointsOfInterest: ['Estrada dos Três Rios (Freguesia)', 'Centro da Taquara', 'Estrada de Jacarepaguá', 'Pechincha Comercial'],
    recommendedRadius: '3.0 km a 5.0 km',
    idealBusinesses: ['Delivery de Comida', 'Oficinas & Autopeças', 'Clínicas Especializadas', 'Escolas & Cursos'],
    estimatedAudience: '320.000 moradores ativos',
    description: 'Um dos maiores polos populacionais e comerciais do Rio, com demanda massiva para entregas locais e serviços especializados.'
  },
  {
    id: 'barra-recreio',
    name: 'Barra da Tijuca & Recreio dos Bandeirantes',
    shortName: 'Barra da Tijuca',
    region: 'Zona Oeste',
    coordinates: { x: 26, y: 72 },
    pointsOfInterest: ['Av. das Américas', 'Jardim Oceânico', 'Condomínios Fechados', 'Av. Lúcio Costa (Praia)', 'Recreio Shopping & BarraShopping'],
    recommendedRadius: '4.0 km a 8.0 km',
    idealBusinesses: ['Clínicas de Estética Avançada', 'Beachwear & Moda', 'Restaurantes & Lounges', 'Serviços Premium'],
    estimatedAudience: '390.000 moradores com alto ticket médio',
    description: 'Maior concentração de condomínios fechados do estado, ideal para negócios com ticket médio elevado e foco em qualidade de vida.'
  }
];

interface GeoCoverageSectionProps {
  onSelectZone: (zoneName: string) => void;
}

export const GeoCoverageSection: React.FC<GeoCoverageSectionProps> = ({ onSelectZone }) => {
  const [selectedZone, setSelectedZone] = useState<ZoneData>(RIO_ZONES[0]);

  return (
    <section id="cobertura" className="py-20 bg-[#070C16] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#0057FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0080FF]/10 text-[#60A5FA] text-xs font-bold uppercase tracking-wider border border-[#0080FF]/20 mb-3">
            <Compass className="w-3.5 h-3.5" /> Inteligência Geográfica
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            COBERTURA <span className="text-gradient-orange">GEO-LOCAL NO RIO DE JANEIRO</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Selecione uma região abaixo para conferir o mapa interativo, perfil demográfico e raio recomendado para o seu tipo de negócio.
          </p>
        </div>

        {/* Region selector pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {RIO_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black shadow-lg shadow-[#FF6B00]/30 scale-105'
                    : 'bg-[#0C1424] text-slate-300 hover:text-white border border-white/10 hover:border-slate-600'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#FF6B00]'}`} />
                <span>{zone.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Map & Details Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Stylized Dark Mode Rio Radar Map */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0C1424] border border-white/10 p-6 overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>Radar de Distribuição Hiperlocal RJ</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Escala de Precisão: CEP / Raio KM
                </div>
              </div>

              {/* Stylized SVG Map of Rio de Janeiro */}
              <div className="relative w-full aspect-[16/10] bg-[#070B14] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

                <svg
                  viewBox="0 0 1000 620"
                  className="w-full h-full object-contain pointer-events-none select-none opacity-80"
                >
                  <defs>
                    <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#131D33" />
                      <stop offset="100%" stopColor="#0B1220" />
                    </linearGradient>
                  </defs>

                  <rect width="1000" height="620" fill="#060A14" />
                  
                  <path
                    d="M 50,20 Q 200,60 450,70 Q 600,80 750,50 L 980,50 L 980,400 Q 850,380 780,320 Q 720,250 670,220 Q 620,180 580,240 Q 550,300 480,360 Q 400,420 320,460 Q 200,520 80,560 Z"
                    fill="url(#landGrad)"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.5"
                  />

                  <path d="M 120,480 Q 250,420 400,320 Q 550,220 700,180" fill="none" stroke="rgba(0,87,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 450,150 Q 520,260 550,330" fill="none" stroke="rgba(255,107,0,0.3)" strokeWidth="2" />
                  <path d="M 180,520 L 450,460 L 600,360" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                </svg>

                {/* Interactive Pins on Map */}
                {RIO_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      style={{
                        left: `${zone.coordinates.x}%`,
                        top: `${zone.coordinates.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className="absolute z-20 group cursor-pointer"
                      title={zone.name}
                    >
                      {isSelected && (
                        <>
                          <span className="absolute -inset-3 rounded-full bg-[#FF6B00]/40 animate-ping pointer-events-none" />
                          <span className="absolute -inset-6 rounded-full border border-[#FF6B00]/40 animate-radar pointer-events-none" />
                        </>
                      )}

                      <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'w-10 h-10 bg-gradient-to-tr from-[#FF6B00] to-[#FFA800] text-black shadow-lg shadow-[#FF6B00]/60 scale-125'
                          : 'w-7 h-7 bg-[#0C1527] text-slate-300 border border-white/20 hover:scale-110 hover:border-[#FF6B00]'
                      }`}>
                        <MapPin className={`${isSelected ? 'w-5 h-5 fill-black' : 'w-3.5 h-3.5 text-[#FF6B00]'}`} />
                      </div>

                      <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-md transition-all ${
                        isSelected
                          ? 'bg-black/90 text-[#FFA800] border border-[#FF6B00]/40 shadow-md'
                          : 'bg-black/70 text-slate-300 opacity-80 group-hover:opacity-100'
                      }`}>
                        {zone.shortName}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
                  Região Selecionada: <strong className="text-white">{selectedZone.name}</strong>
                </span>
                <span className="text-slate-400">Clique em qualquer pin para inspecionar</span>
              </div>

            </div>
          </div>

          {/* Right: Selected Zone Detailed Intelligence Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0C1424] border-2 border-white/10 relative overflow-hidden space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#0057FF]/15 text-[#60A5FA] text-xs font-bold uppercase tracking-wider border border-[#0057FF]/30">
                  {selectedZone.region} • Rio de Janeiro
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Alta Densidade
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-display font-black text-white">
                  {selectedZone.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedZone.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#070B14] border border-white/5">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-[#FF6B00]" /> Raio Recomendado
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {selectedZone.recommendedRadius}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#070B14] border border-white/5">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Público Potencial
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {selectedZone.estimatedAudience}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Polos & Vias de Destaque:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedZone.pointsOfInterest.map((poi, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 text-xs border border-white/10"
                    >
                      {poi}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-[#FFA800] font-bold mb-2 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" /> Segmentos com Maior Conversão Aqui:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedZone.idealBusinesses.map((biz, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#FF6B00]/10 text-[#FF9500] text-xs font-medium border border-[#FF6B00]/20"
                    >
                      {biz}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectZone(selectedZone.shortName)}
                  className="w-full py-3.5 px-6 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Anunciar em {selectedZone.shortName}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
