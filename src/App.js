import './App.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
        <p>
          Made by Szymon Kulak.
        </p>
        <a
          className="App-link"
          href="https://github.com/szymon-kulak/"
          target="_blank"
          rel="noopener noreferrer"
        >
          My GitHub Profile.
        </a>
      </header>
    </div>
  );
}

export default App;
