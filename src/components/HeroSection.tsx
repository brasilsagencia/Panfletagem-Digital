import React from 'react';
import { 
  Play, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';
import { PhoneMockup3D } from './PhoneMockup3D';
import { HeroVisualComparison } from './HeroVisualComparison';
import { HeroCinematicShowcase } from './HeroCinematicShowcase';
import { BrasilsLogo } from './BrasilsLogo';

interface HeroSectionProps {
  onOpenVideo: () => void;
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenVideo,
  onScrollToForm
}) => {
  return (
    <section className="relative pt-10 pb-20 sm:pt-16 lg:pt-20 sm:pb-28 overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#0057FF]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-[#FF6B00]/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#060A12] to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Geo-Target Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <BrasilsLogo size="sm" showSubtitle={false} className="bg-[#0C1527]/90 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C1527] border border-[#FF6B00]/30 shadow-lg shadow-[#FF6B00]/10 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF6B00]"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFA800]" />
              RIO DE JANEIRO: ZONA NORTE, JACAREPAGUÁ E BARRA/RECREIO
            </span>
          </div>
        </div>

        {/* Headline H1 & Subheadline */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] uppercase drop-shadow-xl">
            PANFLETAGEM DIGITAL: <br className="hidden sm:inline" />
            <span className="text-gradient-orange">
              SUA MARCA NO FEED DE QUEM MORA E CONSOME NO SEU BAIRRO.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Pare de queimar dinheiro com panfletos de papel que vão parar no lixo. Entregamos anúncios ultra-segmentados nas telas dos clientes a poucos metros da sua loja em <strong className="text-white font-semibold">Vila Isabel, Tijuca, Grajaú, Jacarepaguá, Barra da Tijuca e Recreio</strong>.
          </p>

          {/* Quick Stats Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 bg-[#0C1424] px-3.5 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% nas telas dos moradores</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0C1424] px-3.5 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#0080FF]" />
              <span>1 Toque vai direto para o WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0C1424] px-3.5 py-1.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-[#FFA800]" />
              <span>Sem taxa de matrícula ou mensalidade</span>
            </div>
          </div>
        </div>

        {/* Central Master Hero Image Requested by User: Street Flyer vs. Laptop Panfletagem Digital */}
        <HeroCinematicShowcase onScrollToForm={onScrollToForm} />

        {/* Main Grid: Left Price Card 3D & Right Interactive 3D Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: 3D Highlight Price Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-[#FF6B00] via-[#FFA800]/50 to-[#0057FF]/40 shadow-[0_0_50px_rgba(255,107,0,0.25)]">
              <div className="rounded-[22px] bg-[#0C1424]/95 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FFA800] text-xs font-black uppercase tracking-wider border border-[#FF6B00]/30">
                    <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> PACOTE DE ACELERAÇÃO LOCAL
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    Ativação em até 48h
                  </span>
                </div>

                {/* Big Price Highlight */}
                <div className="pt-2 pb-1 border-b border-white/10">
                  <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
                    Investimento único inicial
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#FFA800]">R$</span>
                    <span className="text-5xl sm:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFA800] via-[#FF8500] to-[#FF6B00] tracking-tight drop-shadow-md">
                      399,00
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 font-medium">/ campanha pronta</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Mais barato que imprimir 2.500 panfletos e com 10x mais retorno garantido nas telas.
                  </p>
                </div>

                {/* Core Triggers & Inclusions */}
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong className="text-white">Campanha Pronta para Rodar:</strong> Sem dor de cabeça técnica, configuramos tudo no Gerenciador de Anúncios.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong className="text-white">Criativos Inclusos:</strong> Design cinematográfico de alto padrão em imagem ou vídeo feito para prender o scroll.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong className="text-white">Raio Personalizado em KM:</strong> Segmentação hiperlocal precisa pelo seu CEP ou bairro no Rio de Janeiro.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>
                      <strong className="text-white">Direto no seu WhatsApp:</strong> Mensagens de compradores chegando na hora no seu canal de atendimento.
                    </span>
                  </li>
                </ul>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onScrollToForm}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFA800] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 hover:shadow-[#FF6B00]/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Quero Anunciar no Meu Bairro</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={onOpenVideo}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00] text-black flex items-center justify-center">
                      <Play className="w-3 h-3 fill-black ml-0.5" />
                    </div>
                    <span>Ver Vídeo de Demonstração</span>
                  </button>
                </div>

                {/* Trust Seal */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Garantia Brasils Agência Digital
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0080FF]" /> Primeiros resultados em 48h
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Interactive 3D Phone Mockup */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <PhoneMockup3D />
          </div>

        </div>

        {/* User Request: Visual comparison with street flyer distributor and laptop with digital flyer inside */}
        <HeroVisualComparison onScrollToForm={onScrollToForm} />

      </div>
    </section>
  );
};
