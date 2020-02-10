/// <reference types="Cypress" />

describe('login', () => {
  it('should navigate to login', () => {
    cy.server()
    cy.route('POST', '**/ping-login').as('pingLogin')
    cy.route('POST', '**/login').as('login')

    cy.visit('/');
    cy.url().should('include', 'landing-page');
    cy.get('#sign-in-button').click();
    cy.url().should('include', 'login');

    cy.get('app-login app-input-text input', {
        timeout: 20000
      })
      .should('be.visible')
      .type('tiane.erwee@gmail.com');
    cy.get('app-login #password')
      .should('be.visible')
      .type('Guess789!');

    cy.get('app-login #sign-in-button')
      .should('be.visible')
      .click()

    cy.wait('@pingLogin', {timeout: 60000})
    cy.wait('@login', {timeout: 60000})

    cy.url().should('include', 'dashboard');
    cy.get('app-dashboard').within(() => {
      cy.get('ion-list>div').first().within(() => {
        cy.get('ion-item')
          .click({
            force: true
          })
          .within(() => {
            cy.get('#add-alert-button').should('include.text', 'Alerts');
          })
      });
    });

    cy.get('app-menu-header').within(() => {
      cy.get('ion-menu-button').click();
    });
    cy.get('app-menu').within(() => {
      cy.get('ion-item').contains('Inbox').click();
      cy.url().should('include', 'inbox');
    });
    cy.get('app-inbox-slv').within(() => {
      cy.get('ion-card-header>ion-card-title').should('include.text', 'Inbox');
      // cy.get('ion-card-content').children().should('have.class', 'card-list-item');
    })
  });

})