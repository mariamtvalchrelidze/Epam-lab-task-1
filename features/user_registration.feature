Feature: User registration
  As a user
  I want to access product
  So I can see details

  Scenario: User successfully registers
    Given I am on the main page of ToolShop
    When I attempt registration with valid inputs
    Then I should be able to log in