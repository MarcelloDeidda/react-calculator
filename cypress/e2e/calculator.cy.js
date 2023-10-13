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
      cy.getDataCy("display");
    });
  });

  // Check functionality of digit buttons
  describe("Digit buttons exist and are clickable", () => {
    for (let i = 0; i < 10; i++) {
      it(`Button ${numberToWords.toWords(i)}`, () => {
        cy.getDataCy(i).click();
        cy.getDataCy("display").should("have.text", i);
        cy.getDataCy("clear").click();
      });
    }
  });

  // Check functionality of operator buttons
  describe("Operator buttons exist and are clickable", () => {
    for (let operator of Object.keys(operators)) {
      if (operator === "equals") {
        it(`Button ${operator}`, () => {
          cy.getDataCy(operator).click();
          cy.getDataCy("display").should("have.text", "0");
        });
      } else {
        it(`Button ${operator}`, () => {
          cy.getDataCy(operator).click();
          cy.getDataCy("display").should("have.text", "0" + operators[operator]);
        });
      }
    }
  });

  // Check functionality of clear buttons
  describe("Clear buttons exist and are clickable", () => {
    it("Clear-one button", () => {
      cy.getDataCy("2").click().click();
      cy.getDataCy("clearOne").click();
      cy.getDataCy("display").should("have.text", "2");
    });

    it("Clear-all button", () => {
      cy.getDataCy("2").click().click();
      cy.getDataCy("clear").click();
      cy.getDataCy("display").should("have.text", "0");
    });
  });

  // Perform operations
  describe("Display responds to inputs", () => {
    it("Multiple inputs", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2");
      cy.getDataCy("add").click();
      cy.getDataCy("display").should("have.text", "2+");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2+2");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2+22");
      cy.getDataCy("multiply").click();
      cy.getDataCy("display").should("have.text", "2+22*");
      cy.getDataCy("5").click();
      cy.getDataCy("display").should("have.text", "2+22*5");
    });
  });

  // Perform operations
  describe("Operations", () => {
    it("Addition", () => {
      cy.getDataCy("2").click();
      cy.getDataCy("add").click();
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2+2");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "4");
    });

    it("Subtraction", () => {
      cy.getDataCy("4").click();
      cy.getDataCy("subtract").click();
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "4-2");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "2");
    });

    it("Multiplication", () => {
      cy.getDataCy("2").click();
      cy.getDataCy("multiply").click();
      cy.getDataCy("3").click();
      cy.getDataCy("display").should("have.text", "2*3");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "6");
    });

    it("Division", () => {
      cy.getDataCy("2").click();
      cy.getDataCy("divide").click();
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2/2");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "1");
    });

    it("Expression", () => {
      cy.getDataCy("9").click();
      cy.getDataCy("subtract").click();
      cy.getDataCy("2").click();
      cy.getDataCy("4").click();
      cy.getDataCy("divide").click();
      cy.getDataCy("8").click();
      cy.getDataCy("multiply").click();
      cy.getDataCy("2").click();
      cy.getDataCy("add").click();
      cy.getDataCy("3").click();
      cy.getDataCy("display").should("have.text", "9-24/8*2+3");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "6");
    });

    it("Decimal point", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "0.2");
      cy.getDataCy("add").click();
      cy.getDataCy("display").should("have.text", "0.2+");
      cy.getDataCy("4").click();
      cy.getDataCy("display").should("have.text", "0.2+4");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "4.2");
    });

    it("Result of previous expression is the first operand of the next", () => {
      cy.getDataCy("4").click();
      cy.getDataCy("subtract").click();
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "4-2");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "2");
      cy.getDataCy("multiply").click();
      cy.getDataCy("display").should("have.text", "2*");
      cy.getDataCy("6").click();
      cy.getDataCy("display").should("have.text", "2*6");
      cy.getDataCy("equals").click();
      cy.getDataCy("display").should("have.text", "12");
    });
  })

  // Validating multiple zeroes
  describe("Zero testing", () => {
    it("Multiple zeroes aren't allowed at the beginning of an expression.", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("8").click();
      cy.getDataCy("display").should("have.text", "8");
    });

    it("Multiple zeroes aren't allowed after an operator", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2");
      cy.getDataCy("add").click();
      cy.getDataCy("display").should("have.text", "2+");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "2+0");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "2+0");
      cy.getDataCy("8").click();
      cy.getDataCy("display").should("have.text", "2+8");
    });

    it("Multiple zeroes are allowed after a number.", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "2");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "20");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "200");
    });

    it("Multiple zeroes are allowed after a decimal point.", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "0.0");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "0.00");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "0.002");
    });
  });

  // Validating decimal points
  describe("Decimal testing", () => {
    it("Decimal points aren't allowed in the same number.", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "0.0");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.0");
      cy.getDataCy("0").click();
      cy.getDataCy("display").should("have.text", "0.00");
    });

    it("Decimal points are allowed on both sides of another operator.", () => {
      cy.getDataCy("display").should("have.text", "0");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.");
      cy.getDataCy("2").click();
      cy.getDataCy("display").should("have.text", "0.2");
      cy.getDataCy("add").click();
      cy.getDataCy("display").should("have.text", "0.2+");
      cy.getDataCy("4").click();
      cy.getDataCy("display").should("have.text", "0.2+4");
      cy.getDataCy("decimal").click();
      cy.getDataCy("display").should("have.text", "0.2+4.");
      cy.getDataCy("9").click();
      cy.getDataCy("display").should("have.text", "0.2+4.9");
    });
  })

  // Operators override operators with subraction sign exception
  describe("Operator override", () => {
    it("Multiply signs override other operators", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("multiply").click();
        cy.getDataCy("display").should("have.text", "0*");
        cy.getDataCy("clear").click();
      }
    });

    it("Add sign overrides other operators", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("add").click();
        cy.getDataCy("display").should("have.text", "0+");
        cy.getDataCy("clear").click();
      }
    });

    it("Division sign overrides other operators", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("divide").click();
        cy.getDataCy("display").should("have.text", "0/");
        cy.getDataCy("clear").click();
      }
    });

    it("Subtract sign does not override other operators, except for itself and decimal", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;
      delete operatorTest.subtract;
      delete operatorTest.decimal;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("subtract").click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}-`);
        cy.getDataCy("clear").click();
      }
    });

    it("Subtract overrides itself and decimal", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;
      delete operatorTest.add;
      delete operatorTest.multiply;
      delete operatorTest.divide;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("subtract").click();
        cy.getDataCy("display").should("have.text", `0-`);
        cy.getDataCy("clear").click();
      }
    });

    it("Decimal point overrides other operators", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("decimal").click();
        cy.getDataCy("display").should("have.text", "0.");
        cy.getDataCy("clear").click();
      }
    });

    it("Equal sign does not override other operators", () => {
      cy.getDataCy("display").should("have.text", "0");

      const operatorTest = { ...operators };
      delete operatorTest.equals;

      for (let operator of Object.keys(operatorTest)) {
        cy.getDataCy(operator).click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("equals").click();
        cy.getDataCy("display").should("have.text", `0${operatorTest[operator]}`);
        cy.getDataCy("clear").click();
      }
    });
  });
});