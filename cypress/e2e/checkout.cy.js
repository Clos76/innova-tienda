describe("Full Checkout Flow", () => {
  it("adds a product and completes test-mode checkout", () => {
    // 1. Visit a real category (update slug as needed)
    cy.visit("/productos/vestidos"); // 🧠 or "/categoria/shoes", etc
    cy.log("🧪 Visiting category page");

    // 2. Wait for product tiles to show up
    cy.get("[data-cy=product-link]", { timeout: 10000 }).first().click();
    cy.log("🧪 Clicking on first product");

    // 3. Click add to cart (make sure you have this in product detail)
    cy.get("[data-cy=add-to-cart]", { timeout: 10000 }).click();
    cy.log("🧪 Adding product to cart");

    // 4. Click on the cart icon/link
    cy.get("[data-cy=cart-link]").click();

    // 5. Verify we are on cart page
    cy.url().should("include", "/cart");

    // 6. Wait for and click checkout button
    cy.get("[data-cy=checkout-button]", { timeout: 10000 }).should("be.visible").click();

    // 7. Confirm we stay on site (test mode skips redirect)
    cy.url().should("include", "/cart");
    cy.contains("Resumen del pedido");
  });
});
