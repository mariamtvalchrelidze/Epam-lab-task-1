Feature: Product detail Access
  As a user
  I want to access product
  So I can see details

  Scenario: User successfully accesses chosen product
    Given I am on the ToolShop homepage 
    When I view a specific product 
    Then I should see the product detail page