import * as allure from 'allure-js-commons';
import { HealthClient } from '../clients/health-client';

describe('Healthcheck API', () => {
    const healthClient = new HealthClient();

    it('Debe retornar estado UP al consultar el healthcheck', () => {
        allure.epic('Portfolio API');
        allure.feature('Healthcheck');
        allure.severity('critical');

        healthClient.getHealth().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.response.status).to.eq('UP');
        });
    });
});