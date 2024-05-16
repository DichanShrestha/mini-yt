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
import ForgotPass from './utils/ForgotPass.jsx';
import YourChannel from './components/YourChannel/YourChannel.jsx';
import Video from './components/Video/Video.jsx';
import Subscriptions from './components/Subscriptions/Subscriptions.jsx';
import LikeVideo from './utils/LikeVideo.jsx';
import History from './components/History/History.jsx';
import Community from './components/Community/Community.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/yourchannel',
    element: <YourChannel />
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
  },
  {
    path: '/forgotpass',
    element: <ForgotPass />
  },
  {
    path: '/playvideo/:id/vid/:vid',
    element: <Video />
  },
  {
    path: '/subscriptions/:channelId',
    element: <Subscriptions />
  },
  {
    path: '/likedvideos',
    element: <LikeVideo />
  },
  {
    path: '/history',
    element: <History />
  },
  {
    path: '/community',
    element: <Community />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
