import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';

// Tailwind is loaded via CDN in index.html. 
// We removed import './index.css' because the file does not exist, causing the build to fail.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
