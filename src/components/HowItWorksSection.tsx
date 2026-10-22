import React from 'react';
import { 
  Compass, 
  Palette, 
  Radio, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface HowItWorksSectionProps {
  onScrollToForm: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onScrollToForm }) => {
  const steps = [
    {
      step: '01',
      title: 'Mapeamento do Raio de Atuação',
      icon: Compass,
      description: 'Definimos as ruas e bairros onde estão seus clientes ideais (Vila Isabel, Tijuca, Grajaú, Maracanã, Alto da Boa Vista, Jacarepaguá, Barra da Tijuca ou Recreio).',
      highlight: 'Raio personalizado de 1 a 5km do seu endereço',
      color: 'from-[#0057FF] to-[#0080FF]'
    },
    {
      step: '02',
      title: 'Criação Visual de Alto Impacto',
      icon: Palette,
      description: 'Desenvolvemos a arte ou vídeo com design cinematográfico feito para prender o scroll no Instagram e Facebook, destacando sua oferta irresistível.',
      highlight: 'Design profissional e persuasivo incluso',
      color: 'from-[#0080FF] to-[#FF6B00]'
    },
    {
      step: '03',
      title: 'Disparo da Campanha Hiperlocal',
      icon: Radio,
      description: 'Configuramos a distribuição digital para impactar quem mora, trabalha ou transita na sua área de entrega ou atendimento no Rio de Janeiro.',
      highlight: 'Segmentação algorítmica de ponta',
      color: 'from-[#FF6B00] to-[#FF8500]'
    },
    {
      step: '04',
      title: 'Recebimento de Mensagens no WhatsApp',
      icon: MessageCircle,
      description: 'As pessoas clicam no panfleto digital e caem diretamente no seu canal de vendas prontas para comprar, sem intermediários ou taxas por pedido.',
      highlight: 'Leads quentes falando direto com você',
      color: 'from-[#FF8500] to-emerald-400'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-[#060A12] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0057FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6B00]/10 text-[#FFA800] text-xs font-bold uppercase tracking-wider border border-[#FF6B00]/20 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FF6B00]" /> Processo Descomplicado
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            COMO FUNCIONA A <span className="text-gradient-orange">PANFLETAGEM DIGITAL</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Em 4 etapas simples, seu negócio começa a ser visto por milhares de pessoas no seu bairro sem você precisar perder tempo com configurações técnicas.
          </p>
        </div>

        {/* 4-Step Grid with Holographic Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl p-6 bg-[#0C1424] border border-white/10 glass-card-hover flex flex-col justify-between group"
            >
              {/* Holographic Number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white/30 to-white/5 group-hover:from-[#FFA800] group-hover:to-[#FF6B00] transition-colors duration-300">
                  {item.step}
                </span>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-lg text-white group-hover:text-[#FFA800] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Step highlight */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item.highlight}</span>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0C1527] via-[#11192d] to-[#0C1527] border border-[#FF6B00]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FFA800] flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Ativação Rápida
            </div>
            <h4 className="text-lg sm:text-xl font-display font-black text-white">
              Sua campanha entra no ar em até 48 horas após o envio das informações!
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Cuidamos de tudo: desde a arte até a configuração da entrega nas redes.
            </p>
          </div>

          <button
            onClick={onScrollToForm}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] to-[#FFA800] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Iniciar no Meu Bairro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
