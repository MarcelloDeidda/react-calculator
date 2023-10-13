import { useState } from "react";
import "./App.css";
const numberToWords = require("number-to-words")

const App = () => {
  const [expression, setExpression] = useState("0");

  const digits = () => {
    const buttons = []
    for (let i = 1; i < 10; i++) {
      buttons.push(
        <button
          id={numberToWords.toWords(i)}
          data-cy={i}
          key={numberToWords.toWords(i)}
          onClick={() => updateExpression(i.toString())}>
          {i}
        </button>
      );
    }
    return buttons;
  }

  const operators = ["/", "*", "-", "+", "."];

  const updateExpression = value => {
    const numbers = expression.split(/\+|\-|\*|\//);
    if (operators.includes(value)) {
      if (value === "." && numbers[numbers.length - 1].includes(".")) {
        return;
      } else if (operators.includes(expression.slice(-1)) && operators.includes(expression.slice(-2, -1))) {
        setExpression(expression.slice(0, -2) + value);
        return;
      } else if ((operators.includes(expression.slice(-1)) && value !== "-") || (["-", "."].includes(expression.slice(-1)) && value === "-")) { //!!!
        setExpression(expression.slice(0, -1) + value);
        return;
      }
    } else {
      if (value === "0" && expression === "0") {
        return;
      } else if (expression.slice(-1) === "0" && operators.slice(0, 4).includes(expression.slice(-2, -1))) {
        setExpression(expression.slice(0, -1) + value);
        return;
      } else if (expression === "0") {
        setExpression(value);
        return;
      }
    }
    setExpression(expression + value);
  }

  const calculateResult = () => {
    if (!operators.includes(expression.slice(-1))) {
      setExpression(eval(expression).toString());
    }
  }

  const clearExpression = () => {
    setExpression("0");
  }

  const clearOne = () => {
    if (expression.length === 1) {
      setExpression("0");
      return;
    }
    setExpression(expression.slice(0, -1));
  }

  return <div id="App">
    <div id="calculator">
      <div id="display" data-cy="display">{expression}</div>
      <div class="operators">
        <button id="clear" data-cy="clear" onClick={clearExpression}>AC</button>
        <button id="clearOne" data-cy="clearOne" onClick={clearOne}>C</button>
        <button id="divide" data-cy="divide" onClick={() => updateExpression("/")}>/</button>
        <button id="multiply" data-cy="multiply" onClick={() => updateExpression("*")}>*</button>
        <button id="subtract" data-cy="subtract" onClick={() => updateExpression("-")}>-</button>
        <button id="add" data-cy="add" onClick={() => updateExpression("+")}>+</button>
      </div>
      <div class="digits">
        {digits()}
      </div>
      <div class="last-line">
        <button id="zero" data-cy="0" onClick={() => updateExpression("0")}>0</button>
        <button id="decimal" data-cy="decimal" onClick={() => updateExpression(".")}>.</button>
        <button id="equals" data-cy="equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  </div>
}

export default App;