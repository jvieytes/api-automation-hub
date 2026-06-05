import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { ApiEvidence } from '../core/api-evidence.js';

export abstract class BaseApiClient {
  protected constructor(
    protected readonly request: APIRequestContext,
    protected readonly testInfo: TestInfo
  ) {}

  protected async attachRequest(
    name: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body?: unknown
  ): Promise<void> {
    await ApiEvidence.attachRequest({
      testInfo: this.testInfo,
      name,
      method,
      url,
      body
    });
  }

  protected async attachResponse(name: string, response: APIResponse): Promise<void> {
    await ApiEvidence.attachResponse({
      testInfo: this.testInfo,
      name,
      response
    });
  }

  protected async parseJson<T>(response: APIResponse): Promise<T> {
    return await response.json() as T;
  }
}