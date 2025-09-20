Feature: User Account Access
  As a registered user
  I want to access my account
  So that I can manage my profile and view my information

  Scenario: User successfully accesses their account
    Given I go to login page
    When I attempt to access my account
    Then I should be logged into the system