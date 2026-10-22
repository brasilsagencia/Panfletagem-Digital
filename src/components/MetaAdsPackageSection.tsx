import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Calendar,
  DollarSign,
  Film,
  Image as ImageIcon,
  Target,
  Users,
  MapPin,
  TrendingUp,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Activity,
  Sliders,
  ChevronRight,
  MessageCircle,
  FileSpreadsheet,
  Layers,
  Smartphone,
  Eye,
  Radio,
  Share2
} from 'lucide-react';

interface MetaAdsPackageSectionProps {
  onScrollToForm: () => void;
  onSelectPackage?: (packageName: string) => void;
}

// 7-day timeline milestone data (Remotion style keyframes)
interface TimelineKeyframe {
  day: number;
  label: string;
  phase: string;
  description: string;
  metrics: {
    reach: number;
    clicks: number;
    leads: number;
    status: string;
  };
  log: string;
}

const TIMELINE_DATA: TimelineKeyframe[] = [
  {
    day: 0,
    label: 'Dia 00',
    phase: 'Briefing & Engenharia de Anúncios',
    description: 'Roteirização do vídeo persuasivo, criação da arte estática e instalação dos pixels de conversão.',
    metrics: { reach: 0, clicks: 0, leads: 0, status: 'Setup & Aprovação' },
    log: 'Pixel Meta configurado · Criativo estático 1:1 aprovado · Vídeo 9:16 renderizado'
  },
  {
    day: 1,
    label: 'Dia 01',
    phase: 'Ativação & Teste A/B de Criativos',
    description: 'Disparo do anúncio nas imediações do seu estabelecimento (raio em KM) e início do aprendizado do algoritmo.',
    metrics: { reach: 3850, clicks: 82, leads: 5, status: 'Fase de Aprendizado' },
    log: 'Entrega inicial na Zona Norte & Barra · CPM estabilizado em R$ 12,40'
  },
  {
    day: 2,
    label: 'Dia 02',
    phase: 'Varredura Demográfica Hiperlocal',
    description: 'Algoritmo detecta os horários de maior engajamento dos moradores locais e concentra a exibição.',
    metrics: { reach: 8420, clicks: 195, leads: 14, status: 'Distribuição Inteligente' },
    log: 'Pico de cliques às 12h-14h e 18h-21h · CTR sobe para 2.4%'
  },
  {
    day: 3,
    label: 'Dia 03',
    phase: 'Refinamento de Interesses & Custo',
    description: 'Otimização humana: eliminamos audiências de baixo clique e concentramos verba nos perfis compradores.',
    metrics: { reach: 13900, clicks: 340, leads: 26, status: 'Otimização Ativa' },
    log: 'Custo por clique (CPC) reduzido em 28% · Segmentação refinada por interesse de compra'
  },
  {
    day: 4,
    label: 'Dia 04',
    phase: 'Pico de Impressões no Feed & Reels',
    description: 'Forte presença visual: seu vizinho assiste ao vídeo persuasivo nos Stories e Reels no caminho do trabalho.',
    metrics: { reach: 19650, clicks: 512, leads: 39, status: 'Alta Conversão' },
    log: 'Vídeo persuasivo com 68% de retenção em 3 segundos · Feedback positivo no direct'
  },
  {
    day: 5,
    label: 'Dia 05',
    phase: 'Retargeting de Moradores Envolvidos',
    description: 'Quem visualizou a arte estática ou assistiu 50% do vídeo recebe lembrete de escassez/promoção.',
    metrics: { reach: 24300, clicks: 680, leads: 52, status: 'Retargeting Local' },
    log: 'Anúncio de lembrete com chamada forte pro WhatsApp ativado para engajados'
  },
  {
    day: 6,
    label: 'Dia 06',
    phase: 'Aceleração Máxima de Conversões',
    description: 'Verba direcionada 100% para os criativos vencedores. Disparos contínuos de mensagens para seu WhatsApp.',
    metrics: { reach: 29800, clicks: 835, leads: 66, status: 'Escala Controlada' },
    log: 'Taxa de conversão em leads atinge o ápice semanal · Clientes mencionando o anúncio'
  },
  {
    day: 7,
    label: 'Dia 07',
    phase: 'Consolidação & Relatório Analítico de ROI',
    description: 'Fechamento dos 7 dias, entrega do dossiê com impressões totais, custo por lead e recomendações estratégicas.',
    metrics: { reach: 34200, clicks: 960, leads: 78, status: 'Campanha Concluída com Sucesso' },
    log: 'Relatório PDF gerado · 34.200 moradores alcançados · Custo por lead R$ 5,11'
  }
];

