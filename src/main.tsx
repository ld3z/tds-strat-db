import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './App.tsx';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/tds-strat-db/">
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);
