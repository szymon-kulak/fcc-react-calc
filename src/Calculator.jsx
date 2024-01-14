import './Calculator.scss';
import React, {useState} from 'react';

function Calculator() {

    const[output, changeOutput] = useState(0);
    const[history, changeHistory] = useState("");
    const[result, changeResult] = useState(0);
    const[currentCalc, changeCalc] = useState("");

    const calculate = function() {
        let returnVal;
        switch (currentCalc) {
            case "ADD":
                returnVal = result + parseFloat(output)
                changeResult(returnVal);
                return(returnVal);
            case "SUBTRACT":
                returnVal = result - parseFloat(output)
                changeResult(returnVal);
                return(returnVal);
            case "MULTIPLY":
                returnVal = result * parseFloat(output)
                changeResult(returnVal);
                return(returnVal);
            case "DIVIDE":
                returnVal = result / parseFloat(output)
                changeResult(returnVal);
                return(returnVal);
            default:
                break;
        }
    }

    const handleClick = function(e) {
        let val = e.target.value;
        let tempResult = 0;

        switch(val) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                if (!parseFloat(output)) {
                    changeOutput(val);
                    changeHistory(history+val);
                } else if (output !== 0) {
                    changeOutput(output+val);
                    changeHistory(history+val);
                } else {
                    changeOutput(val);
                    changeHistory(val);
                }
                break;
            case "0":
                if (!parseFloat(output)) {
                    changeOutput(val);
                    changeHistory(history+val);
                } else if (output !== 0) {
                    changeOutput(output+val);
                    changeHistory(history+val);
                } else {
                    break;
                }
                break;
            case "DECIMAL": 
                if (!parseFloat(output)) {
                    changeOutput("0.");
                    changeHistory(history+"0.")
                } else {
                    changeOutput(output+".");
                    changeHistory(history+".")
                }
                break;
            case "ADD":
                if (!history) {
                    break;
                }
                if (currentCalc === "ADD" && output === "+") {
                    break;
                }
                if (!parseFloat(output) && currentCalc !== "ADD") {
                    changeCalc("ADD");
                    changeOutput("+");
                    changeHistory(history.slice(0,(history.length-1)) + "+")
                    break;
                }

                if (result === 0) {
                    changeResult(parseFloat(output));
                } else {
                    calculate();
                }

                changeCalc("ADD");
                changeHistory(history + "+")
                changeOutput("+");
                break;
            case "SUBTRACT":
                if (!history) {
                    break;
                }
                if (currentCalc === "SUBTRACT" && output === "-") {
                    break;
                }
                if (!parseFloat(output) && currentCalc !== "SUBTRACT") {
                    changeCalc("SUBTRACT");
                    changeOutput("-");
                    changeHistory(history.slice(0,(history.length-1)) + "-")
                    break;
                }

                if (result === 0) {
                    changeResult(parseFloat(output));
                } else {
                    calculate();
                }

                changeCalc("SUBTRACT");
                changeHistory(history + "-")
                changeOutput("-");
                break;
            case "MULTIPLY":
                if (!history) {
                    break;
                }
                if (currentCalc === "MULTIPLY" && output === "*") {
                    break;
                }
                if (!parseFloat(output) && currentCalc !== "MULTIPLY") {
                    changeCalc("MULTIPLY");
                    changeOutput("*");
                    changeHistory(history.slice(0,(history.length-1)) + "*")
                    break;
                }

                if (result === 0) {
                    changeResult(parseFloat(output));
                } else {
                    calculate();
                }

                changeCalc("MULTIPLY");
                changeHistory(history + "*")
                changeOutput("*");
                break;
            case "DIVIDE":
                if (!history) {
                    break;
                }
                if (currentCalc === "DIVIDE" && output === "/") {
                    break;
                }
                if (!parseFloat(output) && currentCalc !== "DIVIDE") {
                    changeCalc("DIVIDE");
                    changeOutput("/");
                    changeHistory(history.slice(0,(history.length-1)) + "/")
                    break;
                }

                if (result === 0) {
                    changeResult(parseFloat(output));
                } else {
                    calculate();
                }

                changeCalc("DIVIDE");
                changeHistory(history + "/")
                changeOutput("/");
                break;    
            case "EQUALS":
                if(!currentCalc && !history){
                    break;
                } 
                if (!currentCalc) {
                    tempResult = output;
                } else {
                    tempResult = calculate();
                }
                changeOutput(tempResult);
                changeCalc("");
                break;
            case "CLEAR":
                changeHistory("");
                changeOutput(0);
                changeResult(0);
                console.clear();
                break;
            default:
                break;
        }
    }

    return (
        <div className="Calculator">
            <div className="screen-top"> {history} </div>
            <div className="screen-main" id="display"> {output} </div>
            <div className="calcKeysContainer">
                <button 
                className="calcKey calcKeyWide calcKeyAC" 
                id="clear" 
                value="CLEAR"
                onClick={handleClick}
                >
                    AC
                </button>
                <button 
                className="calcKey calcKeyMath" 
                id="divide" 
                value="DIVIDE"
                onClick={handleClick}
                >
                    /
                </button>
                <button 
                className="calcKey calcKeyMath" 
                id="multiply" 
                value="MULTIPLY"
                onClick={handleClick}
                >
                    x
                </button>
                <button 
                className="calcKey" 
                id="seven" 
                value="7"
                onClick={handleClick}
                >
                    7
                </button>
                <button 
                className="calcKey" 
                id="eight" 
                value="8"
                onClick={handleClick}
                >
                    8
                </button>
                <button 
                className="calcKey" 
                id="nine" 
                value="9"
                onClick={handleClick}
                >
                    9
                </button>
                <button 
                className="calcKey calcKeyMath" 
                id="subtract" 
                value="SUBTRACT"
                onClick={handleClick}
                >
                    -
                </button>
                <button 
                className="calcKey" 
                id="four" 
                value="4"
                onClick={handleClick}
                >
                    4
                </button>
                <button 
                className="calcKey" 
                id="five" 
                value="5"
                onClick={handleClick}
                >
                    5
                </button>
                <button 
                className="calcKey" 
                id="six" 
                value="6"
                onClick={handleClick}
                >
                    6
                </button>
                <button 
                className="calcKey calcKeyMath" 
                id="add" 
                value="ADD"
                onClick={handleClick}
                >
                    +
                </button>
                <button 
                className="calcKey" 
                id="one" 
                value="1"
                onClick={handleClick}
                >
                    1
                </button>
                <button 
                className="calcKey" 
                id="two" 
                value="2"
                onClick={handleClick}
                >
                    2
                </button>
                <button 
                className="calcKey" 
                id="three" 
                value="3"
                onClick={handleClick}
                >
                    3
                </button>
                <button 
                className="calcKey calcKeyTall calcKeyEquals" 
                id="equals"  
                value="EQUALS"
                onClick={handleClick}
                >
                    =
                </button>
                <button className="calcKey calcKeyWide" 
                id="zero" 
                value="0"
                onClick={handleClick}
                >
                    0
                </button>
                <button className="calcKey" 
                id="decimal" 
                value="DECIMAL"
                onClick={handleClick}
                >
                    .
                </button>
            </div>
        </div>
    );
}

export default Calculator;