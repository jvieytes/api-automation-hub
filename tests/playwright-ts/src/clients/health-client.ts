import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class HealthClient extends BaseApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async getHealth(): Promise<APIResponse> {
    await this.attachRequest('Get Health', 'GET', Endpoints.health);

    const response = await this.request.get(Endpoints.health);

    await this.attachResponse('Get Health', response);
    return response;
  }
}