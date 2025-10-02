import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Check if we're in extension mode (content script environment)
const isExtension = document.getElementById('react-translator-root');

// Use appropriate root element
const rootElement = isExtension 
  ? document.getElementById('react-translator-root')
  : document.getElementById('root');

// Ensure the root element exists before rendering
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found. Expected "root" for web app or "react-translator-root" for extension.');
}
