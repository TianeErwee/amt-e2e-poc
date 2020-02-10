/// <reference types="Cypress" />

describe('login', () => {
  it('should navigate to login', () => {
    cy.server()
    cy.route('POST', '**/ping-login').as('pingLogin')
    cy.route('POST', '**/login').as('login')

    cy.visit('/');
    cy.url().should('include', 'landing-page');
    cy.get('#sign-in-button').click({force: true});

    cy.url().should('include', 'login');
    cy.get('app-login').within(() => {
      cy.get('app-input-text').within(() => {
        cy.get('input').type('tiane.erwee@gmail.com', {force: true});
      })
      cy.get('#password').type('Guess789!', {force: true});
      cy.get('#sign-in-button').click({force: true});
    })

    cy.wait('@pingLogin')
    cy.wait('@login')

    cy.url().should('include', 'dashboard');
    cy.get('app-dashboard').within(() => {
      cy.get('ion-list>div').first().within(() => {
        cy.get('ion-item')
          .click({force: true})
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
      cy.get('ion-card-content').children().should('have.class', 'card-list-item');
    })
  });
  
})
