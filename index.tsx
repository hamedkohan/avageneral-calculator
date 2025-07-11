import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';       // Imports your main App component
import './style.css';     // Imports your CSS file

// Finds the <div> with id="root" in your index.html
const rootElement = document.getElementById('root');

// Makes sure the element was found before trying to render
if (rootElement) {
  // Creates the React "root"
  const root = ReactDOM.createRoot(rootElement);
  
  // Renders your App inside the root
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element. Make sure you have <div id='root'></div> in your index.html.");
}