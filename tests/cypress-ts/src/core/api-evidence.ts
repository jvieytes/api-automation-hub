import * as allure from 'allure-js-commons';

export type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';

interface RequestEvidence {
    name: string;
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body?: unknown;
}

export class ApiEvidence {
    static attachRequest(evidence: RequestEvidence): void {
        const baseUrl = Cypress.config('baseUrl') ?? '';

        const attachment = {
            method: evidence.method,
            url: `${baseUrl}${evidence.url}`,
            headers: this.sanitizeHeaders(evidence.headers),
            body: evidence.body ?? null
        };

        allure.attachment(
            `Request - ${evidence.name}`,
            JSON.stringify(attachment, null, 2),
            'application/json'
        );
    }

    static attachResponse<T>(
        name: string,
        response: Cypress.Response<T>
    ): void {
        const attachment = {
            status: response.status,
            statusText: response.statusText,
            durationMs: response.duration,
            headers: this.sanitizeHeaders(response.headers),
            body: response.body
        };

        allure.attachment(
            `Response - ${name}`,
            JSON.stringify(attachment, null, 2),
            'application/json'
        );
    }

    private static sanitizeHeaders(
        headers: Record<string, unknown>
    ): Record<string, unknown> {
        const protectedHeaders = new Set([
            'authorization',
            'cookie',
            'set-cookie',
            'x-api-key'
        ]);

        return Object.fromEntries(
            Object.entries(headers).map(([key, value]) => [
                key,
                protectedHeaders.has(key.toLowerCase())
                    ? '[REDACTED]'
                    : value
            ])
        );
    }
}