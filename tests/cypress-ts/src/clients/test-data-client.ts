import type {
    ApiEnvelope,
    ResetResponse
} from '../core/types';
import { Endpoints } from '../core/endpoints';
import { BaseApiClient } from './base-api-client';

export class TestDataClient extends BaseApiClient {
    resetData(): Cypress.Chainable<
        Cypress.Response<ApiEnvelope<ResetResponse>>
    > {
        return this.execute(
            'Reset Test Data',
            'POST',
            Endpoints.testReset
        );
    }
}