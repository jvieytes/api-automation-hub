import type { APIResponse, TestInfo } from '@playwright/test';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface AttachRequestParams {
  testInfo: TestInfo;
  name: string;
  method: HttpMethod;
  url: string;
  body?: unknown;
  headers?: Record<string, string>;
}

interface AttachResponseParams {
  testInfo: TestInfo;
  name: string;
  response: APIResponse;
}

export class ApiEvidence {
  static async attachRequest(params: AttachRequestParams): Promise<void> {
    const evidence = {
      method: params.method,
      url: params.url,
      headers: params.headers ?? {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: params.body ?? null
    };

    await params.testInfo.attach(`Request - ${params.name}`, {
      body: this.toPrettyJsonBuffer(evidence),
      contentType: 'application/json'
    });
  }

  static async attachResponse(params: AttachResponseParams): Promise<void> {
    const responseBody = await this.safeResponseBody(params.response);

    const evidence = {
      status: params.response.status(),
      statusText: params.response.statusText(),
      ok: params.response.ok(),
      headers: params.response.headers(),
      body: responseBody
    };

    await params.testInfo.attach(`Response - ${params.name}`, {
      body: this.toPrettyJsonBuffer(evidence),
      contentType: 'application/json'
    });
  }

  private static async safeResponseBody(response: APIResponse): Promise<unknown> {
    const contentType = response.headers()['content-type'] ?? '';

    try {
      if (contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      return {
        message: 'No fue posible leer el body de la respuesta.',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  private static toPrettyJsonBuffer(value: unknown): Buffer {
    return Buffer.from(JSON.stringify(value, null, 2), 'utf-8');
  }
}