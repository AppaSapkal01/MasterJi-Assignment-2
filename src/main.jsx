import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import RandomUser from './components/RandomUser.jsx'
import RandomJokes from './components/RandomJokes.jsx'
import CatsListing from './components/CatsListing.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/random-user" replace />,

  },
  {
    path: 'random-user',
    element: <RandomUser />,
  },
  {
    path: 'random-jokes',
    element: <RandomJokes />
  },
  {
    path: 'cats-listing',
    element: <CatsListing />
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
