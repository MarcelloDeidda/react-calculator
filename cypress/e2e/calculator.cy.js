import operators from "../../src/operators";
import numberToWords from "number-to-words";

// Check existence of buttons and display
describe("Buttons and display exist", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Digit buttons", () => {
    for (let i = 0; i < 10; i++) {
      cy.get(`[data-cy=${i}]`);
    }
  });

  it("Operator buttons", () => {
    for (let operator of ["add", "subtract", "divide", "multiply", "equals", "decimal"]) {
      cy.get(`[data-cy=${operator}]`);
    }
  });

  it("Clear buttons", () => {
    for (let clear of ["clear", "clearOne"]) {
      cy.get(`[data-cy=${clear}]`);
    }
  });

  it("Display", () => {
    cy.get(`[data-cy=display]`);
  });
});

// Check functionality of buttons
describe("Buttons are clickable", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  for (let i = 0; i < 10; i++) {
    it(`Button ${numberToWords.toWords(i)}`, () => {
      cy.get(`[data-cy=${i}]`).click();
      cy.get("[data-cy=display]").should("have.text", i);
      cy.get(`[data-cy=clear]`).click();
    });
  }
/*
  it("Digit buttons", () => {
    for (let i = 0; i < 10; i++) {
      cy.get(`[data-cy=${i}]`).click();
      cy.get("[data-cy=display]").should("have.text", i);
      cy.get(`[data-cy=clear]`).click();
    }
  });

  it("Operator buttons", () => {
    for (let operator of Object.keys(operators)) {
      cy.get(`[data-cy=${operator}]`).click();
      cy.get("[data-cy=display]").should("have.text", "0" + operators[operator]);
    }
  });

  it("Clear buttons exist", () => {
    for (let clear of ["clear", "clearOne"]) {
      cy.get(`[data-cy=${clear}]`);
    }
  });

  it("Display exists", () => {
    cy.get(`[data-cy=display]`);
  });*/
});

describe("Simple operations", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Addition", () => {
    cy.get("[data-cy=2]").click();
    cy.get("[data-cy=add]").click();
    cy.get("[data-cy=2]").click();
    cy.get("[data-cy=display]").should("have.text", "2+2");
    cy.get("[data-cy=equals]").click();
    cy.get("[data-cy=display]").should("have.text", "4");
  })
})