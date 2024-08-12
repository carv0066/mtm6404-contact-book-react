import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './pages/Details';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

const routes = createBrowserRouter([
  {path:'/', element: <App />},
  {path:'/details/:id', element: <Details />},
  {path:'/add-contact/', element: <AddContact /> },
  {path:'/edit-contact/:id', element: <EditContact />}
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </React.StrictMode>
)
