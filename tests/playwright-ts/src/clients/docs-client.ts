import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class DocsClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getDocs(): Promise<APIResponse> {
    return await this.request.get(Endpoints.docs);
  }
}