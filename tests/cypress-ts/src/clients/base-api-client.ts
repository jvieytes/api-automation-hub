import type { HttpMethod } from '../core/api-evidence';
import { ApiEvidence } from '../core/api-evidence';

export abstract class BaseApiClient {
    protected execute<TResponse>(
        name: string,
        method: HttpMethod,
        url: string,
        body?: Cypress.RequestBody
    ): Cypress.Chainable<Cypress.Response<TResponse>> {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        ApiEvidence.attachRequest({
            name,
            method,
            url,
            headers,
            body
        });

        const options: Partial<Cypress.RequestOptions> = {
            method,
            url,
            headers,
            failOnStatusCode: false
        };

        if (body !== undefined) {
            options.body = body;
        }

        return cy.request<TResponse>(options).then((response) => {
            ApiEvidence.attachResponse(name, response);
            return response;
        });
    }
}