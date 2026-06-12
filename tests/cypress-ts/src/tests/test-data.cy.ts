import * as allure from 'allure-js-commons';
import { TestDataClient } from '../clients/test-data-client';

describe('Test Data API', () => {
    const testDataClient = new TestDataClient();

    it('Debe resetear correctamente la data de prueba', () => {
        allure.epic('Portfolio API');
        allure.feature('Test Data');

        testDataClient.resetData().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.response.total)
                .to.be.greaterThan(1);
        });
    });
});