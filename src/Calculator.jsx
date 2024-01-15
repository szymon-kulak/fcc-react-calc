import "./Calculator.scss";
import React, { useState } from "react";

function Calculator() {
	const [formula, changeFormula] = useState("");
	const [display, changeDisplay] = useState(0);
	const [lastAction, changeAction] = useState("");
	const [isDecimal, toggleDecimal] = useState(false);
	const [isBlankNegative, toggleBlankNegative] = useState(false);

	const calculate = function () {
		let tempResult = eval(formula);
		changeFormula(formula + "=" + tempResult);
		changeDisplay(tempResult);
	};

	const handleClick = function (e) {
		let val = e.target.value;

		switch (val) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				if (lastAction === "operator" || lastAction === "minus") {
					changeDisplay(val);
					changeFormula(formula + val);
				} else if (lastAction === "equals") {
					changeFormula(val);
					changeDisplay(val);
				} else if (display !== 0) {
					changeDisplay(display + val);
					changeFormula(formula + val);
				} else {
					changeDisplay(val);
					changeFormula(val);
				}
				changeAction("number");
				toggleBlankNegative(false);
				break;
			case "0":
				if (lastAction === "operator" || lastAction === "minus") {
					changeDisplay(val);
					changeFormula(formula + val);
				} else if (lastAction === "equals") {
					changeDisplay(val);
					changeFormula("");
				} else if (display !== 0) {
					changeDisplay(display + val);
					changeFormula(formula + val);
				} else {
					break;
				}
				break;
			case "DECIMAL":
				if (isDecimal) {
					break;
				}

				if (lastAction === "operator" || lastAction === "minus") {
					changeDisplay(display + "0.");
					changeFormula(formula + "0.");
					toggleDecimal(true);
					toggleBlankNegative(false);
					break;
				}

				if (lastAction === "equals") {
					changeDisplay("0.");
					changeFormula("0.");
					toggleDecimal(true);
					break;
				}

				if (display === 0) {
					changeDisplay(display + ".");
					changeFormula(formula + "0.");
					toggleDecimal(true);
					break;
				}

				changeDisplay(display + ".");
				changeFormula(formula + ".");
				toggleDecimal(true);
				break;
			case "ADD":
				if (isBlankNegative) {
					changeFormula(formula.slice(0, formula.length - 2) + "+");
					changeDisplay("+");
					changeAction("operator");
					toggleBlankNegative(false);
					break;
				}

				if (lastAction === "equals") {
					changeFormula(display + "+");
					changeDisplay("+");
					changeAction("operator");
					break;
				}

				if (lastAction === "operator" || lastAction === "minus") {
					changeFormula(formula.slice(0, formula.length - 1) + "+");
					changeDisplay("+");
					changeAction("operator");
					break;
				}

				changeFormula(formula + "+");
				changeDisplay("+");
				changeAction("operator");
				toggleDecimal(false);
				break;
			case "SUBTRACT":
				if (lastAction === "equals") {
					changeFormula(display + "-");
					changeDisplay("-");
					changeAction("minus");
					break;
				}

				if (lastAction === "operator") {
					toggleBlankNegative(true);
				}

				if (lastAction === "minus") {
					break;
				}

				changeFormula(formula + "-");
				changeDisplay("-");
				changeAction("minus");
				toggleDecimal(false);
				break;
			case "MULTIPLY":
				if (isBlankNegative) {
					changeFormula(formula.slice(0, formula.length - 2) + "*");
					changeDisplay("*");
					changeAction("operator");
					toggleBlankNegative(false);
					break;
				}

				if (lastAction === "equals") {
					changeFormula(display + "*");
					changeDisplay("*");
					changeAction("operator");
					break;
				}

				if (lastAction === "operator" || lastAction === "minus") {
					changeFormula(formula.slice(0, formula.length - 1) + "*");
					changeDisplay("*");
					changeAction("operator");
					break;
				}

				changeFormula(formula + "*");
				changeDisplay("*");
				changeAction("operator");
				toggleDecimal(false);
				break;
			case "DIVIDE":
				if (isBlankNegative) {
					changeFormula(formula.slice(0, formula.length - 2) + "/");
					changeDisplay("/");
					changeAction("operator");
					toggleBlankNegative(false);
					break;
				}

				if (lastAction === "equals") {
					changeFormula(display + "/");
					changeDisplay("/");
					changeAction("operator");
					break;
				}

				if (lastAction === "operator" || lastAction === "minus") {
					changeFormula(formula.slice(0, formula.length - 1) + "/");
					changeDisplay("/");
					changeAction("operator");
					break;
				}

				changeFormula(formula + "/");
				changeDisplay("/");
				changeAction("operator");
				toggleDecimal(false);
				break;
			case "EQUALS":
				if (lastAction === "equals") {
					break;
				}
				calculate();
				toggleDecimal(false);
				changeAction("equals");
				break;
			case "CLEAR":
				changeFormula("");
				changeDisplay(0);
				toggleDecimal(false);
				break;
			default:
				break;
		}
	};

	return (
		<div className="Calculator">
			<div className="screen-top"> {formula} </div>
			<div className="screen-main" id="display">
				{display}
			</div>
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
				<button className="calcKey" id="seven" value="7" onClick={handleClick}>
					7
				</button>
				<button className="calcKey" id="eight" value="8" onClick={handleClick}>
					8
				</button>
				<button className="calcKey" id="nine" value="9" onClick={handleClick}>
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
				<button className="calcKey" id="four" value="4" onClick={handleClick}>
					4
				</button>
				<button className="calcKey" id="five" value="5" onClick={handleClick}>
					5
				</button>
				<button className="calcKey" id="six" value="6" onClick={handleClick}>
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
				<button className="calcKey" id="one" value="1" onClick={handleClick}>
					1
				</button>
				<button className="calcKey" id="two" value="2" onClick={handleClick}>
					2
				</button>
				<button className="calcKey" id="three" value="3" onClick={handleClick}>
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
				<button
					className="calcKey calcKeyWide"
					id="zero"
					value="0"
					onClick={handleClick}
				>
					0
				</button>
				<button
					className="calcKey"
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
