/// <reference types="Cypress" />

describe('login', () => {
  it('should navigate to login', () => {
    cy.server();
    cy.route('POST', '**/ping-login').as('pingLogin');
    cy.route('POST', '**/login').as('login');
    cy.route('**/users/**').as('users');
    cy.route('**/fx/currency-pairs/**').as('crrcyPairs');
    cy.route('**/fx/currency-notifications/**').as('notifications');
    cy.route('**/fx/currency-watchlist/**').as('watchlist');

    cy.visit('/');
    cy.url().should('include', 'landing-page');
    cy.get('#sign-in-button').click({force: true});
    cy.url().should('include', 'login');

    cy.get('app-login app-input-text input', {timeout: 20000})
      .should('be.visible')
      .type('tiane.erwee@gmail.com');
    cy.get('app-login #password')
      .should('be.visible')
      .type('Guess789!');

    cy.get('app-login #sign-in-button')
      .should('be.visible')
      .click();

    cy.wait('@pingLogin', {timeout: 60000});
    cy.wait('@login', {timeout: 60000});
    cy.wait('@users');
    cy.wait('@crrcyPairs', {timeout: 60000});
    cy.wait('@notifications');
    cy.wait('@watchlist');
    cy.url().should('include', 'dashboard');

    // cy.wait(1000);
    // cy.get('app-dashboard ion-list')
    //   .should('be.visible');
    // cy.get('app-dashboard ion-list:first div:first ion-item')
    //   .click({force: true});
    // cy.get('app-dashboard ion-list>div:first ion-item #add-alert-button')
    //   .should('include.text', 'Alerts');

    cy.get('app-menu-header ion-menu-button')
      .should('be.visible')
      .click();

    cy.get('app-menu ion-item')
      .contains('Inbox')
      .should('be.visible')
      .click({force: true});
    cy.url().should('include', 'inbox');

    cy.get('app-inbox-slv ion-card')
      .should('be.visible');
    cy.get('app-inbox-slv ion-card-header ion-card-title')
      .should('be.visible')
      .should('include.text', 'Inbox');
  });

})