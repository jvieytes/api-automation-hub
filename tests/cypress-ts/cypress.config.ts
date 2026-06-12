import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';
import * as os from 'node:os';

export default defineConfig({
    retries: {
        runMode: process.env.CI ? 1 : 0,
        openMode: 0
    },

    e2e: {
        baseUrl:
            process.env.BASE_URL ??
            process.env.REST_BASE_URL ??
            'http://localhost:3000',

        specPattern: 'src/tests/**/*.cy.ts',
        supportFile: 'src/support/e2e.ts',

        requestTimeout: 15_000,
        responseTimeout: 30_000,

        setupNodeEvents(on, config) {
            allureCypress(on, config, {
                resultsDir: 'allure-results',

                environmentInfo: {
                    framework: 'Cypress API',
                    language: 'TypeScript',
                    os_platform: os.platform(),
                    os_release: os.release(),
                    node_version: process.version,
                    cypress_version: config.version
                }
            });

            return config;
        }
    }
});