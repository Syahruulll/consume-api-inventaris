import React from 'react'
import { RouterProvider } from 'react-router-dom' //install route
import { router } from './router.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  
)
 