import './Calculator.scss';

function Calculator() {
    return (
        <div className="Calculator">
            <div className="calcKeysContainer">
                <button className="calcKey calcKeyWide calcKeyAC" id="clear" value="clear">AC</button>
                <button className="calcKey calcKeyMath" id="divide" value="divide">/</button>
                <button className="calcKey calcKeyMath" id="multiply" value="multiply">x</button>
                <button className="calcKey" id="seven" value="7">7</button>
                <button className="calcKey" id="eight" value="8">8</button>
                <button className="calcKey" id="nine" value="9">9</button>
                <button className="calcKey calcKeyMath" id="subtract" value="subtract">-</button>
                <button className="calcKey" id="four" value="4">4</button>
                <button className="calcKey" id="five" value="5">5</button>
                <button className="calcKey" id="six" value="6">6</button>
                <button className="calcKey calcKeyMath" id="add" value="add">+</button>
                <button className="calcKey" id="one" value="1">1</button>
                <button className="calcKey" id="two" value="2">2</button>
                <button className="calcKey" id="three" value="3">3</button>
                <button className="calcKey calcKeyTall calcKeyEquals" id="equals" value="equals">=</button>
                <button className="calcKey calcKeyWide" id="zero" value="0">0</button>
                <button className="calcKey" id="." value=".">.</button>
            </div>
        </div>
    );
}

export default Calculator;