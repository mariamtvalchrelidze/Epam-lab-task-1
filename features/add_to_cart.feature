Feature: Adding to Cart
  As a user
  I want to choose a product
  And add to cart

  Scenario: User successfully adds to cart
    Given I am on the product details page
    When I attampt to add product to cart
    Then I should see the cart number increase
    