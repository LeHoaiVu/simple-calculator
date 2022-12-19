import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Result from "../../components/Result";
import { FEATURES_BUTTON, NUMBER_BUTTON } from "../../constants";

const Calculator = () => {
    const [calculation, setCalculation] = useState([0]);
    const [result, setResult] = useState(0);
    const [operator, setOperator] = useState(null);
    const [prevResult, setPrevResult] = useState(null);

    //reset the result and the calculation when reload the page
    useEffect(() => {
        setCalculation([0]);
        setResult(0);
    }, []);

    useEffect(() => {
        console.log("calculation :>> ", calculation);
    }, [calculation]);

    useEffect(() => {
        if (operator != null) {
            let itemBeforeOperator = 0;
            let itemAfterOperator = 0;
            let operatorFound = false;
            const length = calculation.length;
            for (let i = length - 1; i >= 0; i--) {
                if (calculation[i] !== "$") {
                    if (operator === calculation[i]) {
                        operatorFound = true;
                        continue;
                    }
                    if (operatorFound) {
                        if (result !== 0) {
                            itemBeforeOperator = result;
                        } else {
                            itemBeforeOperator =
                                itemBeforeOperator === 0
                                    ? calculation[i]
                                    : calculation[i] + itemBeforeOperator;
                        }
                    } else {
                        itemAfterOperator =
                            itemAfterOperator === 0
                                ? calculation[i]
                                : calculation[i] + itemAfterOperator;
                    }
                } else {
                    if (result !== 0) {
                        itemBeforeOperator = result;
                    }
                    break;
                }
            }

            const lastItem = calculation[calculation.length - 1];
            if (lastItem !== operator) {
                setPrevResult(prevResult);
                let updatedResult = 0;

                //execute the calculation
                switch (operator) {
                    case "%":
                        updatedResult = itemBeforeOperator % itemAfterOperator;
                        setResult(updatedResult);
                        break;
                    case "/":
                        updatedResult = itemBeforeOperator / itemAfterOperator;
                        setResult(updatedResult);
                        break;
                    case "x":
                        updatedResult = itemBeforeOperator * itemAfterOperator;
                        setResult(updatedResult);
                        break;
                    case "+":
                        updatedResult =
                            parseInt(itemBeforeOperator) +
                            parseInt(itemAfterOperator);
                        setResult(updatedResult);
                        break;
                    case "-":
                        updatedResult = itemBeforeOperator - itemAfterOperator;
                        setResult(updatedResult);
                        break;
                    default:
                        return;
                }
            }
        } else {
            return;
        }
    }, [operator, calculation]);

    // handle when click the number keypad
    const handleNumber = (value) => {
        if (calculation.length === 1 && calculation.indexOf(0) === 0) {
            setCalculation([value]);
        } else {
            setCalculation([...calculation, value]);
        }
    };

    //handle when click feature + - * / % . = DEL(delete each number) and C (clear)
    const handleFeature = (value) => {
        if (
            calculation.length === 1 &&
            calculation[calculation.length - 1] === 0
        ) {
            return;
        }
        switch (value) {
            case "C":
                setCalculation([0]);
                setResult(0);
                setOperator(null);
                return;
            case "%":
                updateCalculation("%");
                setOperator("%");
                break;
            case "/":
                updateCalculation("/");
                setOperator("/");
                break;
            case "+":
                updateCalculation("+");
                setOperator("+");
                break;
            case "-":
                updateCalculation("-");
                setOperator("-");
                break;
            case "x":
                updateCalculation("x");
                setOperator("x");
                break;
            case "DEL":
                if (calculation.length === 1) {
                    if (result === calculation[calculation.length - 1]) {
                        setCalculation([0]);
                        setResult(0);
                    }
                }
                const newCalculation = calculation.pop();
                if (newCalculation.length) {
                    setResult(prevResult);
                    setCalculation([...calculation]);
                } else {
                    setCalculation([0]);
                    setResult(0);
                }

                return;
            case ".":
                setCalculation([...calculation, "."]);
                return;
            case "=":
                setCalculation([result]);
                setOperator(null);
                return;
            default:
                return;
        }
    };

    //update the calculation when add more calculation
    const updateCalculation = (value) => {
        if (result !== 0) {
            setPrevResult(result);
            setCalculation([...calculation, "$", value]);
        } else {
            setCalculation([...calculation, value]);
        }
    };

    //remove the last string from calculation
    const showResult = () => {
        return calculation.filter((item) => item !== "$");
    };

    return (
        <div className="calculator-container">
            <div className="result-wrapped">
                <Result result={result} showResult={showResult} />
            </div>
            <div className="keypad-wrapped">
                {FEATURES_BUTTON.map((feature) => (
                    <Button
                        key={feature.value}
                        handleClick={(value) => handleFeature(value)}
                        doubleWidth={feature.doubleWidth}
                    >
                        {feature.label}
                    </Button>
                ))}
                {NUMBER_BUTTON.map((num) => (
                    <Button
                        key={num.value}
                        handleClick={(value) => handleNumber(value)}
                    >
                        {num.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
