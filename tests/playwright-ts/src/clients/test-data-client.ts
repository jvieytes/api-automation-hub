import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class TestDataClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async resetData(): Promise<APIResponse> {
    return await this.request.post(Endpoints.testReset);
  }
}