import { expect, test } from '@playwright/test';
import { HealthClient } from '../clients/health-client.js';
import type { ApiEnvelope, HealthResponse } from '../core/types.js';

test.describe('Healthcheck API', () => {
  test('Debe retornar estado UP al consultar el healthcheck', async ({ request }, testInfo) => {
    const healthClient = new HealthClient(request, testInfo);

    const response = await healthClient.getHealth();
    const body = await response.json() as ApiEnvelope<HealthResponse>;

    expect(response.status()).toBe(200);
    expect(body.response.status).toBe('UP');
  });
});