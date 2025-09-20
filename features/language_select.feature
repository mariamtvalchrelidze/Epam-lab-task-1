Feature: User Account Access
  As a user
  I want select prefered language
  So that website will be in the selected language

  Scenario: User successfully changes the language
    Given I go to Toolshop Main Page
    When I select a different language
    Then I should see the language icon showing the newly selected language  