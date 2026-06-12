import * as allure from 'allure-js-commons';
import { DocsClient } from '../clients/docs-client';

describe('Swagger Documentation API', () => {
    const docsClient = new DocsClient();

    it('Debe cargar correctamente la documentación Swagger', () => {
        allure.epic('Portfolio API');
        allure.feature('Swagger Documentation');

        docsClient.getDocs().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type'])
                .to.contain('text/html');
        });
    });
});