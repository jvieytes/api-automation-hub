package com.portfolio.qa.karate;

import com.intuit.karate.junit5.Karate;

class KarateApiTest {

    @Karate.Test
    Karate runApiHappyPathTests() {
        return Karate
            .run("classpath:karate/tests")
            .tags("~@ignore")
            .relativeTo(getClass());
    }
}