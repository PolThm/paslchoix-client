import '@/assets/style/main.scss';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import theme from '@/assets/style/theme';
import { ComponentPreviews, useInitial } from '@/dev';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
          >
            <App />
          </DevSupport>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
