import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Flame,
  Send
} from 'lucide-react';
import { 
  TARGET_NEIGHBORHOODS, 
  formatBRPhone, 
  isValidBRPhone, 
  generateWhatsAppLink, 
  saveLead, 
  Lead 
} from '../utils/crm';
import { BUSINESS_NICHES } from '../utils/calculator';

interface MultiStepFormSectionProps {
  initialNeighborhood?: string;
  initialBudget?: number;
  onLeadCreated: (newLead: Lead) => void;
}

export const MultiStepFormSection: React.FC<MultiStepFormSectionProps> = ({
  initialNeighborhood,
  initialBudget = 399,
  onLeadCreated
}) => {
  const [step, setStep] = useState<number>(1);
  const [companyName, setCompanyName] = useState<string>('');
  const [segment, setSegment] = useState<string>(BUSINESS_NICHES[0].label);
  const [neighborhood, setNeighborhood] = useState<string>(initialNeighborhood || 'Tijuca / Maracanã');
  const [customNeighborhood, setCustomNeighborhood] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (initialNeighborhood) {
      setNeighborhood(initialNeighborhood);
    }
  }, [initialNeighborhood]);

  const triggerConfetti = () => {
    // Zero-dependency canvas confetti explosion
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF6B00', '#FFA800', '#0057FF', '#0080FF', '#10B981', '#FFFFFF'];
    const particles = Array.from({ length: 80 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10,
      opacity: 1
    }));

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.vRotation;
        p.opacity -= 0.012;
        if (p.opacity > 0) {
          aliveCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        if (document.body.contains(canvas)) {
          document.body.removeChild(canvas);
        }
      }
    };
    render();
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!companyName.trim()) {
      setErrorMsg('Por favor, informe o nome do seu negócio.');
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = (selected: string) => {
    setErrorMsg('');
    setNeighborhood(selected);
    setStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }

    if (!isValidBRPhone(whatsapp)) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD (Ex: 21 98888-7777).');
      return;
    }

    setIsSubmitting(true);

    const targetBairro = neighborhood === 'Outro bairro do RJ' && customNeighborhood.trim()
      ? customNeighborhood.trim()
      : neighborhood;

    // 1. Save to embedded CRM
    const saved = saveLead({
      companyName: companyName.trim(),
      segment,
      neighborhood: targetBairro,
      clientName: clientName.trim(),
      whatsapp: formatBRPhone(whatsapp),
      utmSource: 'landing_page_direct'
    });

    onLeadCreated(saved);
    setSubmittedLead(saved);
    triggerConfetti();

    // 2. Prepare WhatsApp Link
    const waUrl = generateWhatsAppLink(companyName, targetBairro);

    setTimeout(() => {
      setIsSubmitting(false);
      // Attempt instant redirect / open in WhatsApp
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="formulario" className="py-20 bg-[#070C16] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#0057FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-[#FF6B00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/15 text-[#FFA800] text-xs font-bold uppercase tracking-wider border border-[#FF6B00]/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> Pacote Aceleração Local R$ 399
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            ATIVE SUA CAMPANHA <span className="text-gradient-orange">NO SEU BAIRRO</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Preencha os 3 passos rápidos abaixo. Seus dados são salvos com segurança e você é conectado diretamente ao nosso time no WhatsApp para iniciar em 48h!
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#0C1424] border-2 border-white/10 shadow-2xl relative">
          
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 1 ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/40' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Passo 1</div>
                <div className="text-xs font-bold text-white">Seu Negócio</div>
              </div>
            </div>

            <div className={`flex-1 h-0.5 mx-3 sm:mx-6 transition-colors ${step >= 2 ? 'bg-[#FF6B00]' : 'bg-slate-800'}`} />

            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 2 ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/40' : 'bg-slate-800 text-slate-400'
              }`}>
                {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : '2'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Passo 2</div>
                <div className="text-xs font-bold text-white">Bairro no RJ</div>
              </div>
            </div>

            <div className={`flex-1 h-0.5 mx-3 sm:mx-6 transition-colors ${step >= 3 ? 'bg-[#FF6B00]' : 'bg-slate-800'}`} />

            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= 3 ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black font-black' : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Passo 3</div>
                <div className="text-xs font-bold text-white">WhatsApp</div>
              </div>
            </div>
          </div>

          {/* Validation Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {errorMsg}
            </div>
          )}

          {/* SUCCESS MODAL / STATE */}
          {submittedLead ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2">
                  ✓ Dados Salvos no Mini-CRM com Sucesso!
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  Excelente, {submittedLead.clientName}!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mt-2">
                  Sua campanha para <strong className="text-white">{submittedLead.companyName}</strong> em <strong className="text-[#FFA800]">{submittedLead.neighborhood}</strong> está pré-configurada.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Pacote Selecionado:</span>
                  <span className="text-white font-bold">{submittedLead.packageChosen}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Investimento:</span>
                  <span className="text-[#FFA800] font-bold">R$ {submittedLead.priceBRL},00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>WhatsApp de Contato:</span>
                  <span className="text-white font-bold">{submittedLead.whatsapp}</span>
                </div>
              </div>

              {/* Direct WhatsApp fallback button */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppLink(submittedLead.companyName, submittedLead.neighborhood)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/40 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Abrir Conversa no WhatsApp Agora</span>
                </a>
                <p className="text-[11px] text-slate-400 mt-2">
                  Se a conversa não abriu automaticamente, clique no botão verde acima.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedLead(null);
                    setStep(1);
                    setCompanyName('');
                    setWhatsapp('');
                  }}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Preencher para outro negócio
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* PASSO 1: Nome do negócio e segmento */}
              {step === 1 && (
                <form onSubmit={handleNextStep1} className="space-y-6">
                  <div>
                    <label htmlFor="company-name" className="block text-xs uppercase tracking-wider font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#FFA800]" /> Qual o nome da sua empresa / loja? *
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      required
                      placeholder="Ex: Padaria Imperial, Barbearia 28, Clínica Sorriso"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="segment-select" className="block text-xs uppercase tracking-wider font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0080FF]" /> Qual o segmento do seu negócio?
                    </label>
                    <select
                      id="segment-select"
                      value={segment}
                      onChange={(e) => setSegment(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14] border border-white/15 text-white focus:outline-none focus:border-[#FF6B00] text-sm cursor-pointer"
                    >
                      {BUSINESS_NICHES.map((n) => (
                        <option key={n.id} value={n.label} className="bg-[#0C1424]">
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] via-[#FF9500] to-[#FF6B00] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Avançar para Escolher Bairro</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* PASSO 2: Região / Bairro do RJ */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-slate-200 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF6B00]" /> Em qual região/bairro do RJ você quer divulgar? *
                    </label>
                    <p className="text-xs text-slate-400 mb-4">
                      Clique no botão correspondente ao seu ponto de venda ou raio de atendimento:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TARGET_NEIGHBORHOODS.map((bairro) => {
                        const isSelected = neighborhood === bairro;
                        return (
                          <button
                            key={bairro}
                            type="button"
                            onClick={() => handleNextStep2(bairro)}
                            className={`p-3.5 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FFA800] text-black border-transparent shadow-lg shadow-[#FF6B00]/30 scale-102'
                                : 'bg-[#070B14] border-white/10 text-slate-300 hover:text-white hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/5'
                            }`}
                          >
                            <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#FF6B00]'}`} />
                            <span>{bairro}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {neighborhood === 'Outro bairro do RJ' && (
                    <div className="p-4 rounded-xl bg-[#070B14] border border-white/10">
                      <label htmlFor="custom-bairro" className="block text-xs text-slate-300 font-semibold mb-1">
                        Especifique o seu bairro ou CEP no Rio de Janeiro:
                      </label>
                      <input
                        id="custom-bairro"
                        type="text"
                        placeholder="Ex: Méier, Madureira, Botafogo, Flamengo, Ilha do Governador"
                        value={customNeighborhood}
                        onChange={(e) => setCustomNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0C1424] border border-white/20 text-white text-xs"
                      />
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] to-[#FF6B00] hover:brightness-110 shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Confirmar {neighborhood}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* PASSO 3: Nome do contato e WhatsApp */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#070B14] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Empresa: </span>
                      <strong className="text-white">{companyName}</strong>
                      <span className="text-slate-500"> • </span>
                      <span className="text-[#FFA800]">{neighborhood}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] text-[#0080FF] hover:underline cursor-pointer"
                    >
                      Alterar
                    </button>
                  </div>

                  <div>
                    <label htmlFor="client-name" className="block text-xs uppercase tracking-wider font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#FFA800]" /> Qual o seu nome completo? *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-whatsapp" className="block text-xs uppercase tracking-wider font-bold text-slate-200 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" /> Qual o seu WhatsApp de contato com DDD? *
                    </label>
                    <input
                      id="client-whatsapp"
                      type="tel"
                      required
                      placeholder="(21) 98888-7777"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatBRPhone(e.target.value))}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Enviaremos o briefing e as artes da campanha diretamente para este número.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Gravando no CRM & Abrindo Zap...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar e Abrir no WhatsApp</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Seus dados são 100% confidenciais e protegidos pela Brasils Agência Digital.</span>
                  </div>
                </form>
              )}
            </>
          )}

        </div>

      </div>
    </section>
  );
};
