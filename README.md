# Foolproof Calculator Component

This is a calculator web-app I wrote for my [FreeCodeCamp](https://www.freecodecamp.org/) Front End Development Libraries Certification. 

The app was created using React (HTML, JavaScript), CSS and SCSS. 

The calculator itself is a completely reusable React Component, to embed it on your website just clone [Calculator.jsx](src/Calculator.jsx) and [Calculator.scss](src/Calculator.scss) and import `'Calculator'` into your project.

You can see it in action here: [Launch App](https://szymon-kulak.github.io/fcc-react-calc/)

## Basics

The calculator is made out of 17 buttons, each constructed according to the following template: 

```JSX
<button
    className="calcKey calcKeyMath"
    id="subtract"
    value="SUBTRACT"
    onClick={handleClick}
>
    -
</button>		
```

They are each styled according to `Calculator.scss`, like this: 

```scss
.calcKey {
    position: relative;
    background-color: $digit-color;
    border: none;
    outline: 1px solid black;
    cursor: default;
    font-size: 20px;
    color: white;
    font-family: monospace;
}
```

As you can see, the style is an **SCSS** variable, allowing for easy customisation to fit your website's style. 

```scss
$digit-color: #4d4d4d;
$math-color: #666666;
$ac-color: #ac3939;
$equals-color: #004466;
```

To increase the buttons' sizes or change their colour, subclasses like `calcKeyMath` or `calcKeyWide` are used, with simple changes like:

```scss
.calcKeyMath {
    background-color: $math-color;
}

.calcKeyWide {
    grid-column: 1/3;
}
```

On keypress, each button triggers the `handleClick()` function which updates the `.screen-top` element with the formula and the `.screen-main` element with the most relevant information - either the number currently being entered, the next calculation, or the result. 

The function features a `switch` statement which updates the state of the app based on the button pressed.

```jsx
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
			case "0":
			case "DECIMAL":
			case "ADD":
			case "SUBTRACT":
			case "MULTIPLY":
			case "DIVIDE":
			case "EQUALS":
			case "CLEAR":
			default:
				break;
		}
	};
```

Of course, the real function has code inside each case after `"9"` (numbers `"1"` - `"8"` use the exact same logic as `"9"`, so I utilised the `switch` statement's fallthrough to avoud duplicating the code) that handles the app's behaviour, but to describe those, let me first talk about how the app keeps track of its state.

## The Logic

The entire state of the app is handled by 5 variables: 

```jsx
const [formula, changeFormula] = useState("");
const [display, changeDisplay] = useState(0);
const [lastAction, changeAction] = useState("");
const [isDecimal, toggleDecimal] = useState(false);
const [isBlankNegative, toggleBlankNegative] = useState(false);
```

To those unfamiliar with how a `useState()` hook in React works:

```jsx
const [variableState, updaterFunction] = useState(defaultValue);
```

`variableState` is the variable responsible for keeping track of a particular piece of information throughout the entire app.

`updaterFunction` is the function we'll use to change `variableState`'s value.

`defaultValue` is the initial value of `variableState` on page load. 

The first two values are pretty self explanatory = `formula` keeps track of everything the user enters before pressing the `=` equals sign, while `display` keeps track of the main display contents.

The remaining three pieces of state are here to ensure smooth operation and prevent bugs that could arise with improper use - as stated before, my goal was to make this calculator truly foolproof. 

`lastAction` is a string that keeps track of the last button the user pressed. This is useful because it allows to prevent the user from, for example, entering multiple operators (`+, -, *, /`) in a row:

```jsx
case "ADD":
    if (lastAction === "operator" || lastAction === "minus") {
        changeFormula(formula.slice(0, formula.length - 1) + "+");
        changeDisplay("+");
        changeAction("operator");
        break;
    }
```
This code ensures that if the user makes a mistake - say, presses the `MULTIPLY` button instead of the `ADD` button when they wanted to add, the app will simply remove the `MULTIPLY` operator from the formula and replace it with the `ADD` operator.

`isDecimal` ensures that no number can have more than one decimal point. It starts out as `false` and flips to `true` whenever a decimal point is pressed - then flips back to `false` whenever an operator key is pressed, so that the user can add a decimal point to the next number. Whenever this value is `true`, the `DECIMAL` button does nothing: 

```jsx
case "DECIMAL":
    if (isDecimal) {
        break;
    }
```

During my explanation of `lastAction`, you might have wondered what happens in the one scenario where you do want to enter two operators together - multiplying or dividing by a negative number. This is where `isBlankNegative` comes in. 

A keen eye might have noticed that `"minus"` is a separate value for `lastAction`, whereas all the other calculation types use `"operator"`. This allows the user to enter a `-` minus right after the division or multiplication operator:

```jsx
case "SUBTRACT":
    if (lastAction === "operator") {
        toggleBlankNegative(true);
    }

    changeFormula(formula + "-");
    changeDisplay("-");
    changeAction("minus");
    toggleDecimal(false);
    break;
```

However, if the user changes their mind and decides to press another operator key, the app will simply delete both the minus *and* the preceding operator:

```jsx
case "MULTIPLY":
    if (isBlankNegative) {
        changeFormula(formula.slice(0, formula.length - 2) + "*");
        changeDisplay("*");
        changeAction("operator");
        toggleBlankNegative(false);
        break;
    }
```

## The Result

Arguablu the two most important buttons in any calculator are the `=` and `AC` buttons. 

Here, pressing `AC` will revert the app back to its original state:

```jsx
case "CLEAR":
    changeFormula("");
    changeDisplay(0);
    changeAction("");
    toggleDecimal(false);
    toggleBlankNegative(false);
    break;
```

Whereas pressing the `=` button will trigger the only other function in this app, `calculate()`.

```jsx
case "EQUALS":
    if (lastAction === "equals") {
        break;
    }

    calculate();
    toggleDecimal(false);
    changeAction("equals");
    break;
```

```jsx
const calculate = function () {
    let tempFormula = formula;
    if (!parseFloat(formula[formula.length-1])) {
        tempFormula = formula.slice(0,formula.length-1);
    }

    let tempResult = eval(tempFormula);
    tempResult = Math.round(tempResult*10000)/10000; // rounds up to 4 decimal places
    
    changeFormula(tempFormula + "=" + tempResult);
    changeDisplay(tempResult);
};
```

`calculate()` is kept as a separate function to prevent React's asynchronous state updates from introducing any unexpected behaviour, but the function itself is remearkably simple. Let's break it down.

```jsx
let tempFormula = formula;
```

On being called, it assigns the `formula` stateful variable to a local scope variable `tempFormula` so that the function can consistently operate on the value. 

```jsx
if (isBlankNegative) {
    tempFormula = formula.slice(0,formula.length-2); 
} else if (!parseFloat(formula[formula.length-1])) {
    tempFormula = formula.slice(0,formula.length-1);
}
```
Then, `calculate()` performs two last checks for user error by first checking the `isBlankNegative` flag and, after that, trying to convert the last character in `formula` into a number using the `parseFloat` method built into JavaScript. 

This is done to prevent an user from crashing the app by evaluating a formula such as `34 * 0.227 * 5 /` which doesn't have a solution and would thus crash the app. 

If either of these statements evaluates as true, `calculate()` will simply remove the offending characters and proceed as if they were never entered.

```jsx
let tempResult = eval(tempFormula);
```
Here, `calculate()` performs the calculations contained in `formula` using JavaScript's built in `eval` method. 

> Use of this method is sometimes discouraged because of security concerns, however I decided to use it anyway as it performs faster than any feasible alternative. 
> Moreover, this app's fully client-side nature and only allowing predetermined inputs mean that an attack is not only extremely difficult, but could only be performed by the user, agains their own computer - 
> 
> \- in other words, the security concerns DO NOT apply here and `eval` is fully safe in the context of this app.

```jsx
tempResult = Math.round(tempResult*10000)/10000;
```
Here, the function ensures the result doesn't contain more than 4 decimal spots. 

This is done not only to prevent unsightly results from calculations such as `3/9=0.3333333333333333`, but also because JavaScript in all its glory is a famously imprecise language when it comes to decimals, resolving in mind-boggling errors such as `0.2*0.4=0.08000000000000002`. 

After being processed by this line of code, the results will be `3/9=0.3333` and `0.2*0.4=0.08`, respectively. Much better, isn't it.

```jsx
changeFormula(tempFormula + "=" + tempResult);
changeDisplay(tempResult);
```
And, finally, the app updates both of the displays with the result. 

Afterwards, thanks to the `lastAction` state being set to `equals`, the app knows whether to continue processing this calculation's result or start a new calculation whenever the user enters their next input.

## Conclusion

Thank you very much for reading! This is my first attempt to create documentation for an app and I hope I have been sufficiently clear in my explanations. This app is freely available to use and customise as you see fit. 

If you spotted any errors in the app or the documentation, and/or want to make me a job offer, feel free to reach out at szymon.kulak@proton.me.
