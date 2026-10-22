import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDigitalReach, BUSINESS_NICHES } from './calculator';

test('calculateDigitalReach returns valid metrics for standard R$ 399 package', () => {
  const result = calculateDigitalReach(399, 'restaurante');
  
  assert.ok(result.monthlyReachMin > 10000, 'Min reach should be > 10k');
  assert.ok(result.monthlyReachMax > result.monthlyReachMin, 'Max reach should be > Min reach');
  assert.ok(result.estimatedClicksMin > 0, 'Clicks min should be > 0');
  assert.ok(result.estimatedWhatsappChatsMin > 0, 'WhatsApp chats should be > 0');
  assert.ok(result.trashWasteFlyersEstimated > 1000, 'Paper flyer waste should be calculated');
});

test('calculateDigitalReach clamps minimum budget safely', () => {
  const resultLow = calculateDigitalReach(50, 'clinica');
  const resultHundred = calculateDigitalReach(100, 'clinica');
  
  assert.equal(resultLow.monthlyReachMin, resultHundred.monthlyReachMin);
});

test('niches list is populated with RJ relevant sectors', () => {
  assert.ok(BUSINESS_NICHES.length >= 6);
  const ids = BUSINESS_NICHES.map(n => n.id);
  assert.ok(ids.includes('restaurante'));
  assert.ok(ids.includes('clinica'));
  assert.ok(ids.includes('varejo'));
});
