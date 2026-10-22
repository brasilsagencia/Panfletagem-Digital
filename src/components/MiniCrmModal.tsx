import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Search, 
  Filter, 
  MessageCircle, 
  Building2, 
  MapPin, 
  Phone, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Users,
  Database
} from 'lucide-react';
import { Lead, updateLeadStatus, exportLeadsToCSV } from '../utils/crm';

interface MiniCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onLeadsChange: (updated: Lead[]) => void;
}

export const MiniCrmModal: React.FC<MiniCrmModalProps> = ({
  isOpen,
  onClose,
  leads,
  onLeadsChange
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('all');

  if (!isOpen) return null;

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    const updated = updateLeadStatus(leadId, newStatus);
    onLeadsChange(updated);
  };

  const handleExportCSV = () => {
    const csv = exportLeadsToCSV(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_panfletagem_brasils_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const matchSearch = 
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchNeighborhood = neighborhoodFilter === 'all' || l.neighborhood.includes(neighborhoodFilter);

    return matchSearch && matchStatus && matchNeighborhood;
  });

  const totalValue = leads.reduce((acc, curr) => acc + (curr.priceBRL || 399), 0);
  const closedCount = leads.filter(l => l.status === 'fechado').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-5xl bg-[#090F1C] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="crm-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0C1424] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0057FF] to-[#0080FF] flex items-center justify-center text-white shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="crm-title" className="text-base sm:text-lg font-display font-extrabold text-white flex items-center gap-2">
                <span>Mini-CRM de Leads • Brasils Agência Digital</span>
                <span className="text-xs bg-[#FF6B00]/20 text-[#FFA800] px-2 py-0.5 rounded-full border border-[#FF6B00]/30">
                  {leads.length} Leads
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Gerenciador interno de campanhas hiperlocais ativadas no Rio de Janeiro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-1.5 cursor-pointer"
              title="Exportar para Excel / Google Sheets"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label="Fechar painel CRM"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#070B14] border-b border-white/5">
          <div className="p-3 rounded-xl bg-[#0C1424] border border-white/5">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-[#0080FF]" /> Total Capturado
            </div>
            <div className="text-xl font-display font-black text-white mt-0.5">{leads.length} leads</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0C1424] border border-white/5">
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Clientes Ativos
            </div>
            <div className="text-xl font-display font-black text-emerald-400 mt-0.5">{closedCount} contratos</div>
          </div>

          <div className="p-3 rounded-xl bg-[#0C1424] border border-white/5">
            <div className="text-[11px] text-[#FFA800] flex items-center gap-1">
              <Clock className="w-3 h-3" /> Em Atendimento
            </div>
            <div className="text-xl font-display font-black text-[#FFA800] mt-0.5">
              {leads.filter(l => l.status === 'em_contato' || l.status === 'novo').length} pendentes
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0C1424] border border-white/5">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-[#FF6B00]" /> Pipeline Potencial
            </div>
            <div className="text-xl font-display font-black text-white mt-0.5">
              R$ {totalValue.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="px-6 py-3 bg-[#0C1424] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por empresa, nome ou bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#070B14] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0080FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 text-slate-400">
              <Filter className="w-3 h-3" />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#070B14] border border-white/10 text-white cursor-pointer"
            >
              <option value="all">Todos</option>
              <option value="novo">Novos</option>
              <option value="em_contato">Em Contato</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>
        </div>

        {/* Leads Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Nenhum lead encontrado com os filtros atuais.
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const statusBadges = {
                novo: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                em_contato: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                proposta_enviada: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                fechado: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              };

              const directWa = `https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Olá ${lead.clientName}! Aqui é da equipe da Brasils Agência Digital referente à Panfletagem Digital para a ${lead.companyName} em ${lead.neighborhood}.`
              )}`;

              return (
                <div
                  key={lead.id}
                  className="rounded-2xl p-4 bg-[#0C1424] border border-white/5 hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#FFA800]" />
                        {lead.companyName}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({lead.segment.split('/')[0].trim()})
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusBadges[lead.status]}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-[#0080FF]" /> {lead.neighborhood}
                      </span>
                      <span className="flex items-center gap-1">
                        Contato: <strong className="text-slate-200">{lead.clientName}</strong>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {lead.whatsapp}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleDateString('pt-BR')} {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {lead.notes && (
                      <div className="text-[11px] text-slate-400 bg-black/30 p-1.5 rounded-lg border border-white/5">
                        💡 {lead.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                      className="px-2.5 py-1.5 rounded-lg bg-[#070B14] border border-white/10 text-xs text-slate-300 cursor-pointer"
                    >
                      <option value="novo">Novo</option>
                      <option value="em_contato">Em Contato</option>
                      <option value="fechado">Fechado</option>
                    </select>

                    <a
                      href={directWa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chamar no Zap</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0C1424] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Persistência local ativa em cache do navegador</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
