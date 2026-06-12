import type {
    ApiEnvelope,
    HealthResponse
} from '../core/types';
import { Endpoints } from '../core/endpoints';
import { BaseApiClient } from './base-api-client';

export class HealthClient extends BaseApiClient {
    getHealth(): Cypress.Chainable<
        Cypress.Response<ApiEnvelope<HealthResponse>>
    > {
        return this.execute(
            'Get Health',
            'GET',
            Endpoints.health
        );
    }
}