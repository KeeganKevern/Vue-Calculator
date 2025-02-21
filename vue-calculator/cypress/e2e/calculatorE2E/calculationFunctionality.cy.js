describe("Single Calculations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Allows user to sum", () => {
    //Click 1 twice
    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click plus, check dislpays have updated
    cy.get('button[aria-label = "plus"]').click();
    cy.get("#previousDisplay").should("have.text", "11");
    //click 1 twice
    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "22");

    //Clear and reset
    cy.get('button[aria-label = "clear"]').click();
    cy.get("#display").should("have.text", "0");
    cy.get("#previousDisplay").should("be.empty");
  });

  it("Allows user to subtract", () => {
    cy.get('button[aria-label = "9"]').click().click();
    cy.get("#display").should("have.text", "99");

    cy.get('button[aria-label = "minus"]').click();
    cy.get("#previousDisplay").should("have.text", "99");

    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "88");

    //Clear and reset
    cy.get('button[aria-label = "clear"]').click();
    cy.get("#display").should("have.text", "0");
    cy.get("#previousDisplay").should("be.empty");
  });

  it("Allows user to multiply", () => {
    cy.get('button[aria-label = "1"]').click();
    cy.get('button[aria-label = "0"]').click();
    cy.get("#display").should("have.text", "10");

    cy.get('button[aria-label = "multiply"]').click();
    cy.get("#previousDisplay").should("have.text", "10");

    cy.get('button[aria-label = "1"]').click();
    cy.get('button[aria-label = "decimal"]').click();
    cy.get('button[aria-label = "5"]').click();
    cy.get("#display").should("have.text", "1.5");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "15");

    //Clear and reset
    cy.get('button[aria-label = "clear"]').click();
    cy.get("#display").should("have.text", "0");
    cy.get("#previousDisplay").should("be.empty");
  });

  it("Allows user to divide", () => {
    cy.get('button[aria-label = "1"]').click();
    cy.get('button[aria-label = "0"]').click().click();
    cy.get("#display").should("have.text", "100");

    cy.get('button[aria-label = "divide"]').click();
    cy.get("#previousDisplay").should("have.text", "100");

    cy.get('button[aria-label = "5"]').click();
    cy.get("#display").should("have.text", "5");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "20");

    //Clear and reset
    cy.get('button[aria-label = "clear"]').click();
    cy.get("#display").should("have.text", "0");
    cy.get("#previousDisplay").should("be.empty");
  });
});

describe("Continuous calculations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Allows user subtract from the result of sum", () => {
    //Click 1 twice
    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click plus, check dislpays have updated
    cy.get('button[aria-label = "plus"]').click();
    cy.get("#previousDisplay").should("have.text", "11");
    //click 1 twice
    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "22");

    //click plus, check dislpays have updated
    cy.get('button[aria-label = "plus"]').click();
    cy.get("#previousDisplay").should("have.text", "22");

    cy.get('button[aria-label = "1"]').click().click();
    cy.get("#display").should("have.text", "11");

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#previousDisplay").should("be.empty");
    cy.get("#display").should("have.text", "33");

    //Clear and reset
    cy.get('button[aria-label = "clear"]').click();
    cy.get("#display").should("have.text", "0");
    cy.get("#previousDisplay").should("be.empty");
  });

  it("Allows Sequential Sum, Subtract, Multiply, Divide", () => {
    cy.get('button[aria-label = "2"]').click().click();

    cy.get('button[aria-label = "plus"]').click();
    cy.get('button[aria-label = "2"]').click().click();

    cy.get('button[aria-label = "minus"]').click();
    cy.get('button[aria-label = "2"]').click().click();

    cy.get('button[aria-label = "multiply"]').click();
    cy.get('button[aria-label = "2"]').click().click();

    cy.get('button[aria-label = "divide"]').click();
    cy.get('button[aria-label = "2"]').click().click();

    //click equals, check value is correct and diplays have updated
    cy.get('button[aria-label = "equals"]').click();
    cy.get("#display").should("have.text", "22");
  });
});
