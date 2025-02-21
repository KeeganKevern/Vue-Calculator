/// <reference types="cypress" />

//Load appropriate page
describe("Page rendering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("check status 200", () => {
    cy.request("http://localhost:5173").its("status").should("eq", 200);
  });

  it("buttons loaded", () => {
    cy.get(".button").should("be.visible");
    cy.get(".button").should("have.length", 18);
  });

  it("Current/previous sectioned loaded with correct values", () => {
    cy.get(".display").should("exist");
    cy.get(".display").should("be.visible");
    cy.get(".display").contains("0");
    cy.get("#previousDisplay").should("exist");
    cy.get("#previousDisplay").should("be.visible");
    cy.get("#previousDisplay").should("be.empty");
  });
});
