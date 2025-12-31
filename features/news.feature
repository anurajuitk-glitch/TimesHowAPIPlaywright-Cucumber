
Feature: Times Now News API

  Scenario: Verify top headlines API returns success
    Given the Times Now news API is available
    When I request the top headlines
    Then the response status should be 200
    And the response should contain news articles
