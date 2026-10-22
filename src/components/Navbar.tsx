import React, { useState, useEffect } from 'react';
import { MapPin, Database, Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { BrasilsLogo } from './BrasilsLogo';

interface NavbarProps {
  onOpenCrm: () => void;
  crmLeadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCrm, crmLeadCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-bar with active status */}
      <div className="bg-[#080E1C] border-b border-white/5 text-xs py-1.5 px-4 text-center text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              <strong className="text-slate-200">Campanhas ativas hoje:</strong> Vila Isabel, Tijuca, Grajaú, Jacarepaguá, Barra e Recreio
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-[#FFA800]">
              <Flame className="w-3.5 h-3.5" /> Pacote Promocional R$ 399
            </span>
            <button
              onClick={onOpenCrm}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-white/10 cursor-pointer"
              title="Acessar painel do Mini-CRM"
            >
              <Database className="w-3 h-3 text-[#0080FF]" />
              <span>Mini-CRM ({crmLeadCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060A12]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Brasils Logomark */}
          <a href="#" className="group">
            <BrasilsLogo size="md" showSubtitle={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('comparativo')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer"
            >
              Papel vs Digital
            </button>
            <button
              onClick={() => scrollToSection('cobertura')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0080FF]" /> Cobertura RJ
            </button>
            <button
              onClick={() => scrollToSection('pacote-7d')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer text-[#FFA800] font-bold flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> Pacote 7D
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer"
            >
              Calculadora de Alcance
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-[#FFA800] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCrm}
              className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 rounded-lg bg-slate-800/80 border border-white/10 hover:border-slate-500 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>CRM ({crmLeadCount})</span>
            </button>

            <button
              onClick={() => scrollToSection('formulario')}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFA800] hover:brightness-110 shadow-lg shadow-[#FF6B00]/25 hover:shadow-[#FF6B00]/40 group cursor-pointer"
            >
              <span className="relative z-10">Ativar Campanha no Meu Bairro</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0C1424] border-b border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3">
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="block w-full text-left py-2 text-slate-200 font-medium hover:text-[#FF6B00] cursor-pointer"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection('comparativo')}
              className="block w-full text-left py-2 text-slate-200 font-medium hover:text-[#FF6B00] cursor-pointer"
            >
              Panfleto de Papel vs Digital
            </button>
            <button
              onClick={() => scrollToSection('cobertura')}
              className="block w-full text-left py-2 text-slate-200 font-medium hover:text-[#FF6B00] cursor-pointer"
            >
              Cobertura RJ (Bairros)
            </button>
            <button
              onClick={() => scrollToSection('pacote-7d')}
              className="block w-full text-left py-2 text-[#FFA800] font-bold hover:text-white cursor-pointer"
            >
              🔥 Pacote Aceleração 7D Meta Ads
            </button>
            <button
              onClick={() => scrollToSection('calculadora')}
              className="block w-full text-left py-2 text-slate-200 font-medium hover:text-[#FF6B00] cursor-pointer"
            >
              Calculadora de Alcance Local
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left py-2 text-slate-200 font-medium hover:text-[#FF6B00] cursor-pointer"
            >
              Perguntas Frequentes (FAQ)
            </button>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCrm();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 text-slate-200 text-sm border border-white/10 cursor-pointer"
              >
                <Database className="w-4 h-4 text-[#0080FF]" /> Painel Mini-CRM ({crmLeadCount} Leads)
              </button>

              <button
                onClick={() => scrollToSection('formulario')}
                className="w-full py-3 rounded-full text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] to-[#FFA800] shadow-md shadow-[#FF6B00]/30 cursor-pointer"
              >
                Ativar Campanha no Meu Bairro
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
