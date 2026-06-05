import { expect, test } from '@playwright/test';
import { DocsClient } from '../clients/docs-client.js';

test.describe('Swagger Documentation API', () => {
  test('Debe cargar correctamente la documentación Swagger', async ({ request }) => {
    const docsClient = new DocsClient(request);

    const response = await docsClient.getDocs();
    const contentType = response.headers()['content-type'] ?? '';

    expect(response.status()).toBe(200);
    expect(contentType).toContain('text/html');
  });
});