package com.portfolio.qa.karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class KarateApiTest {

    @Test
    void runApiHappyPathTests() {
        Results results = Runner.path("classpath:karate/tests")
            .tags("~@ignore")
            .outputHtmlReport(true)
            .outputJunitXml(true)
            .parallel(1);

        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }
}