import type { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApiClient {
  protected constructor(protected readonly request: APIRequestContext) {}

  protected async parseJson<T>(response: APIResponse): Promise<T> {
    return await response.json() as T;
  }
}