import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Deck from './Deck.tsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from 'react-router-dom'
import './index.css'  

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/decks/:deckId',
    element: <Deck />,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
        <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

