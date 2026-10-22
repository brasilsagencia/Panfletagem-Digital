import test from 'node:test';
import assert from 'node:assert/strict';
import { generateWhatsAppLink, formatBRPhone, isValidBRPhone, exportLeadsToCSV, Lead } from './crm';

test('generateWhatsAppLink generates expected message and encoded url', () => {
  const link = generateWhatsAppLink('Pizzaria Tijucana', 'Tijuca / Maracanã', '5521990089982');
  
  assert.ok(link.startsWith('https://wa.me/5521990089982?text='), 'Must point to agency phone');
  assert.ok(link.includes(encodeURIComponent('Pizzaria Tijucana')), 'Must contain encoded company name');
  assert.ok(link.includes(encodeURIComponent('Tijuca / Maracanã')), 'Must contain encoded neighborhood');
  assert.ok(link.includes(encodeURIComponent('R$ 399')), 'Must mention R$ 399 package');
});

test('formatBRPhone formats standard Brazilian cellphones correctly', () => {
  assert.equal(formatBRPhone('21988887777'), '(21) 98888-7777');
  assert.equal(formatBRPhone('2133445566'), '(21) 3344-5566');
});

test('isValidBRPhone validates digits count', () => {
  assert.equal(isValidBRPhone('(21) 98888-7777'), true);
  assert.equal(isValidBRPhone('21988887777'), true);
  assert.equal(isValidBRPhone('12345'), false);
  assert.equal(isValidBRPhone(''), false);
});

test('exportLeadsToCSV generates valid CSV content', () => {
  const mockLeads: Lead[] = [
    {
      id: 'test-1',
      createdAt: '2026-10-21T12:00:00Z',
      companyName: 'Padaria Imperial',
      segment: 'Restaurante / Bar / Delivery',
      neighborhood: 'Vila Isabel',
      clientName: 'Contato de teste',
      whatsapp: '(00) 00000-0000',
      status: 'novo',
      packageChosen: 'Pacote Aceleração Local',
      priceBRL: 399
    }
  ];

  const csv = exportLeadsToCSV(mockLeads);
  assert.ok(csv.includes('Padaria Imperial'));
  assert.ok(csv.includes('Vila Isabel'));
  assert.ok(csv.includes('399'));
});
