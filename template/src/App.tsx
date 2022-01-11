import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-5 p-2 text-center bg-gray-900 text-gray-200 opacity-75 rounded-md">
            Tailwind CSS v3.0
          </p>
          <a
            className="text-xl text-center mt-2 text-blue-400"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Tailwind CSS
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
