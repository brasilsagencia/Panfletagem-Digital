import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Store,
  Radio
} from 'lucide-react';

export const PhoneMockup3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(6);
  const [rotateY, setRotateY] = useState<number>(-8);
  const [likes, setLikes] = useState<number>(342);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [activeZone, setActiveZone] = useState<string>('Tijuca & Saens Peña');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const degX = -(y / (rect.height / 2)) * 12;
    const degY = (x / (rect.width / 2)) * 14;
    setRotateX(degX);
    setRotateY(degY);
  };

  const handleMouseLeave = () => {
    setRotateX(6);
    setRotateY(-8);
  };

  const toggleLike = () => {
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
    setHasLiked(!hasLiked);
  };

  const zones = ['Tijuca & Saens Peña', 'Vila Isabel (28 Setembro)', 'Barra da Tijuca', 'Jacarepaguá'];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto perspective-1000 py-6 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] bg-gradient-to-tr from-[#0057FF]/30 via-[#FF6B00]/25 to-[#FFA800]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Floating 3D Badge: Reach Indicator */}
      <div 
        className="absolute -top-3 -left-4 sm:-left-8 z-30 glass-card px-3.5 py-2.5 rounded-2xl border border-white/15 shadow-xl shadow-black/50 flex items-center gap-2.5 animate-float"
        style={{ transform: `translateZ(40px) rotate(-3deg)` }}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0057FF] to-[#0080FF] flex items-center justify-center text-white shadow-md shadow-[#0057FF]/40">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Impacto em Tempo Real</div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            +4.820 moradores ativos
          </div>
        </div>
      </div>

      {/* Floating 3D Badge: WhatsApp Direct Conversion */}
      <div 
        className="absolute -bottom-4 -right-4 sm:-right-8 z-30 glass-card px-4 py-3 rounded-2xl border border-white/15 shadow-xl shadow-black/50 flex items-center gap-3 animate-float"
        style={{ animationDelay: '1.5s', transform: `translateZ(50px) rotate(2deg)` }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/40">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Novo Lead WhatsApp</div>
          <div className="text-xs font-bold text-white">"Gostaria de ver o cardápio!"</div>
          <div className="text-[10px] text-slate-400">Cliente a 850m da sua loja</div>
        </div>
      </div>

      {/* Main 3D Phone Chassis */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Smartphone Hardware Frame */}
        <div className="relative mx-auto w-[290px] sm:w-[320px] rounded-[42px] p-3 bg-gradient-to-b from-[#242b3b] via-[#121927] to-[#0d131f] border-[2px] border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(255,107,0,0.15)]">
          
          {/* Inner bezel with reflections */}
          <div className="relative rounded-[34px] bg-[#070b14] overflow-hidden border border-white/10 text-slate-200">
            
            {/* Phone Speaker & Dynamic Island Notch */}
            <div className="pt-2 pb-1.5 px-6 flex items-center justify-between text-[11px] text-slate-400 bg-[#090e1a]">
              <span>12:45</span>
              <div className="w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span className="w-4 h-2 rounded-sm border border-slate-400 flex items-center p-0.5">
                  <span className="w-2 h-full bg-slate-300"></span>
                </span>
              </div>
            </div>

            {/* App Header (Instagram / Social Feed Mock) */}
            <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between bg-[#0a101f]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#0057FF] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-[#070b14] flex items-center justify-center text-[10px] font-bold text-white">
                    <Store className="w-3.5 h-3.5 text-[#FFA800]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-xs font-bold text-white tracking-tight">SUA MARCA AQUI</span>
                    <CheckCircle2 className="w-3 h-3 text-[#0080FF]" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <span>Patrocinado</span>
                    <span>•</span>
                    <span className="text-[#FFA800] font-medium flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {activeZone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[10px] bg-[#FF6B00]/20 text-[#FF9500] px-1.5 py-0.5 rounded font-semibold border border-[#FF6B00]/30">
                  RAIO ATIVO
                </span>
              </div>
            </div>

            {/* Main Creative Ad Visual (The Digital Flyer) */}
            <div className="relative aspect-square w-full bg-gradient-to-br from-[#0c162d] via-[#101b33] to-[#1e102e] flex flex-col justify-between p-4 overflow-hidden border-y border-white/5">
              <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF6B00]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0057FF]/30 rounded-full blur-2xl"></div>

              {/* Holographic Radar Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                  <Radio className="w-3 h-3 text-[#FF6B00] animate-pulse" /> Panfletagem Digital RJ
                </span>
                <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md font-mono">
                  Raio: 3.5 km
                </span>
              </div>

              {/* Creative Banner Content */}
              <div className="relative z-10 text-center my-auto py-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black font-display font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FF6B00]/40 mb-2">
                  DESTAQUE NO BAIRRO
                </div>
                <h4 className="font-display font-black text-lg text-white leading-tight uppercase drop-shadow-md">
                  SEU PRODUTO OU SERVIÇO NA TELA CERTA
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 max-w-[210px] mx-auto leading-relaxed">
                  Moradores de <span className="text-[#FFA800] font-semibold">{activeZone}</span> vendo sua oferta no Instagram & Facebook.
                </p>

                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#FFA800]/40 text-[#FFA800] text-[11px] font-bold">
                  <Sparkles className="w-3 h-3" /> Clique abaixo e fale no WhatsApp
                </div>
              </div>

              {/* In-Feed Call To Action Button */}
              <a
                href="#formulario"
                className="relative z-10 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" /> Falar no WhatsApp
                </span>
                <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded uppercase font-semibold">1 Toque</span>
              </a>
            </div>

            {/* Social Engagement Actions */}
            <div className="p-3 bg-[#080d19]">
              <div className="flex items-center justify-between text-slate-300 mb-2">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={toggleLike}
                    className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="text-[11px] font-semibold">{likes}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px] text-slate-400">48</span>
                  </div>
                  <Send className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <Bookmark className="w-4 h-4 text-slate-400" />
              </div>

              <div className="text-[11px] text-slate-300 leading-snug">
                <strong className="text-white font-semibold">suamarca.oficial</strong> Estamos atendendo hoje em {activeZone} com entrega rápida e condições exclusivas! 🛵💨
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
                <span className="text-slate-400 font-medium whitespace-nowrap">Mudar Raio:</span>
                {zones.map(z => (
                  <button
                    key={z}
                    onClick={() => setActiveZone(z)}
                    className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      activeZone === z
                        ? 'bg-[#FF6B00] text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {z.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
