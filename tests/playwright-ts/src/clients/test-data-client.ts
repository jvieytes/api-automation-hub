import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class TestDataClient extends BaseApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async resetData(): Promise<APIResponse> {
    await this.attachRequest('Reset Test Data', 'POST', Endpoints.testReset);

    const response = await this.request.post(Endpoints.testReset);

    await this.attachResponse('Reset Test Data', response);
    return response;
  }
}