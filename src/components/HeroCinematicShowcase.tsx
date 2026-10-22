import React, { useState } from 'react';
import { 
  Trash2, 
  Laptop, 
  MessageCircle, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';

interface HeroCinematicShowcaseProps {
  onScrollToForm: () => void;
}

export const HeroCinematicShowcase: React.FC<HeroCinematicShowcaseProps> = ({ onScrollToForm }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // The user's exact uploaded image
  const heroImageSrc = '/assets/aistudio/exec-62c16313-a86d-4506-8687-05d7b3cbb9a1_c4a8edbe.png';

  const hotspots = [
    {
      id: 1,
      x: '18%',
      y: '48%',
      title: 'O Jeito Antigo: Panfletando na Rua',
      tag: '80% vai para o lixo',
      tagColor: 'bg-rose-600 text-white',
      badgeColor: 'bg-rose-500 text-white border-rose-400',
      description: 'Promotores tentam entregar folhetos impressos a pedestres apressados. A grande maioria acaba descartada nas calçadas e bueiros sem gerar vendas.',
      icon: Trash2
    },
    {
      id: 2,
      x: '64%',
      y: '58%',
      title: 'Panfletagem no Laptop (Meta Ads)',
      tag: '100% nas telas dos clientes',
      tagColor: 'bg-[#0057FF] text-white',
      badgeColor: 'bg-[#FF6B00] text-black border-[#FFA800]',
      description: 'A equipe da Brasils configura anúncios ultra-segmentados pelo Gerenciador da Meta. O panfleto digital aparece exatamente no feed de quem mora e consome no seu bairro.',
      icon: Laptop
    },
    {
      id: 3,
      x: '86%',
      y: '40%',
      title: 'Especialista Brasils Agência Digital',
      tag: 'Gestão Completa Inclusa',
      tagColor: 'bg-emerald-500 text-black',
      badgeColor: 'bg-emerald-400 text-black border-emerald-300',
      description: 'Artes cinematográficas criadas para prender o scroll, raio em km calibrado no CEP do seu comércio e suporte dedicado.',
      icon: Sparkles
    }
  ];

  return (
    <div className="w-full my-10 relative">
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#FF6B00] via-[#0057FF]/40 to-[#FFA800] shadow-[0_0_60px_rgba(255,107,0,0.3)]">
        
        {/* Inner Frame */}
        <div className="relative rounded-[22px] bg-[#0A0F1D] overflow-hidden">
          
          {/* Top Bar with Status and Interactive Instructions */}
          <div className="px-4 py-3 bg-[#0C1527] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-display font-extrabold text-white text-xs sm:text-sm tracking-wide">
                A Revolução da Panfletagem no Rio de Janeiro
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-400">
                • Fotografia Oficial Brasils Agência Digital
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="hidden md:inline">Clique nos pontos interativos na imagem</span>
              <div className="flex items-center gap-1">
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                      activeHotspot === h.id
                        ? 'bg-[#FF6B00] text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Ponto {h.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Cinematic Image Display */}
          <div className="relative aspect-[16/9] w-full overflow-hidden select-none bg-black">
            <img
              src={heroImageSrc}
              alt="Comparativo da Panfletagem: Pessoa panfletando na rua à esquerda vs. Profissional da Brasils operando Panfletagem Digital no Laptop com Meta Ads à direita"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* Subtle Gradient Overlays for Readability and Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060A12] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060A12] to-transparent pointer-events-none" />

            {/* Interactive Pulsing Hotspots */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  {/* Radar Pulse Rings */}
                  <span className="absolute -inset-2 rounded-full bg-white/40 animate-ping pointer-events-none" />
                  
                  {/* Pin Button */}
                  <button
                    onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${spot.badgeColor} ${
                      isActive ? 'scale-125 ring-4 ring-white/50' : 'hover:scale-110'
                    }`}
                    aria-label={spot.title}
                  >
                    <spot.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Hotspot Floating Popup */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 p-3.5 rounded-2xl bg-[#0C1527]/95 backdrop-blur-xl border border-white/20 shadow-2xl z-40 text-left animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${spot.tagColor}`}>
                          {spot.tag}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(null);
                          }}
                          className="text-slate-400 hover:text-white text-xs px-1"
                        >
                          ✕
                        </button>
                      </div>
                      <h4 className="font-display font-extrabold text-white text-xs sm:text-sm">
                        {spot.title}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {spot.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl bg-black/75 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black">
                    A EVOLUÇÃO
                  </span>
                  <span className="text-xs font-bold text-white">
                    Da rua para as telas certas
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-snug">
                  Enquanto o panfleto de papel vai para o chão da calçada, a <strong>Brasils Agência Digital</strong> entrega seu anúncio direto no Instagram & WhatsApp de quem mora perto do seu negócio.
                </p>
              </div>

              {/* Fast Action CTA inside the photo */}
              <button
                onClick={onScrollToForm}
                className="px-6 py-3.5 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-xl shadow-[#FF6B00]/40 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <Flame className="w-4 h-4 fill-black" />
                <span>Ativar no Meu Bairro (R$ 399)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick 3-Pillar Summary Bar below photo */}
          <div className="p-4 sm:p-6 bg-[#090E1B] border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">1. Adeus ao Papel no Chão</strong>
                <span className="text-slate-400 text-[11px]">80% dos panfletos impressos são jogados no lixo sem serem lidos.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-[#0057FF]/10 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">2. Panfletagem no Laptop</strong>
                <span className="text-slate-400 text-[11px]">Segmentação cirúrgica no Meta Ads por CEP, raio em km e bairro.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block font-bold">3. Conversas no WhatsApp</strong>
                <span className="text-slate-400 text-[11px]">1 toque no anúncio abre a conversa pronto para comprar ou agendar.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
