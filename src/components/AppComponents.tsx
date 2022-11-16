import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../screens/Home'
import Token from '../screens/Token'
function AppComponents() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Token />} />
      </Routes>
    </div>
  )
}

export default AppComponents
