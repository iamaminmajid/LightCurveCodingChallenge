import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Bookmarks from '../screens/Bookmarks'
import Home from '../screens/Home'
function AppComponents() {
  return (
    <div>
      <header className="navbar">
        <div className="brand">Crypto</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="home">Bookmarks</Link>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Bookmarks />} />
      </Routes>
    </div>
  )
}

export default AppComponents
