import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async';

import App from './App';
import './index.css';

import {AppStateContextProvider} from './context/app-state-context';
import {ModalProvider} from './context/modal-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

root.render (
    <React.StrictMode>
        <HelmetProvider>
        <QueryClientProvider client={client}>
         <ReactQueryDevtools />
            <AppStateContextProvider>
                <ModalProvider>
                    <Router>
                        <App/>
                    </Router>
                </ModalProvider>
            </AppStateContextProvider>
        </QueryClientProvider>
        </HelmetProvider>

    </React.StrictMode>,
);
