import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routers from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routers />
      <Toaster richColors theme='light'/>
    </QueryClientProvider>
  </React.StrictMode>
)
