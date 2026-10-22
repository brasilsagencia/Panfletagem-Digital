import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'O que é a panfletagem digital?',
    answer: 'É uma estratégia de marketing local que substitui folhetos de papel por anúncios geolocalizados no Instagram e Facebook, exibidos exclusivamente para pessoas que vivem ou frequentam a região da sua empresa no Rio de Janeiro.'
  },
  {
    question: 'Quanto custa o serviço?',
    answer: 'O plano inicial estruturado pela Brasils Agência Digital custa R$ 399,00. Esse valor inclui o planejamento estratégico, a criação de artes profissionais com design de alto impacto e a configuração completa do raio de entrega nas redes sociais.'
  },
  {
    question: 'Em quanto tempo vejo os primeiros clientes no meu WhatsApp?',
    answer: 'Aprovados os criativos, a campanha entra no ar em até 48 horas. Como os anúncios são hiperlocais e mostram um botão direto de conversa, as primeiras mensagens de moradores costumam chegar logo nas primeiras horas de veiculação.'
  },
  {
    question: 'Vocês atendem apenas a Zona Norte e Zona Oeste?',
    answer: 'Nosso foco especializado de alta densidade atende prioritariamente Vila Isabel, Tijuca, Grajaú, Maracanã, Alto da Boa Vista, Jacarepaguá, Barra da Tijuca e Recreio dos Bandeirantes, mas nossa tecnologia de raio permite aplicação em qualquer bairro da capital fluminense.'
  },
  {
    question: 'Preciso ter conta profissional no Gerenciador de Anúncios da Meta?',
    answer: 'Não se preocupe! A Brasils Agência Digital cuida de toda a parte técnica, veiculação e otimização. Você não precisa entender de gerenciador de anúncios, apenas receber os clientes prontos para comprar no seu WhatsApp.'
  },
  {
    question: 'Como é feito o pagamento do pacote de R$ 399?',
    answer: 'O pagamento é feito via PIX ou cartão de crédito. Não há contratos de fidelidade de longo prazo ou mensalidades surpresa: você paga pelo pacote pronto e pode renovar ou expandir seu raio sempre que desejar.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#060A12] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0057FF]/10 text-[#0080FF] text-xs font-bold uppercase tracking-wider border border-[#0057FF]/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Dúvidas Frequentes
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            PERGUNTAS <span className="text-gradient-orange">FREQUENTES (FAQ)</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Respostas diretas e transparentes sobre como funciona a panfletagem digital para o comércio do Rio de Janeiro.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0C1424] border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-white text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#FF6B00]/20 text-[#FFA800]' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0C1424] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-display font-bold text-white text-sm">Ficou com alguma dúvida específica do seu bairro?</div>
            <div className="text-xs text-slate-400">Nossa equipe do Rio de Janeiro responde em minutos no WhatsApp.</div>
          </div>
          <a
            href="https://wa.me/5521990089982?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20a%20Panfletagem%20Digital."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Especialista</span>
          </a>
        </div>

      </div>
    </section>
  );
};
