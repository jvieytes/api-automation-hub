package com.portfolio.qa.karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class KarateApiTest {

    @Test
    void runApiHappyPathTests() {
        Results results = Runner.path("tests/karate-java/src/resources/karate/tests")
                .tags("~@ignore")
                .outputHtmlReport(true)
                .outputJunitXml(true)
                .parallel(1);

        assertTrue(
                results.getScenariosTotal() > 0,
                "Karate no ejecutó ningún escenario. Revisar ruta tests/karate-java/src/resources/karate/tests o tags @ignore.");

        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}