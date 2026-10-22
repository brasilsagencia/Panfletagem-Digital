/**
 * Mini-CRM and WhatsApp routing logic for Brasils Agência Digital
 */

export interface Lead {
  id: string;
  createdAt: string;
  companyName: string;
  segment: string;
  neighborhood: string;
  clientName: string;
  whatsapp: string;
  status: 'novo' | 'em_contato' | 'proposta_enviada' | 'fechado';
  packageChosen: string;
  priceBRL: number;
  utmSource?: string;
  notes?: string;
}

export const TARGET_NEIGHBORHOODS = [
  'Vila Isabel',
  'Tijuca / Maracanã',
  'Grajaú',
  'Alto da Boa Vista',
  'Jacarepaguá',
  'Barra da Tijuca',
  'Recreio',
  'Outro bairro do RJ'
] as const;

export type NeighborhoodOption = typeof TARGET_NEIGHBORHOODS[number];

export const AGENCY_WHATSAPP_NUMBER = '5521999999999';

export function formatBRPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function isValidBRPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function generateWhatsAppLink(
  companyName: string,
  neighborhood: string,
  agencyPhone: string = AGENCY_WHATSAPP_NUMBER
): string {
  const cleanCompany = companyName.trim() || 'meu negócio local';
  const cleanNeighborhood = neighborhood.trim() || 'Rio de Janeiro';
  
  const text = `Olá, equipe da Brasils Agência Digital! Preenchi o formulário na página de Panfletagem Digital. Meu negócio é ${cleanCompany}, atuo no bairro ${cleanNeighborhood} e quero ativar o pacote de R$ 399 para atrair mais clientes!`;
  
  const cleanPhone = agencyPhone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

const CRM_STORAGE_KEY = 'brasils_panfletagem_crm_leads_v1';

export const INITIAL_DEMO_LEADS: Lead[] = [
  {
    id: 'lead-1',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    companyName: 'Bistrô Varnhagen',
    segment: 'Restaurante / Bar / Delivery',
    neighborhood: 'Tijuca / Maracanã',
    clientName: 'Eduardo Silveira',
    whatsapp: '(21) 98765-4321',
    status: 'fechado',
    packageChosen: 'Pacote Aceleração Local',
    priceBRL: 399,
    notes: 'Campanha ativa na Praça Varnhagen. 14 novos pedidos no primeiro final de semana.'
  },
  {
    id: 'lead-2',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    companyName: 'Studio Pilates Boulevard',
    segment: 'Academia / Pilates / Crossfit',
    neighborhood: 'Vila Isabel',
    clientName: 'Camila Peixoto',
    whatsapp: '(21) 99123-5566',
    status: 'em_contato',
    packageChosen: 'Pacote Aceleração Local',
    priceBRL: 399,
    notes: 'Quer focar nos prédios da 28 de Setembro e Teodoro da Silva.'
  },
  {
    id: 'lead-3',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    companyName: 'Pet & Vet Grajaú',
    segment: 'Prestador de Serviços / Reforma',
    neighborhood: 'Grajaú',
    clientName: 'Rodrigo Fontes',
    whatsapp: '(21) 98456-7890',
    status: 'novo',
    packageChosen: 'Pacote Aceleração Local',
    priceBRL: 399,
    notes: 'Foco no raio de 3km ao redor da Praça Edmundo Rego.'
  },
  {
    id: 'lead-4',
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    companyName: 'Dra. Mariana Estética Avançada',
    segment: 'Estética / Beleza / Barbearia',
    neighborhood: 'Barra da Tijuca',
    clientName: 'Mariana Drummond',
    whatsapp: '(21) 97654-1122',
    status: 'fechado',
    packageChosen: 'Pacote Aceleração Local',
    priceBRL: 399,
    notes: 'Condomínios da Av. das Américas e Jardim Oceânico.'
  }
];

export function getStoredLeads(): Lead[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_LEADS;
  try {
    const raw = localStorage.getItem(CRM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_LEADS;
  } catch (err) {
    console.error('Failed to read CRM leads from localStorage', err);
    return INITIAL_DEMO_LEADS;
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'packageChosen' | 'priceBRL'>): Lead {
  const newLead: Lead = {
    ...leadData,
    id: 'lead-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'novo',
    packageChosen: 'Pacote Aceleração Local',
    priceBRL: 399
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredLeads();
      const updated = [newLead, ...existing];
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save lead', err);
    }
  }

  return newLead;
}

export function updateLeadStatus(leadId: string, status: Lead['status']): Lead[] {
  if (typeof window === 'undefined') return [];
  const leads = getStoredLeads().map(l => l.id === leadId ? { ...l, status } : l);
  localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(leads));
  return leads;
}

export function exportLeadsToCSV(leads: Lead[]): string {
  const headers = ['ID', 'Data/Hora', 'Empresa', 'Segmento', 'Bairro', 'Nome Contato', 'WhatsApp', 'Status', 'Pacote', 'Preço (R$)'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString('pt-BR')}"`,
    `"${l.companyName.replace(/"/g, '""')}"`,
    `"${l.segment.replace(/"/g, '""')}"`,
    `"${l.neighborhood.replace(/"/g, '""')}"`,
    `"${l.clientName.replace(/"/g, '""')}"`,
    `"${l.whatsapp}"`,
    `"${l.status}"`,
    `"${l.packageChosen}"`,
    `"${l.priceBRL}"`
  ]);

  return [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
}
