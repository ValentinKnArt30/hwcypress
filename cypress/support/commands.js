// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").should("be.visible").click();

  cy.get("#mail").should("be.visible").type(email);

  cy.get("#pass").should("be.visible").type(password);

  cy.contains("Submit").should("be.visible").click();
});

Cypress.Commands.add("createBook", (title, description, authors) => {
  cy.contains("Add new").should("be.visible").click();

  cy.get("#title").should("be.visible").type(title);

  cy.get("#description").type(description);

  cy.get("#authors").type(authors);

  cy.contains("Submit").click();

  cy.contains(title).should("be.visible");
});

Cypress.Commands.add("addBookToFavorites", (bookTitle) => {
  cy.contains(bookTitle)
    .closest("a")
    .find(".card-footer button")
    .should("contain", "Add to favorite")
    .click();
});
