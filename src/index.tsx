import React from 'react';
import ReactDOM from 'react-dom/client';
import { DarkModeProvider } from './context/DarkModeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DarkModeProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
