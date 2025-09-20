Feature: Checkout by bank transfer
  As a registered user
  I want to choose a porduct
  Anc checkout by bank transfer

  Scenario: User successfully checks out by a bank transfer
    Given I am a registered user and I have item added to cart
    When I attempt to Checkout
    Then I provide billing information
    Then I Attempt to checkout by bank transfer
    Then I should get an invoice number