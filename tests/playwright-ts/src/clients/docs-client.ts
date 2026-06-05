import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class DocsClient extends BaseApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async getDocs(): Promise<APIResponse> {
    await this.attachRequest('Get Docs', 'GET', Endpoints.docs);

    const response = await this.request.get(Endpoints.docs);

    await this.attachResponse('Get Docs', response);
    return response;
  }
}