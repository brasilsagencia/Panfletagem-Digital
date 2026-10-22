import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Trash2, 
  Smartphone, 
  MessageCircle, 
  CheckCircle,
  Flame,
  ArrowRight
} from 'lucide-react';

interface ExplainerVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: () => void;
}

interface Scene {
  id: number;
  title: string;
  duration: number;
  location: string;
  description: string;
  visualType: 'paper_waste' | 'mobile_attention' | 'geo_radar' | 'whatsapp_sales';
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: 'O Velho Jeito: O Panfleto no Chão',
    duration: 15,
    location: 'Praça Saens Peña & Rua 28 de Setembro (Vila Isabel / Tijuca)',
    description: 'Você paga impressão cara, contrata distribuidores... e 80% dos panfletos vão direto para a calçada, bueiros e lixeiras sem ninguém ler.',
    visualType: 'paper_waste'
  },
  {
    id: 2,
    title: 'Para Onde os Olhos do Seu Cliente Estão Olhando?',
    duration: 15,
    location: 'Av. das Américas (Barra) & Boulevard 28 de Setembro',
    description: 'Ninguém mais olha folheto de papel. O morador do seu bairro está com os olhos fixos na tela do celular rolando o feed do Instagram e Facebook.',
    visualType: 'mobile_attention'
  },
  {
    id: 3,
    title: 'A Tecnologia da Panfletagem Digital',
    duration: 15,
    location: 'Raio de 1km a 5km da sua porta (Rio de Janeiro)',
    description: 'Traçamos um raio cirúrgico ao redor da sua loja. O anúncio aparece somente para quem mora, trabalha e consome exatamente na sua vizinhança.',
    visualType: 'geo_radar'
  },
  {
    id: 4,
    title: 'A Conversão Imediata: Clientes no WhatsApp',
    duration: 15,
    location: 'Seu WhatsApp de Vendas',
    description: 'Com apenas 1 toque na tela, o morador do seu bairro inicia uma conversa direta com você no WhatsApp, pronto para fazer um pedido ou agendamento!',
    visualType: 'whatsapp_sales'
  }
];

export const ExplainerVideoModal: React.FC<ExplainerVideoModalProps> = ({
  isOpen,
  onClose,
  onSelectPackage
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const totalDuration = 60;

  useEffect(() => {
    if (!isOpen) {
      setCurrentTime(0);
      setCurrentSceneIndex(0);
      setIsPlaying(true);
      return;
    }

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          const next = prev + 1;
          const sceneIndex = Math.min(3, Math.floor(next / 15));
          setCurrentSceneIndex(sceneIndex);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentScene = SCENES[currentSceneIndex];
  const progressPercent = (currentTime / totalDuration) * 100;

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    const sceneIndex = Math.min(3, Math.floor(seconds / 15));
    setCurrentSceneIndex(sceneIndex);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#090F1C] border border-[#FF6B00]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(255,107,0,0.25)] flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 bg-[#0C1424] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            <h3 id="video-modal-title" className="text-sm sm:text-base font-display font-bold text-white flex items-center gap-2">
              <span>Vídeo Explicativo Cinemático</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FFA800] border border-[#FF6B00]/30 hidden sm:inline-block">
                60 Segundos
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar vídeo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Simulator Area */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>

          {currentScene.visualType === 'paper_waste' && (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center shadow-2xl shadow-rose-900/50">
                  <Trash2 className="w-12 h-12 text-rose-400 animate-bounce" />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-rose-600 text-white text-[11px] font-black rounded-md uppercase">
                  80% no lixo
                </span>
              </div>
              <div className="max-w-lg space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                  <MapPin className="w-3.5 h-3.5" /> Praça Saens Peña & Rua 28 de Setembro
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white">
                  O PANFLETO DE PAPEL VIROU LIXO NA CALÇADA
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Você gasta centenas de reais com gráfica e distribuição. O pedestre pega por educação e joga na primeira lixeira ou no chão.
                </p>
              </div>
            </div>
          )}

          {currentScene.visualType === 'mobile_attention' && (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-[#0057FF]/30 border border-[#0057FF]/60 flex items-center justify-center shadow-2xl shadow-[#0057FF]/40">
                  <Smartphone className="w-12 h-12 text-[#60A5FA] animate-pulse" />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-[#0057FF] text-white text-[11px] font-black rounded-md uppercase">
                  100% Atenção
                </span>
              </div>
              <div className="max-w-lg space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  <MapPin className="w-3.5 h-3.5" /> Av. das Américas, Grajaú & Tijuca
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white">
                  ONDE ESTÁ A ATENÇÃO DO SEU CLIENTE?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Todo mundo caminha pelas ruas olhando para a tela do smartphone, navegando no feed do Instagram, Stories e Reels.
                </p>
              </div>
            </div>
          )}

          {currentScene.visualType === 'geo_radar' && (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#FF6B00] animate-radar absolute"></div>
                <div className="w-20 h-20 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00] flex items-center justify-center shadow-2xl shadow-[#FF6B00]/40">
                  <MapPin className="w-10 h-10 text-[#FFA800]" />
                </div>
              </div>
              <div className="max-w-lg space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FFA800] text-xs font-bold border border-[#FF6B00]/30">
                  <span>⚡ Raio Inteligente de 1km a 5km</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white">
                  PANFLETAGEM DIGITAL: ENTREGA NAS TELAS LOCAIS
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Definimos o seu bairro (Vila Isabel, Tijuca, Grajaú, Jacarepaguá, Barra, Recreio) e mostramos seu anúncio para quem mora e consome ali.
                </p>
              </div>
            </div>
          )}

          {currentScene.visualType === 'whatsapp_sales' && (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                  <MessageCircle className="w-12 h-12 text-emerald-400 animate-pulse" />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-emerald-500 text-black text-[11px] font-black rounded-md uppercase">
                  Vendas no Zap
                </span>
              </div>
              <div className="max-w-lg space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <CheckCircle className="w-3.5 h-3.5" /> 1 Toque para Conversar
                </div>
                <h4 className="text-xl sm:text-2xl font-display font-black text-white">
                  CLIENTES QUALIFICADOS FALANDO DIRETO COM VOCÊ
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  O morador não precisa digitar seu número. Ele clica no anúncio e cai direto na sua conversa pronto para comprar!
                </p>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-slate-300 border border-white/10">
            Cena {currentSceneIndex + 1}/4 • 00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 01:00
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="p-4 sm:p-5 bg-[#0C1424] border-t border-white/10 space-y-3">
          <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FFA800] to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] sm:text-xs">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => handleSeek(idx * 15)}
                className={`py-1.5 px-1 rounded-lg border transition-all truncate cursor-pointer ${
                  currentSceneIndex === idx
                    ? 'bg-[#FF6B00]/20 text-[#FFA800] border-[#FF6B00]/50 font-bold'
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {scene.id}. {scene.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-slate-200 transition-colors shadow-md cursor-pointer"
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Reiniciar vídeo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title={soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <span className="text-xs text-slate-400 hidden md:inline">
                {soundEnabled ? '🔊 Narração em Português ativada' : 'Sem áudio'}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectPackage();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>Quero Ativar no Meu Bairro (R$ 399)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
