import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'
import { clientId, clientSecret } from './constants.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <main className='light text-foreground bg-background'>
            <App />
          </main>
        </NextUIProvider>
      </QueryClientProvider>
    </StrictMode>
  </GoogleOAuthProvider>,
)
