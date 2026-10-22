import React, { useState } from 'react';
import { 
  Trash2, 
  Sparkles, 
  Check, 
  X, 
  AlertTriangle, 
  Smartphone, 
  Target, 
  BarChart3, 
  DollarSign, 
  TrendingDown,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

interface ComparisonSectionProps {
  onScrollToForm: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onScrollToForm }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [printedFlyers, setPrintedFlyers] = useState<number>(5000);

  const totalPhysicalCost = Math.round((printedFlyers / 1000) * 170);
  const wastedMoney = Math.round(totalPhysicalCost * 0.8);
  const wastedFlyersCount = Math.round(printedFlyers * 0.8);

  const criteria = [
    {
      title: 'Destino do investimento',
      icon: Trash2,
      paper: {
        highlight: '80% vai direto para a lixeira',
        details: 'Folhetos amassados nas calçadas, jogados em bueiros e lixeiras da Saens Peña e 28 de Setembro sem ninguém ler.',
        status: 'bad'
      },
      digital: {
        highlight: '100% entregue nas telas dos moradores',
        details: 'Exibido diretamente no feed de quem mora, consome ou trabalha no raio exato do seu comércio.',
        status: 'good'
      }
    },
    {
      title: 'Segmentação de público',
      icon: Target,
      paper: {
        highlight: 'Aleatória e sem critério',
        details: 'Entregue para qualquer pedestre que passa na rua: turistas, menores de idade ou pessoas que moram a 40 km dali.',
        status: 'bad'
      },
      digital: {
        highlight: 'Cirúrgica por bairro e interesses',
        details: 'Segmentada por bairro (Vila Isabel, Tijuca, Barra...), faixa etária, gênero e raio de 1km a 5km do seu CEP.',
        status: 'good'
      }
    },
    {
      title: 'Ação imediata do cliente',
      icon: MessageCircle,
      paper: {
        highlight: 'O cliente precisa digitar seu número',
        details: 'Fricção alta: a pessoa precisa salvar o contato, abrir o aplicativo e digitar para tentar falar com você (raramente acontece).',
        status: 'bad'
      },
      digital: {
        highlight: '1 toque e já cai no seu WhatsApp',
        details: 'Botão direto com link inteligente: um clique no feed abre a conversa imediatamente com mensagem pronta para fechar negócio.',
        status: 'good'
      }
    },
    {
      title: 'Métricas e transparência',
      icon: BarChart3,
      paper: {
        highlight: 'Impossível saber o resultado',
        details: 'Você nunca sabe se os 5.000 panfletos foram realmente entregues ou descartados pela equipe em um terreno baldio.',
        status: 'bad'
      },
      digital: {
        highlight: 'Relatório exato e transparente',
        details: 'Painel com dados oficiais de quantas pessoas viram seu anúncio, quantas clicaram e o custo exato por visualização.',
        status: 'good'
      }
    },
    {
      title: 'Custo-benefício real',
      icon: DollarSign,
      paper: {
        highlight: 'Alto custo recorrente de gráfica',
        details: 'R$ 800 a R$ 1.200 a cada lote (impressão cara + diárias de entregadores) sem nenhuma garantia de vendas.',
        status: 'bad'
      },
      digital: {
        highlight: 'Investimento previsível a partir de R$ 399',
        details: 'Retorno mensurável, artes profissionais inclusas e alcance de até 45.000 pessoas no seu bairro.',
        status: 'good'
      }
    }
  ];

  return (
    <section id="comparativo" className="py-20 bg-[#070C16] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0057FF]/10 text-[#0080FF] text-xs font-bold uppercase tracking-wider border border-[#0057FF]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> A Nova Era do Comércio Local
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            PANFLETO DE PAPEL <span className="text-slate-500 font-light">VS.</span> <span className="text-gradient-orange">PANFLETAGEM DIGITAL</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Entenda por que comércios de Vila Isabel, Tijuca, Grajaú e Barra abandonaram as gráficas e multiplicaram seus clientes nas redes sociais.
          </p>

          <div className="mt-6 inline-flex p-1 rounded-xl bg-[#0C1424] border border-white/10">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visão Cards Lado a Lado
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tabela Completa
            </button>
          </div>
        </div>

        {/* View Mode: Side by Side Cards */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Card 1: Panfleto Físico de Papel */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#120B10] border border-rose-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-rose-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <Trash2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-rose-400 uppercase tracking-widest font-black">Método Ultrapassado</span>
                      <h3 className="text-xl font-display font-extrabold text-white">Panfleto Físico de Papel</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 text-xs font-bold">
                    80% Desperdício
                  </span>
                </div>

                <div className="space-y-6 pt-6">
                  {criteria.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-rose-400 font-bold mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-sm font-semibold text-slate-200">
                          {item.paper.highlight}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {item.paper.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-rose-500/10 bg-rose-950/20 -mx-6 -mb-6 p-6 rounded-b-3xl">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Resultado comum: muito lixo gerado na sua rua e quase nenhum cliente novo.</span>
                </div>
              </div>
            </div>

            {/* Card 2: Panfletagem Digital Brasils */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0C1527] border-2 border-[#FF6B00]/50 shadow-[0_0_40px_rgba(255,107,0,0.2)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0057FF]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FFA800] flex items-center justify-center text-white shadow-lg shadow-[#FF6B00]/40">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#FFA800] uppercase tracking-widest font-black">Tecnologia Exclusiva</span>
                      <h3 className="text-xl font-display font-extrabold text-white">Panfletagem Digital Brasils</h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    100% no Alvo
                  </span>
                </div>

                <div className="space-y-6 pt-6">
                  {criteria.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-[#FFA800] font-bold mb-0.5">
                          {item.title}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {item.digital.highlight}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.digital.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={onScrollToForm}
                  className="w-full py-3.5 px-6 rounded-2xl font-display font-extrabold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#FF6B00] via-[#FF8500] to-[#FFA800] hover:brightness-110 shadow-lg shadow-[#FF6B00]/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Quero Panfletagem Digital no Meu Bairro</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0C1424]">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/60">
                  <th className="p-4 sm:p-5 font-display font-bold text-slate-300 uppercase text-xs">Critério</th>
                  <th className="p-4 sm:p-5 font-display font-bold text-rose-400 uppercase text-xs">Panfleto Físico de Papel</th>
                  <th className="p-4 sm:p-5 font-display font-bold text-[#FFA800] uppercase text-xs">Panfletagem Digital Brasils</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {criteria.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-[#0080FF]" />
                      <span>{item.title}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-300">
                      <div className="font-medium text-rose-300">{item.paper.highlight}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.paper.details}</div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-200 bg-[#FF6B00]/5">
                      <div className="font-bold text-[#FFA800] flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        {item.digital.highlight}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">{item.digital.details}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Interactive Waste Calculator for Graphic Flyers */}
        <div className="mt-14 rounded-3xl p-6 sm:p-8 bg-[#090F1C] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" /> Simulador de Desperdício da Gráfica
              </span>
              <h3 className="text-lg sm:text-xl font-display font-black text-white mt-1">
                Quanto dinheiro você jogou na lixeira com papel?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Arraste o slider para ver o prejuízo médio que a impressão física costuma gerar no seu negócio:
              </p>
            </div>

            <div className="w-full md:w-72">
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Tiragem de panfletos:</span>
                <span className="text-[#FFA800] font-mono font-bold">{printedFlyers.toLocaleString('pt-BR')} panfletos</span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="1000"
                value={printedFlyers}
                onChange={(e) => setPrintedFlyers(Number(e.target.value))}
                className="w-full accent-[#FF6B00] bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
              <div className="text-xs text-slate-400">Custo Total de Gráfica + Equipe</div>
              <div className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                R$ {totalPhysicalCost.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20">
              <div className="text-xs text-rose-400">Dinheiro Perdido no Lixo (80%)</div>
              <div className="text-xl sm:text-2xl font-display font-black text-rose-400 mt-1">
                R$ {wastedMoney.toLocaleString('pt-BR')}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{wastedFlyersCount.toLocaleString('pt-BR')} panfletos amassados</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
              <div className="text-xs text-emerald-400">Na Panfletagem Digital</div>
              <div className="text-xl sm:text-2xl font-display font-black text-emerald-400 mt-1">
                100% de Aproveitamento
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Direto no WhatsApp por R$ 399</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
