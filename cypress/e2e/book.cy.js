describe("Books app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should open main page", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Should login successfully", () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password);

      cy.contains(user.email).should("be.visible");
    });
  });

  it("Should not login with empty email", () => {
    cy.contains("Log in").click();

    cy.get("#mail").type(" ");

    cy.get("#pass").type("test");

    cy.contains("Submit").click();

    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.contains("Log in").click();

    cy.get("#mail").type("test@test.com");

    cy.contains("Submit").click();

    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with wrong password", () => {
    cy.fixture("user").then((user) => {
      cy.contains("Log in").click();

      cy.get("#mail").type(user.email);

      cy.get("#pass").type("wrong_password");

      cy.contains("Submit").click();

      cy.contains(user.email).should("not.exist");
    });
  });

  it("Should create a book", () => {
    cy.fixture("user").then((user) => {
      const bookName = `Cypress book ${Date.now()}`;

      cy.login(user.email, user.password);

      cy.createBook(bookName, "Test book", "Cypress");

      cy.contains(bookName).should("be.visible");
    });
  });

  it("Should add book to favorites", () => {
    cy.fixture("user").then((user) => {
      const bookName = `Favorite book ${Date.now()}`;

      cy.login(user.email, user.password);

      cy.createBook(bookName, "Test favorite", "Cypress");

      cy.contains(bookName).should("be.visible");

      cy.contains(bookName)
        .closest("a")
        .find(".card-footer button")
        .should("contain", "Add to favorite")
        .click();

      cy.contains("Favorites").click();

      cy.contains(bookName).should("be.visible");
    });
  });

  it("Should show book in favorites list", () => {
    cy.fixture("user").then((user) => {
      const bookName = `Show favorite book ${Date.now()}`;

      cy.login(user.email, user.password);

      cy.createBook(bookName, "Test favorite list", "Cypress");

      cy.addBookToFavorites(bookName);

      cy.contains("Favorites").click();

      cy.contains(bookName).should("exist");
    });
  });

  it("Should remove book from favorites", () => {
    cy.fixture("user").then((user) => {
      const bookName = `Delete favorite ${Date.now()}`;

      cy.login(user.email, user.password);

      cy.createBook(bookName, "Test delete", "Cypress");

      cy.addBookToFavorites(bookName);

      cy.contains("Favorites").click();

      cy.contains(bookName)
        .closest("a")
        .find(".card-footer button")
        .should("contain", "Delete from favorite")
        .click();

      cy.contains(bookName).should("not.exist");
    });
  });
});
