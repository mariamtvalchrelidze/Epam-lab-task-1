Feature: Filters
  As a user
  I want to access products
  by filtering them

  Scenario: User successfully searchs and clears product results
    Given I am on the main products page
    When I search for specific product by name
    Then I should see search results corresponding this product
    And I should be able to clear the search results

    





