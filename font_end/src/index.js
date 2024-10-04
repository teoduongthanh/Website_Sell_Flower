
// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter ,Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import '../src/assets1/css/styles.css';

const container = document.getElementById("root");
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);