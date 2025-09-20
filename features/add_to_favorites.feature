Feature: Adding to Favorites
  As a user
  I want to choose a product
  And add to Favorites

  Scenario: User successfully adds product to Favorites
    Given As a registered user I am on the product details page
    When I attampt to add product to Favorites
    Then The product should be in my Favorites list
