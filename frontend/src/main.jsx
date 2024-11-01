import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CookiesProvider } from 'react-cookie'

import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()
const clientId = "361591895069-pa7roahi6mo5jt67hujp335ivhjeh3fs.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId} >
    <StrictMode>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <main className='light-theme text-foreground bg-background'>
              <App />
            </main>
          </NextUIProvider>
        </QueryClientProvider>
      </CookiesProvider>
    </StrictMode>
  </GoogleOAuthProvider>,
)
