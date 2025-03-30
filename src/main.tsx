import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './utils/date';
import App from './App.tsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html {
  color-scheme: light dark;
  font-size: 16px;
  font-family: sans-serif;
  }
 body {
  font-size: 100%;
  line-height: 1.3;
  margin: 0;
 } 
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
);
