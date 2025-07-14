// cypress/e2e/homepage.cy.js

describe('E-store basic test', () => {
  it('visits the homepage and checks for product', () => {
    cy.visit('/');
    
    cy.contains('Vestidos').should('be.visible');
  });
});
