/**
 * Utility functions for local advertising reach calculation and cost comparison
 */

export interface ReachMetrics {
  monthlyReachMin: number;
  monthlyReachMax: number;
  estimatedClicksMin: number;
  estimatedClicksMax: number;
  estimatedWhatsappChatsMin: number;
  estimatedWhatsappChatsMax: number;
  cpmAverage: number;
  flyerPrintCostEquivalent: number;
  trashWasteFlyersEstimated: number;
}

export interface NicheMultiplier {
  id: string;
  label: string;
  clickRate: number;
  engagementFactor: number;
  description: string;
}

export const BUSINESS_NICHES: NicheMultiplier[] = [
  {
    id: 'restaurante',
    label: 'Restaurante / Bar / Delivery',
    clickRate: 0.028,
    engagementFactor: 1.15,
    description: 'Alta conversão por raio de entrega (3 a 5km)'
  },
  {
    id: 'clinica',
    label: 'Clínica / Odonto / Saúde',
    clickRate: 0.022,
    engagementFactor: 1.05,
    description: 'Foco em agendamentos qualificados no bairro'
  },
  {
    id: 'varejo',
    label: 'Loja de Roupas / Varejo',
    clickRate: 0.025,
    engagementFactor: 1.1,
    description: 'Catálogo local e atração para loja física e WhatsApp'
  },
  {
    id: 'servicos',
    label: 'Prestador de Serviços / Reforma',
    clickRate: 0.021,
    engagementFactor: 1.0,
    description: 'Moradores buscando soluções rápidas na região'
  },
  {
    id: 'estetica',
    label: 'Estética / Beleza / Barbearia',
    clickRate: 0.03,
    engagementFactor: 1.2,
    description: 'Atração visual com ofertas de inauguração ou combos'
  },
  {
    id: 'academia',
    label: 'Academia / Pilates / Crossfit',
    clickRate: 0.024,
    engagementFactor: 1.08,
    description: 'Captação de alunos que moram a menos de 15 minutos'
  }
];

export function calculateDigitalReach(
  budgetBRL: number = 399,
  nicheId: string = 'restaurante'
): ReachMetrics {
  const safeBudget = Math.max(100, budgetBRL);
  const niche = BUSINESS_NICHES.find(n => n.id === nicheId) || BUSINESS_NICHES[0];

  const cpmMin = 8.5;
  const cpmMax = 13.5;
  const cpmAverage = (cpmMin + cpmMax) / 2;

  const monthlyReachMin = Math.round((safeBudget / cpmMax) * 1000 * niche.engagementFactor);
  const monthlyReachMax = Math.round((safeBudget / cpmMin) * 1000 * niche.engagementFactor);

  const estimatedClicksMin = Math.round(monthlyReachMin * niche.clickRate * 0.7);
  const estimatedClicksMax = Math.round(monthlyReachMax * niche.clickRate * 1.25);

  const estimatedWhatsappChatsMin = Math.max(8, Math.round(estimatedClicksMin * 0.18));
  const estimatedWhatsappChatsMax = Math.round(estimatedClicksMax * 0.32);

  const equivalentFlyers = Math.round(safeBudget / 0.16);
  const flyerPrintCostEquivalent = Math.round(equivalentFlyers * 0.16 + (equivalentFlyers / 1000) * 80);
  const trashWasteFlyersEstimated = Math.round(equivalentFlyers * 0.8);

  return {
    monthlyReachMin,
    monthlyReachMax,
    estimatedClicksMin,
    estimatedClicksMax,
    estimatedWhatsappChatsMin,
    estimatedWhatsappChatsMax,
    cpmAverage,
    flyerPrintCostEquivalent,
    trashWasteFlyersEstimated
  };
}