export const MetaAdsPackageSection: React.FC<MetaAdsPackageSectionProps> = ({
  onScrollToForm,
  onSelectPackage
}) => {
  // Timeline Remotion Scrubbing State
  const [currentDay, setCurrentDay] = useState<number>(3);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(true);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Module 3: Creative Preview State (Static vs Video)
  const [activeCreativeTab, setActiveCreativeTab] = useState<'video' | 'static'>('video');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  // Module 4: Demographic Radar Targeting State
  const [gender, setGender] = useState<'all' | 'female' | 'male'>('all');
  const [ageRange, setAgeRange] = useState<string>('25-54');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Tijuca & Maracanã');
  const [activeInterests, setActiveInterests] = useState<string[]>([
    'Compradores Envolvidos',
    'Moradores Locais',
    'Gastronomia & Delivery'
  ]);

  // Auto-play Remotion scrubber effect
  useEffect(() => {
    if (isPlayingTimeline) {
      playIntervalRef.current = setInterval(() => {
        setCurrentDay(prev => (prev >= 7 ? 0 : prev + 1));
      }, 2400);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlayingTimeline]);

  const toggleInterest = (tag: string) => {
    setActiveInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const currentKeyframe = TIMELINE_DATA[currentDay] || TIMELINE_DATA[0];

  // Dynamic targeting audience estimation based on filters
  const estimatedAudience = Math.round(
    (gender === 'all' ? 48000 : 25000) *
    (ageRange === '25-54' ? 1.0 : 0.7) *
    (1 + activeInterests.length * 0.08)
  );

  const handleHireClick = () => {
    if (onSelectPackage) onSelectPackage('Pacote Aceleração 7D Meta Ads');
    onScrollToForm();
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      'Olá Brasils! Quero contratar o *Pacote Aceleração 7D Meta Ads* com 7 dias de anúncios, verba inclusa, criativo estático + vídeo e relatório de ROI para o meu negócio!'
    );
    window.open(`https://wa.me/5521990089982?text=${text}`, '_blank');
  };

  return (
    <section
      id="pacote-7d"
      className="relative py-24 sm:py-32 bg-[#0A0A0C] text-slate-100 overflow-hidden border-t border-b border-white/5 scroll-mt-20"
    >
      {/* Anchor for legacy preco links */}
      <div id="preco" className="absolute -top-20 left-0" />
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-[#0057FF]/12 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#FF6B00]/12 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

      {/* Grid Pattern overlay for cinematic motion graphic texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO TAGLINE & MOTION BADGE */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          
          {/* Top Hyperframes Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#12141A] border border-[#FF6B00]/40 shadow-[0_0_25px_rgba(255,107,0,0.2)] mb-5 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFA800]">
              HYPERFRAMES // META ENGINE 7D
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-medium text-slate-300">
              Tráfego Pago de Alta Precisão
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-6">
            PACOTE ACELERAÇÃO <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#0080FF] drop-shadow-lg">
              7 DIAS META ADS
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Uma esteira completa de aquisição local: <strong>7 dias ininterruptos</strong> de anúncios com 
            verba inclusa, criativo estático de alta fidelidade, vídeo persuasivo 9:16, segmentação hiperlocal 
            e relatório final de ROI transparente.
          </p>

          {/* Quick Pillars Highlights Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-[#FFA800]" /> 7 Dias Ativos 24/7
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Verba de Mídia 100% Inclusa
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <Film className="w-4 h-4 text-[#0080FF]" /> Arte Estática + Vídeo 9:16
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <Target className="w-4 h-4 text-[#FF6B00]" /> Segmentação Hiperlocal
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              <BarChart3 className="w-4 h-4 text-purple-400" /> Relatório & ROI
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE REMOTION-STYLE TIMELINE CONTROLLER */}
        {/* ========================================================================= */}
        <div className="mb-14 bg-[#11131A]/90 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FFA800]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-white text-base sm:text-lg">
                    Timeline de Execução da Campanha (0 a 7 Dias)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0057FF]/20 text-[#0080FF] border border-[#0057FF]/30 uppercase">
                    Remotion Keyframes
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Acompanhe passo a passo como cada centavo é gerido e otimizado ao longo de 168 horas contínuas.
                </p>
              </div>
            </div>

            {/* Play/Pause & Timecode Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <div className="font-mono text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                TIMECODE: <span className="text-[#FFA800] font-bold">DIA {currentDay}</span> / 07
              </div>

              <button
                onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#FF8500] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF6B00]/20 cursor-pointer"
                title={isPlayingTimeline ? 'Pausar simulação da timeline' : 'Iniciar playback da timeline'}
              >
                {isPlayingTimeline ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Play
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentDay(0);
                  setIsPlayingTimeline(false);
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Voltar ao início"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Scrubbing Bar with 8 Keyframe Nodes (Day 0 to Day 7) */}
          <div className="pt-6 pb-2">
            <div className="relative">
              {/* Background Timeline Track */}
              <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#0080FF] transition-all duration-500 ease-out"
                  style={{ width: `${(currentDay / 7) * 100}%` }}
                />
              </div>

              {/* Keyframe Nodes */}
              <div className="relative flex justify-between -mt-3.5">
                {TIMELINE_DATA.map((item) => {
                  const isActive = item.day === currentDay;
                  const isPast = item.day < currentDay;

                  return (
                    <button
                      key={item.day}
                      onClick={() => {
                        setCurrentDay(item.day);
                        setIsPlayingTimeline(false);
                      }}
                      className="group flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-[#FFA800] ring-4 ring-[#FF6B00]/30 scale-125 shadow-[0_0_15px_#FFA800]'
                            : isPast
                            ? 'bg-[#0080FF] text-white'
                            : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                        {isPast && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </div>

                      <span
                        className={`mt-2 text-[10px] sm:text-xs font-mono font-medium transition-colors ${
                          isActive
                            ? 'text-[#FFA800] font-bold'
                            : isPast
                            ? 'text-slate-300'
                            : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyframe Live Details Display */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 bg-black/40 rounded-xl p-4 border border-white/5 items-center">
            <div className="md:col-span-7 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FFA800] font-bold uppercase tracking-wider">
                  {currentKeyframe.label} · {currentKeyframe.phase}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {currentKeyframe.metrics.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {currentKeyframe.description}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Activity className="w-3.5 h-3.5 text-[#0080FF]" />
                <span className="truncate">{currentKeyframe.log}</span>
              </div>
            </div>

            {/* Keyframe Snapshot Counters */}
            <div className="md:col-span-5 grid grid-cols-3 gap-2 text-center border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Impressões</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {currentKeyframe.metrics.reach.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Cliques</div>
                <div className="text-sm sm:text-base font-bold text-[#FFA800] font-mono">
                  {currentKeyframe.metrics.clicks.toLocaleString('pt-BR')}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Leads WPP</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                  {currentKeyframe.metrics.leads}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE 5 MANDATORY MODULES BENTO GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ----------------------------------------------------------------------- */}
          {/* MÓDULO 1: DURAÇÃO DE 7 DIAS (168 HORAS ATIVAS) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0E1118] border border-white/10 p-6 flex flex-col justify-between hover:border-[#FF6B00]/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-2xl group-hover:bg-[#FF6B00]/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
                  <Clock className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FF6B00]/15 text-[#FFA800] border border-[#FF6B00]/30">
                  MÓDULO 01
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-white mb-2 uppercase">
                1. Duração Ativa de 7 Dias
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                São <strong>168 horas contínuas</strong> de distribuição ininterrupta no algoritmo da Meta 
                (Instagram + Facebook), sem pausas nos finais de semana, garantindo saturação controlada 
                no seu bairro.
              </p>

              {/* Countdown & 7-day Progress Visual */}
              <div className="space-y-3 bg-black/40 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Tempo de Veiculação:</span>
                  <span className="text-[#FFA800] font-bold">168h / 7 Dias</span>
                </div>
                
                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <div
                      key={d}
                      className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-white/5 border border-white/10 text-center"
                    >
                      <span className="text-[9px] font-mono text-slate-400">D{d}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-300 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Monitoramento diário por gestor de tráfego certificado.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Entrega 24 horas por dia</span>
              <span className="text-emerald-400 font-medium">Algoritmo ativo</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* MÓDULO 2: INVESTIMENTO META ADS 100% INCLUSO */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0E1118] border border-white/10 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  MÓDULO 02
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-white mb-2 uppercase">
                2. Investimento Meta Ads Incluso
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Toda a verba de leilão destinada aos anúncios da Meta já está <strong>100% coberta</strong>. 
                Zero pegadinhas, sem cobranças adicionais na sua fatura e sem surpresas.
              </p>

              {/* Zero Hidden Fees Card */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verba de Anúncios Meta
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">100% Paga</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gestão & Otimização
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">Inclusa</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Taxas extras ou surpresas
                  </span>
                  <span className="text-slate-400 font-mono font-bold">R$ 0,00</span>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contrato fechado com garantia de entrega total das impressões.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Transparência financeira</span>
              <span className="text-[#FFA800] font-medium">Pacote fechado</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* MÓDULO 3: PRODUÇÃO VISUAL DUPLA (ESTÁTICO + VÍDEO 9:16) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0E1118] border border-white/10 p-6 flex flex-col justify-between hover:border-[#0080FF]/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0080FF]/10 rounded-full blur-2xl group-hover:bg-[#0080FF]/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#0080FF]/10 border border-[#0080FF]/30 flex items-center justify-center text-[#0080FF]">
                  <Film className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#0080FF]/15 text-[#0080FF] border border-[#0080FF]/30">
                  MÓDULO 03
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-white mb-2 uppercase">
                3. Produção Visual Completa
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                Você não precisa criar nada. Produzimos <strong>2 formatos de alta conversão</strong>: 
                uma arte estática impactante para o Feed e um vídeo persuasivo vertical (9:16) para Reels e Stories.
              </p>

              {/* Interactive Visual Switcher */}
              <div className="bg-black/40 rounded-2xl p-3 border border-white/5">
                <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl mb-3">
                  <button
                    onClick={() => setActiveCreativeTab('video')}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeCreativeTab === 'video'
                        ? 'bg-[#0080FF] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" /> Vídeo 9:16 Reels
                  </button>
                  <button
                    onClick={() => setActiveCreativeTab('static')}
                    className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeCreativeTab === 'static'
                        ? 'bg-[#FF6B00] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Criativo 1:1 Feed
                  </button>
                </div>

                {/* Creative Preview Display */}
                {activeCreativeTab === 'video' ? (
                  <div className="relative rounded-xl bg-gradient-to-br from-slate-900 to-black p-3 border border-white/10 text-center">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
                      <span>REELS / STORIES 1080x1920</span>
                      <span className="text-emerald-400">● Roteiro Persuasivo</span>
                    </div>

                    {/* Mock Animated Audio Waveform */}
                    <div className="h-14 flex items-center justify-center gap-1 px-4 my-1">
                      {[40, 75, 30, 95, 60, 85, 45, 100, 65, 80, 50, 90, 35, 70].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-[#0080FF] rounded-full transition-all duration-300"
                          style={{
                            height: isVideoPlaying ? `${h}%` : '20%',
                            animation: isVideoPlaying ? `pulse 1.2s ease-in-out infinite ${i * 0.1}s` : 'none'
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-xs font-bold text-white mt-1">
                      "Procurando [Seu Serviço] aqui no bairro? Fale agora no WhatsApp!"
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Legendas dinâmicas inclusas</span>
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="text-[#FFA800] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {isVideoPlaying ? 'Pausar áudio' : 'Ouvir demonstração'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-gradient-to-br from-[#121722] to-black p-3 border border-white/10 text-center">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
                      <span>FEED QUADRADO 1080x1080</span>
                      <span className="text-[#FFA800]">● Design Cinematográfico</span>
                    </div>

                    <div className="aspect-square max-h-24 mx-auto rounded-lg bg-slate-800/80 border border-white/10 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00]/20 to-transparent" />
                      <span className="text-[11px] font-black uppercase text-white tracking-wider">
                        OFERTA EXCLUSIVA
                      </span>
                      <span className="text-[10px] text-[#FFA800] font-bold mt-0.5">
                        NO SEU BAIRRO
                      </span>
                      <span className="text-[9px] text-slate-300 mt-1 bg-black/60 px-2 py-0.5 rounded">
                        Clique e peça no WhatsApp
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-2">
                      Layout refinado com tipografia comercial, logotipo e gatilhos de ação.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Direitos de uso inclusos</span>
              <span className="text-[#0080FF] font-medium">Estático + Vídeo</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* MÓDULO 4: SEGMENTAÇÃO AVANÇADA & GESTÃO ATIVA (RADAR INTERATIVO) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0E1118] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  MÓDULO 04
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                  4. Segmentação Avançada & Gestão Ativa
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Radar Algorítmico Ativo
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Chega de entregar anúncio para quem mora a 30km de você. Mapeamos os clientes que 
                estão a minutos da sua porta e refinamos a distribuição diariamente.
              </p>

              {/* Interactive Targeting Console */}
              <div className="bg-black/50 rounded-2xl p-5 border border-white/10 space-y-5">
                
                {/* 1. Gênero & Faixa Etária */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-400" /> Segmentação por Gênero
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl">
                      {[
                        { id: 'all', label: 'Todos' },
                        { id: 'female', label: 'Mulheres' },
                        { id: 'male', label: 'Homens' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setGender(item.id as any)}
                          className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            gender === item.id
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-purple-400" /> Faixa Etária Mapeada
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl">
                      {[
                        { id: '18-35', label: '18 - 35' },
                        { id: '25-54', label: '25 - 54' },
                        { id: '35-65', label: '35 - 65+' }
                      ].map((age) => (
                        <button
                          key={age.id}
                          onClick={() => setAgeRange(age.id)}
                          className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                            ageRange === age.id
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Raio / Bairro e Cidades */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA800]" /> Raio, Bairro & Região do Rio
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Tijuca & Maracanã',
                      'Vila Isabel & Grajaú',
                      'Barra da Tijuca',
                      'Recreio dos Bandeirantes',
                      'Jacarepaguá (Freguesia/Taquara)'
                    ].map((neighborhood) => (
                      <button
                        key={neighborhood}
                        onClick={() => setSelectedNeighborhood(neighborhood)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          selectedNeighborhood === neighborhood
                            ? 'bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/20'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Radio className="w-3 h-3" /> {neighborhood}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Interesses e Comportamentos de Compra */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#0080FF]" /> Interesses & Comportamento de Compra
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Compradores Envolvidos',
                      'Moradores Locais',
                      'Gastronomia & Delivery',
                      'Moda & Beleza',
                      'Saúde & Fitness',
                      'Imóveis & Reformas',
                      'Serviços Automotivos'
                    ].map((interest) => {
                      const selected = activeInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#0057FF]/30 text-[#0080FF] border border-[#0057FF]/60 font-semibold'
                              : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Calculated Target Audience Box */}
                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Público Potencial Estimado no Raio:</span>
                    <div className="text-lg font-mono font-black text-white">
                      ~{estimatedAudience.toLocaleString('pt-BR')} moradores qualificados
                    </div>
                  </div>
                  <div className="text-right sm:text-left text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-semibold">Gestão Ativa:</span> Ajuste de lances e 
                    exclusão de curiosos feito diariamente por humanos.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Segmentação a nível de rua e CEP</span>
              <span className="text-purple-400 font-medium">Meta Ads Pixel + CAPI</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* MÓDULO 5: TRANSPARÊNCIA & RELATÓRIO ANALÍTICO DE ROI */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0E1118] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  MÓDULO 05
                </span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white mb-2 uppercase">
                5. Transparência & Relatório de ROI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Ao contrário da panfletagem de papel, onde é impossível saber se leram ou jogaram fora, 
                você recebe um <strong>dossiê analítico completo</strong> com métricas reais ao final dos 7 dias.
              </p>

              {/* Dynamic Live Dashboard Mockup */}
              <div className="bg-black/50 rounded-2xl p-4 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Dossiê de Performance Final
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Status: Aprovado</span>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Alcance Local</div>
                    <div className="text-xl font-bold font-mono text-white mt-0.5">34.200</div>
                    <div className="text-[10px] text-emerald-400 mt-1">↑ Moradores únicos</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Taxa de Clique (CTR)</div>
                    <div className="text-xl font-bold font-mono text-[#FFA800] mt-0.5">3.2%</div>
                    <div className="text-[10px] text-slate-400 mt-1">3x acima da média</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Conversas WPP</div>
                    <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">78 Leads</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Direto no celular</div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Custo por Lead</div>
                    <div className="text-xl font-bold font-mono text-[#0080FF] mt-0.5">R$ 5,11</div>
                    <div className="text-[10px] text-slate-400 mt-1">Alta eficiência</div>
                  </div>
                </div>

                {/* Transparency bullet points */}
                <ul className="space-y-1.5 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Print do Gerenciador de Anúncios comprovando gasto real.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Relatório detalhado em PDF enviado direto no seu WhatsApp.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Auditoria completa</span>
              <span className="text-emerald-400 font-medium">ROI Mensurável</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. DYNAMIC CTA BANNER WITH NEON GLOW & PULSE */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-20 relative rounded-3xl p-[2px] bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-[#0057FF] shadow-[0_0_50px_rgba(255,107,0,0.25)]">
          <div className="rounded-[22px] bg-gradient-to-br from-[#0E121B] via-[#080B12] to-[#0E121B] p-8 sm:p-12 text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FFA800] text-xs font-mono font-bold uppercase tracking-wider border border-[#FF6B00]/30">
                <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> PACOTE COMPLETO PRONTO PARA ATIVAR
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                Leve o Pacote Aceleração 7D para o Seu Negócio
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                7 dias de veiculação ativa, verba de anúncios inclusa, criativo estático + vídeo de alta conversão, 
                segmentação por raio no Rio de Janeiro e relatório analítico de ROI.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto shrink-0">
              <button
                onClick={handleHireClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFA800] text-white font-display font-extrabold text-base uppercase tracking-wider shadow-[0_0_30px_rgba(255,107,0,0.45)] hover:shadow-[0_0_45px_rgba(255,107,0,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Ativar Meu Pacote 7D</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm border border-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                title="Tirar dúvidas com especialista no WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Dúvidas no WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
