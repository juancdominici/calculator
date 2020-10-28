import React, { useState } from "react";
import "./App.css";
import digits from "./components/data.jsx";
import Button from "./components/Button.jsx";
import Display from "./components/Display.jsx";

function App() {
  const [currentValue, setCurrentValue] = useState("");
  const [operando, setOperando] = useState("");
  const [operador, setOperador] = useState("");
  const [result, setResult] = useState("");

  const operate = (val) => {
    if (val === "=") {
      calculate();
    } else if (val === "AC") {
      clearDisplay();
    } else if (val === "-" && currentValue.length === 0) {
      setCurrentValue(val + currentValue);
    } else if (currentValue === "-" && operando) {
      setOperador(val);
      setCurrentValue("");
    } else {
      setOperador(val);
      calculate();
    }
  };

  const calculate = () => {
    if (currentValue && operando) {
      let [value1, value2] = [parseFloat(currentValue), parseFloat(operando)];
      let operationResult;

      switch (operador) {
        case "+":
          operationResult = value1 + value2;
          break;
        case "-":
          operationResult = value2 - value1;
          break;
        case "*":
          operationResult = value1 * value2;
          break;
        case "/":
          operationResult = value2 / value1;
          break;
        default:
          return;
      }

      setCurrentValue("");
      setResult(operationResult);
      setOperando(operationResult);
    } else if (currentValue === "-") {
      setOperando("");
    } else if (currentValue) {
      setOperando(currentValue);
      setCurrentValue("");
    }
  };

  const clearDisplay = () => {
    setResult("");
    setOperando("");
    setCurrentValue("");
    setOperador("");
  };

  const updateValue = (val) => {
    if (val === "." && currentValue.includes(".")) {
      setCurrentValue(currentValue);
    } else {
      let updatedValue = currentValue + val;
      if (updatedValue.charAt(0) === "0") {
        updatedValue = updatedValue.slice(1);
      }

      setCurrentValue(updatedValue);
    }
  };

  return (
    <div className="Container">
      <div className="App">
        <Display
          currentValue={currentValue}
          result={result}
          operador={operador}
          operando={operando}
        />

        <div className="calculator">
          {digits.map((digit) => {
            return (
              <Button
                id={digit.id}
                value={digit.value}
                operation={digit.operation}
                updateValue={updateValue}
                operate={operate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
