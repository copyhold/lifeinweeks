import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {createGlobalStyle} from 'styled-components';
import './utils/date';

const GlobalStyles = createGlobalStyle`
html {
  font-size: 16px;
  font-family: sans-serif;
  }
 body {
 font-size: 100%;
 line-height: 1.3;
 } 
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
)
