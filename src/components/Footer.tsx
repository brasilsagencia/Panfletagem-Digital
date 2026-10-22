import React from 'react';
import { 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp,
  Flame,
  Sparkles
} from 'lucide-react';
import { BrasilsLogo } from './BrasilsLogo';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToForm }) => {
  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Atendimento Rápido" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <div className="hidden sm:flex items-center gap-2 bg-[#0C1424]/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10 text-xs text-white shadow-xl shadow-black/40 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[11px] font-semibold">Tire suas dúvidas no WhatsApp</span>
        </div>

        <a
          href="https://wa.me/5521999999999?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20a%20Panfletagem%20Digital%20no%20meu%20bairro!"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer group"
          aria-label="Abrir WhatsApp para atendimento imediato"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </aside>

      {/* Main Footer */}
      <footer className="bg-[#04070D] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-4">
              <BrasilsLogo size="md" showSubtitle={true} />

              <p className="text-slate-400 leading-relaxed text-xs">
                Aceleradora de vendas e marketing de geolocalização para negócios locais no Rio de Janeiro. Substituímos o desperdício de papel por campanhas digitais ultra-segmentadas com foco em mensagens diretas no WhatsApp.
              </p>

              <div className="flex items-center gap-3 pt-2 text-slate-300">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Meta Business Verified
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#FFA800]" /> Suporte RJ
                </span>
              </div>
            </div>

            {/* Col 2: Regiões Atendidas RJ */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0080FF]" /> Bairros com Atendimento Prioritário:
              </div>
              <ul className="grid grid-cols-2 gap-2 text-slate-400 text-xs">
                <li className="hover:text-white transition-colors">• Vila Isabel (Boulevard)</li>
                <li className="hover:text-white transition-colors">• Tijuca (Saens Peña & Varnhagen)</li>
                <li className="hover:text-white transition-colors">• Grajaú (Edmundo Rego)</li>
                <li className="hover:text-white transition-colors">• Maracanã & UERJ</li>
                <li className="hover:text-white transition-colors">• Alto da Boa Vista</li>
                <li className="hover:text-white transition-colors">• Jacarepaguá (Freguesia/Taquara)</li>
                <li className="hover:text-white transition-colors">• Barra da Tijuca (Américas)</li>
                <li className="hover:text-white transition-colors">• Recreio dos Bandeirantes</li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-500">
                Atendemos também demais bairros da Região Metropolitana do Rio de Janeiro sob consulta.
              </div>
            </div>

            {/* Col 3: Contato & Ativação */}
            <div className="lg:col-span-4 space-y-3">
              <div className="font-display font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF6B00]" /> Pacote Panfletagem Digital
              </div>
              <p className="text-slate-400 text-xs">
                Inicie com o Pacote de Aceleração Local por <strong className="text-white">R$ 399,00</strong> com criativos inclusos e raio personalizado.
              </p>
              
              <div className="space-y-1.5 pt-1 text-slate-300 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: (21) 99999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0080FF]" />
                  <span>contato@brasils.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FFA800]" />
                  <span>Rio de Janeiro - RJ, Brasil</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onScrollToForm}
                  className="w-full py-2.5 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#FFA800] to-[#FF6B00] hover:brightness-110 shadow-md cursor-pointer"
                >
                  Ativar Campanha no Meu Bairro
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Legal Info */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Brasils Agência Digital. Todos os direitos reservados.
              <span className="block sm:inline sm:ml-2 text-slate-600">
                Panfletagem Digital™ é uma marca registrada para estratégias de tráfego hiperlocal.
              </span>
            </div>

            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>
    </>
  );
};
