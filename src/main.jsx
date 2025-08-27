import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
 
  RouterProvider,
} from "react-router-dom";
import { router } from './Components/Routes/routes';
import AuthProvider from './Components/Providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
 <React.StrictMode>

   
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
     
    </AuthProvider>
  </React.StrictMode>
)
