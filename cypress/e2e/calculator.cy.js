import operators from "../../src/operators";
import numberToWords from "number-to-words";

describe("Calculator test suite", () => {
  // Visit URL
  beforeEach(() => {
    cy.visit("/");
  });

  // Check display
  describe("Display exists", () => {
    it("Display exists", () => {
      cy.get("[data-cy=display]");
    });
  });

  // Check functionality of digit buttons
  describe("Digit buttons exist and are clickable", () => {
    for (let i = 0; i < 10; i++) {
      it(`Button ${numberToWords.toWords(i)}`, () => {
        cy.get(`[data-cy=${i}]`).click();
        cy.get("[data-cy=display]").should("have.text", i);
        cy.get(`[data-cy=clear]`).click();
      });
    }
  });

  // Check functionality of operator buttons
  describe("Operator buttons exist and are clickable", () => {
    for (let operator of Object.keys(operators)) {
      if (operator === "equals") {
        it(`Button ${operator}`, () => {
          cy.get(`[data-cy=${operator}]`).click();
          cy.get("[data-cy=display]").should("have.text", "0");
        });
      } else {
        it(`Button ${operator}`, () => {
          cy.get(`[data-cy=${operator}]`).click();
          cy.get("[data-cy=display]").should("have.text", "0" + operators[operator]);
        });
      }
    }
  });

  // Check functionality of clear buttons
  describe("Clear buttons exist and are clickable", () => {
    it("Clear-one button", () => {
      cy.get("[data-cy=2]").click().click();
      cy.get("[data-cy=clearOne]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
    });

    it("Clear-all button", () => {
      cy.get("[data-cy=2]").click().click();
      cy.get("[data-cy=clear]").click();
      cy.get("[data-cy=display]").should("have.text", "0");
    });
  });

  // Perform operations
  describe("Display responds to inputs", () => {
    it("Multiple inputs", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=display]").should("have.text", "2+");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2+2");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2+22");
      cy.get("[data-cy=multiply]").click();
      cy.get("[data-cy=display]").should("have.text", "2+22*");
      cy.get("[data-cy=5]").click();
      cy.get("[data-cy=display]").should("have.text", "2+22*5");
    });
  });

  // Perform operations
  describe("Operations", () => {
    it("Addition", () => {
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2+2");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "4");
    });

    it("Subtraction", () => {
      cy.get("[data-cy=4]").click();
      cy.get("[data-cy=subtract]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "4-2");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
    });

    it("Multiplication", () => {
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=multiply]").click();
      cy.get("[data-cy=3]").click();
      cy.get("[data-cy=display]").should("have.text", "2*3");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "6");
    });

    it("Division", () => {
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=divide]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2/2");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "1");
    });

    it("Expression", () => {
      cy.get("[data-cy=9]").click();
      cy.get("[data-cy=subtract]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=4]").click();
      cy.get("[data-cy=divide]").click();
      cy.get("[data-cy=8]").click();
      cy.get("[data-cy=multiply]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=3]").click();
      cy.get("[data-cy=display]").should("have.text", "9-24/8*2+3");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "6");
    });

    it("Decimal point", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2");
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+");
      cy.get("[data-cy=4]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+4");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "4.2");
    });

    it("Result of previous expression is the first operand of the next", () => {
      cy.get("[data-cy=4]").click();
      cy.get("[data-cy=subtract]").click();
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "4-2");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
      cy.get("[data-cy=multiply]").click();
      cy.get("[data-cy=display]").should("have.text", "2*");
      cy.get("[data-cy=6]").click();
      cy.get("[data-cy=display]").should("have.text", "2*6");
      cy.get("[data-cy=equals]").click();
      cy.get("[data-cy=display]").should("have.text", "12");
    });
  })

  // Validating multiple zeroes
  describe("Zero testing", () => {
    it("Multiple zeroes aren't allowed at the beginning of an expression.", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=8]").click();
      cy.get("[data-cy=display]").should("have.text", "8");
    });

    it("Multiple zeroes aren't allowed after an operator", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=display]").should("have.text", "2+");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "2+0");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "2+0");
      cy.get("[data-cy=8]").click();
      cy.get("[data-cy=display]").should("have.text", "2+8");
    });

    it("Multiple zeroes are allowed after a number.", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "2");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "20");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "200");
    });

    it("Multiple zeroes are allowed after a decimal point.", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "0.0");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "0.00");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "0.002");
    });
  });

  // Validating decimal points
  describe("Decimal testing", () => {
    it("Decimal points aren't allowed in the same number.", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "0.0");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.0");
      cy.get("[data-cy=0]").click();
      cy.get("[data-cy=display]").should("have.text", "0.00");
    });

    it("Decimal points are allowed on both sides of another operator.", () => {
      cy.get("[data-cy=display]").should("have.text", "0");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.");
      cy.get("[data-cy=2]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2");
      cy.get("[data-cy=add]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+");
      cy.get("[data-cy=4]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+4");
      cy.get("[data-cy=decimal]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+4.");
      cy.get("[data-cy=9]").click();
      cy.get("[data-cy=display]").should("have.text", "0.2+4.9");
    });
  })

  // Operators override operators with subraction sign exception
  describe("Operator override", () => {
    it("Multiply signs override other operators", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=multiply]").click();
        cy.get("[data-cy=display]").should("have.text", "0*");
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Add sign overrides other operators", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=add]").click();
        cy.get("[data-cy=display]").should("have.text", "0+");
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Division sign overrides other operators", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=divide]").click();
        cy.get("[data-cy=display]").should("have.text", "0/");
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Subtract sign does not override other operators, except for itself and decimal", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;
      delete operatorTest.subtract;
      delete operatorTest.decimal;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=subtract]").click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}-`);
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Subtract overrides itself and decimal", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;
      delete operatorTest.add;
      delete operatorTest.multiply;
      delete operatorTest.divide;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=subtract]").click();
        cy.get("[data-cy=display]").should("have.text", `0-`);
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Decimal point overrides other operators", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=decimal]").click();
        cy.get("[data-cy=display]").should("have.text", "0.");
        cy.get("[data-cy=clear]").click();
      }
    });

    it("Equal sign does not override other operators", () => {
      cy.get("[data-cy=display]").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.get(`[data-cy=${operator}]`).click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=equals]").click();
        cy.get("[data-cy=display]").should("have.text", `0${operatorTest[operator]}`);
        cy.get("[data-cy=clear]").click();
      }
    });
  });
});