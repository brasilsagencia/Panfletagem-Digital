import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  MessageCircle, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Store, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { calculateDigitalReach, BUSINESS_NICHES } from '../utils/calculator';

interface ReachCalculatorSectionProps {
  onApplyPlan: (budget: number, nicheId: string) => void;
}

export const ReachCalculatorSection: React.FC<ReachCalculatorSectionProps> = ({ onApplyPlan }) => {
  const [budget, setBudget] = useState<number>(399);
  const [selectedNiche, setSelectedNiche] = useState<string>('restaurante');

  const metrics = calculateDigitalReach(budget, selectedNiche);
  const currentNicheObj = BUSINESS_NICHES.find(n => n.id === selectedNiche) || BUSINESS_NICHES[0];

  return (
    <section id="calculadora" className="py-20 bg-[#060A12] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 text-[#FFA800] text-xs font-bold uppercase tracking-wider border border-[#FF6B00]/20 mb-3">
            <Calculator className="w-3.5 h-3.5" /> Simulador Interativo
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            CALCULADORA DE <span className="text-gradient-orange">ALCANCE LOCAL</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Selecione o segmento do seu negócio e o investimento desejado para simular o volume estimado de visualizações e mensagens no seu WhatsApp no Rio de Janeiro.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#0C1424] border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Sliders & Niche Selector */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Niche Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2 mb-3">
                  <Store className="w-4 h-4 text-[#FFA800]" /> 1. Qual o nicho da sua empresa?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BUSINESS_NICHES.map((niche) => {
                    const isSelected = selectedNiche === niche.id;
                    return (
                      <button
                        key={niche.id}
                        type="button"
                        onClick={() => setSelectedNiche(niche.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FF6B00]/20 to-[#FFA800]/10 border-[#FF6B00] text-white shadow-md'
                            : 'bg-[#070B14] border-white/5 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <div className={`text-xs font-bold ${isSelected ? 'text-[#FFA800]' : 'text-slate-300'}`}>
                          {niche.label.split('/')[0].trim()}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                          {niche.description.split('(')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#FF6B00]" /> 2. Orçamento do Pacote:
                  </label>
                  <div className="flex items-baseline gap-1 bg-[#070B14] px-4 py-1.5 rounded-xl border border-white/10">
                    <span className="text-xs text-[#FFA800] font-bold">R$</span>
                    <span className="text-2xl font-display font-black text-white">{budget}</span>
                    <span className="text-[11px] text-slate-400">/ campanha</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="250"
                  max="2000"
                  step="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[#FF6B00] bg-slate-800 h-2.5 rounded-lg cursor-pointer"
                  aria-label="Orçamento da campanha"
                />

                {/* Quick Budget Shortcuts */}
                <div className="flex items-center justify-between gap-2 pt-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setBudget(299)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer ${budget === 299 ? 'bg-[#FF6B00] text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
                  >
                    R$ 299 (Básico)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudget(399)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer ${budget === 399 ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black font-black' : 'bg-[#FF6B00]/20 text-[#FFA800] border-[#FF6B00]/40'}`}
                  >
                    ★ R$ 399 (Recomendado)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudget(650)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer ${budget === 650 ? 'bg-[#FF6B00] text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
                  >
                    R$ 650 (Expansão)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudget(1200)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer ${budget === 1200 ? 'bg-[#FF6B00] text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
                  >
                    R$ 1.200 (Dominação)
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Computed Real-Time Metrics Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6 bg-[#070B14] border-2 border-[#FF6B00]/40 relative overflow-hidden space-y-5 shadow-xl">
                
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Projeção Estimada para seu Bairro
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Dados Calibrados RJ
                  </span>
                </div>

                {/* Big Metric: Impressions */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0080FF]" /> Alcance Qualificado no Feed:
                  </div>
                  <div className="mt-1 text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#FFA800]">
                    {metrics.monthlyReachMin.toLocaleString('pt-BR')} a {metrics.monthlyReachMax.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    visualizações de quem mora ou trabalha na sua vizinhança.
                  </div>
                </div>

                {/* Second Metric: WhatsApp Direct Starts */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> Contatos Estimados no WhatsApp:
                  </div>
                  <div className="text-2xl font-display font-black text-emerald-300 mt-1">
                    {metrics.estimatedWhatsappChatsMin} a {metrics.estimatedWhatsappChatsMax} conversas
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Pessoas com intenção real de agendar ou pedir informações.
                  </div>
                </div>

                {/* Third Metric: Clicks on Ad */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <span className="text-slate-400">Cliques qualificados no anúncio:</span>
                  <span className="font-bold text-white font-mono">
                    {metrics.estimatedClicksMin} a {metrics.estimatedClicksMax} cliques
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Custo médio por morador impactado:</span>
                  <span className="font-bold text-[#FFA800] font-mono">
                    ~ R$ 0,01 a R$ 0,02
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onApplyPlan(budget, selectedNiche)}
                    className="w-full py-3.5 px-6 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Garantir Este Alcance para Minha Loja</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
