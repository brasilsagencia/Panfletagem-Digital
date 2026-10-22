import React, { useState } from 'react';
import { 
  Trash2, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  MessageCircle, 
  Radio, 
  TrendingUp, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface HeroVisualComparisonProps {
  onScrollToForm: () => void;
}

export const HeroVisualComparison: React.FC<HeroVisualComparisonProps> = ({ onScrollToForm }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'street' | 'laptop'>('both');
  const [digitalFlyerLiked, setDigitalFlyerLiked] = useState<boolean>(false);

  // Authentic image uploaded by user showing both street paper flyer distribution and laptop digital campaign
  const streetFlyerImageUrl = '/assets/aistudio/exec-62c16313-a86d-4506-8687-05d7b3cbb9a1_c4a8edbe.png';
  const laptopDeskImageUrl = '/assets/aistudio/exec-62c16313-a86d-4506-8687-05d7b3cbb9a1_c4a8edbe.png';

  return (
    <div className="w-full mt-12 space-y-6">
      {/* Visual Mode Selector Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-2xl bg-[#0C1424] border border-white/10 shadow-lg">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comparativo Visual: Rua vs. Laptop
          </button>
          <button
            onClick={() => setActiveTab('street')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'street'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Panfletando na Rua
          </button>
          <button
            onClick={() => setActiveTab('laptop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'laptop'
                ? 'bg-[#0057FF] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Panfletando no Laptop (Panfleto Digital)
          </button>
        </div>
      </div>

      {/* Main Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* CARD 1: Imagem de pessoa panfletando na rua */}
        {(activeTab === 'both' || activeTab === 'street') && (
          <div className="rounded-3xl p-5 sm:p-6 bg-[#0E1017] border border-rose-500/25 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            {/* Top Red Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
                <Trash2 className="w-3.5 h-3.5" /> 1. O Jeito Antigo: Panfletando na Rua
              </span>
              <span className="text-[11px] font-bold text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                80% vai para o lixo
              </span>
            </div>

            {/* Photo of person distributing paper flyers on street */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 mb-4 bg-slate-900">
              <img
                src={streetFlyerImageUrl}
                alt="Pessoa distribuindo panfletos de papel impressos na rua e calçadas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Overlaid location & street callout */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] text-slate-200 font-semibold flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Rua 28 de Setembro & Praça Saens Peña (RJ)</span>
              </div>

              {/* Graphic element: Realistic Physical Paper Flyer being handed out */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 p-3 rounded-lg bg-[#FAF7EE] text-slate-900 shadow-2xl shadow-black/80 rotate-[-6deg] border border-amber-300/40 select-none pointer-events-none group-hover:rotate-[-3deg] transition-transform duration-300">
                <div className="text-[9px] uppercase font-bold text-rose-600 tracking-wider">Folheto de Papel Impresso</div>
                <div className="font-display font-black text-xs uppercase leading-tight mt-0.5">Grande Oferta da Loja</div>
                <div className="text-[9px] text-slate-600 mt-1 line-clamp-2">Ligue agora: (21) 3344-XXXX. Venha nos visitar na avenida principal.</div>
                
                {/* Trash Stamp */}
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-rose-600 text-white font-black text-[9px] rounded uppercase shadow-sm">
                  <Trash2 className="w-2.5 h-2.5" /> 80% vai pro lixo
                </div>
              </div>

              {/* Overlaid pain points at bottom */}
              <div className="absolute bottom-3 inset-x-3 text-left">
                <div className="text-xs font-bold text-white uppercase drop-shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  Pessoas panfletando nas calçadas do Rio
                </div>
                <div className="text-[11px] text-slate-300 drop-shadow line-clamp-1">
                  Pedestres passam apressados sem olhar, e os folhetos acabam pisoteados no chão.
                </div>
              </div>
            </div>

            {/* Street Flyer Disadvantages */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-rose-400 font-semibold">
                <span>❌ <strong>Alto custo e desperdício:</strong> R$ 800+ em gráfica e distribuição</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>❌ <strong>Entrega aleatória:</strong> quem pega muitas vezes nem mora no bairro</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>❌ <strong>Zero métricas:</strong> impossível saber quantos clientes realmente leram</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-rose-500/10 text-[11px] text-slate-400">
              Substitua essa dor de cabeça por cliques reais direto no seu WhatsApp.
            </div>
          </div>
        )}

        {/* CARD 2: Imagem panfletando no laptop e panfleto digital dentro do laptop */}
        {(activeTab === 'both' || activeTab === 'laptop') && (
          <div className="rounded-3xl p-5 sm:p-6 bg-[#0C1527] border-2 border-[#FF6B00]/50 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_40px_rgba(255,107,0,0.2)]">
            {/* Top Glowing Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B00]/20 to-[#FFA800]/20 text-[#FFA800] text-xs font-black uppercase tracking-wider border border-[#FF6B00]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" /> 2. O Jeito Brasils: Panfletando no Laptop
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                100% no feed dos moradores
              </span>
            </div>

            {/* High-Tech Realistic Laptop Mockup with Panfleto Digital INSIDE */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 mb-4 bg-[#050811] shadow-2xl p-2.5 sm:p-3.5">
              
              {/* Laptop Screen Bezel */}
              <div className="rounded-xl bg-[#070C18] border border-white/10 overflow-hidden text-slate-200">
                
                {/* Laptop Camera Bar & Window Controls */}
                <div className="px-3 py-1.5 bg-[#0B1324] border-b border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 font-mono text-[9px] text-slate-400 hidden sm:inline">
                      brasils-manager.app / panfletagem-hiperlocal
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Disparo Ativo: Raio 3.5 km</span>
                  </div>
                </div>

                {/* INSIDE THE LAPTOP SCREEN: THE DIGITAL FLYER CAMPAIGN */}
                <div className="p-3 sm:p-4 bg-gradient-to-br from-[#090F1C] via-[#0E1729] to-[#121A2E] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  
                  {/* Left part inside laptop: The Digital Flyer Creative Ad */}
                  <div className="sm:col-span-7 rounded-xl p-3 bg-[#080D1A] border border-[#FF6B00]/40 relative overflow-hidden shadow-lg">
                    {/* Flyer Top Header */}
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#FF6B00] to-[#FFA800] flex items-center justify-center font-bold text-black text-[9px]">
                          B
                        </div>
                        <span className="font-bold text-white text-[11px]">SUA LOJA AQUI</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#FF6B00]/20 text-[#FFA800] font-bold text-[9px] border border-[#FF6B00]/30">
                        Patrocinado • Instagram & Facebook
                      </span>
                    </div>

                    {/* Digital Flyer Graphic Content */}
                    <div className="rounded-lg p-2.5 bg-gradient-to-tr from-[#141E33] to-[#1B2945] border border-white/10 text-center relative overflow-hidden my-1">
                      <div className="inline-block px-2 py-0.5 rounded bg-[#FF6B00] text-black text-[9px] font-black uppercase mb-1">
                        PANFLETO DIGITAL RJ
                      </div>
                      <div className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-tight leading-tight">
                        PROMOÇÃO EXCLUSIVA NO SEU BAIRRO
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5">
                        Vila Isabel • Tijuca • Grajaú • Barra • Recreio
                      </p>

                      {/* Direct WhatsApp Action Button inside digital flyer */}
                      <div className="mt-2 flex items-center justify-between gap-1.5 bg-emerald-500/15 p-1.5 rounded-lg border border-emerald-500/30">
                        <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-emerald-400" /> Conversar no WhatsApp
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[9px]">
                          1 Toque
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-[#FFA800] font-semibold flex items-center gap-1">
                        <Radio className="w-3 h-3 text-[#FFA800] animate-pulse" /> +42.500 visualizações
                      </span>
                      <span className="text-emerald-400 font-mono font-bold">
                        R$ 0,01 / morador
                      </span>
                    </div>
                  </div>

                  {/* Right part inside laptop: Map & Distribution Controls */}
                  <div className="sm:col-span-5 space-y-2 text-[10px]">
                    <div className="p-2 rounded-lg bg-[#070B14] border border-white/5 space-y-1">
                      <div className="text-slate-400 flex items-center gap-1 font-semibold text-[9px] uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-[#0080FF]" /> Raio de Distribuição:
                      </div>
                      <div className="text-white font-bold text-[11px]">Vila Isabel & Tijuca</div>
                      <div className="text-slate-400 text-[9px]">Ruas: 28 de Setembro, Saens Peña, Teodoro</div>
                    </div>

                    <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-0.5">
                      <div className="text-emerald-400 font-bold flex items-center gap-1 text-[9px] uppercase">
                        <TrendingUp className="w-3 h-3" /> Clientes no WhatsApp:
                      </div>
                      <div className="text-emerald-300 font-extrabold text-sm">+28 conversas hoje</div>
                    </div>

                    <div className="text-[9px] text-slate-400 italic">
                      "Operação automatizada pelo laptop sem imprimir um papel sequer."
                    </div>
                  </div>

                </div>

              </div>

              {/* Laptop Lower Hinge & Keyboard lip simulation */}
              <div className="h-2 w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-b-lg mt-0.5 flex items-center justify-center">
                <div className="w-16 h-0.5 bg-slate-900 rounded-full"></div>
              </div>
            </div>

            {/* Laptop Digital Flyer Advantages */}
            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2 text-[#FFA800] font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Pacote Completo R$ 399:</strong> planejamento, arte cinematográfica e configuração</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#0080FF] shrink-0" />
                <span><strong>100% nas telas:</strong> entregue nas mãos de quem consome e mora perto de você</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>1 Toque e cai no WhatsApp:</strong> zero fricção para transformar visualização em venda</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={onScrollToForm}
                className="w-full py-2.5 px-4 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ativar Panfletagem Digital no Meu Bairro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
