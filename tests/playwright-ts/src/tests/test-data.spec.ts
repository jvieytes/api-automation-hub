import { expect, test } from '@playwright/test';
import { TestDataClient } from '../clients/test-data-client.js';
import type { ApiEnvelope, ResetResponse } from '../core/types.js';

test.describe('Test Data API', () => {
  test('Debe resetear correctamente la data de prueba', async ({ request }, testInfo) => {
    const testDataClient = new TestDataClient(request, testInfo);

    const response = await testDataClient.resetData();
    const body = await response.json() as ApiEnvelope<ResetResponse>;

    expect(response.status()).toBe(200);
    expect(body.response.total).toBeGreaterThanOrEqual(2);
  });
});