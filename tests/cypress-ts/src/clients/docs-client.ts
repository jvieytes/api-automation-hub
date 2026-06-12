import { Endpoints } from '../core/endpoints';
import { BaseApiClient } from './base-api-client';

export class DocsClient extends BaseApiClient {
    getDocs(): Cypress.Chainable<Cypress.Response<string>> {
        return this.execute(
            'Get Swagger Documentation',
            'GET',
            Endpoints.docs
        );
    }
}