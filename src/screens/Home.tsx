import React from 'react'
import SearchTokens from './SearchTokens'
function Home() {
  return (
    <div className="hero">
      <h1 className="title">Welcome to Crypto</h1>
      <p className="subtitle">A simple crypto currency tracker</p>
      <SearchTokens />
    </div>
  )
}

export default Home
