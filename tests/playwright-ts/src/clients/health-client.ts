import type { APIRequestContext, APIResponse } from '@playwright/test';
import { Endpoints } from '../core/endpoints.js';
import { BaseApiClient } from './base-api-client.js';

export class HealthClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getHealth(): Promise<APIResponse> {
    return await this.request.get(Endpoints.health);
  }
}