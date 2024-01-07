import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { routes } from './routers/index.jsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
