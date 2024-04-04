import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from './auth/SignIn.jsx';
import Step1 from './auth/Register/Step1.jsx'
import Step2 from './auth/Register/Step2.jsx'
import Step3 from './auth/Register/Step3.jsx'
import Signout from './auth/Signout.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/stepOne',
    element: <Step1 />
  },
  {
    path: '/stepTwo',
    element: <Step2 />
  },
  {
    path: '/stepThree',
    element: <Step3 />
  },
  {
    path: '/signout',
    element: <Signout />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
