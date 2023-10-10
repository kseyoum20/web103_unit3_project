import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:locationId',
      element: <LocationEvents />
    },
    // If I decide to have a single event detail page
    // {
    //   path: '/events/:eventId',
    //   element: <Event />
    // }
  ]);

  return (
    <div className='app'>
      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>
        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          {/* Remove if I don't have a standalone event detail page */}
          {/* <Link to='/events' role='button'>Events</Link> */}
        </div>
      </header>
      <main>
        {element}
      </main>
    </div>
  )
}

export default App
