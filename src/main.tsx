import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routers from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
    </QueryClientProvider>
  </React.StrictMode>
)
