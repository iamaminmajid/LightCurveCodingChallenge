import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useState, useEffect } from 'react'
import { Tokens } from '../constants/Tokens'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Bookmarks() {
  const [bookmarks, setBookmarks] = React.useState<string[]>([])
  const [tokens, setTokens] = React.useState<any[]>(Tokens)

  function removeBookmark(token: any) {
    let newBookmarks: string[] = [...bookmarks]
    newBookmarks = newBookmarks.filter((b) => b !== token)
    setBookmarks(newBookmarks)

    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
  }

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
      setBookmarks(JSON.parse(bookmarks))
    }
  }, [])

  return (
    <div className="hero">
      <h1 className="title">Bookmarks</h1>
      <p className="subtitle">A simple crypto currency tracker</p>
      <div className="search-results">
        {bookmarks.map((bookmark) => {
          const token = tokens.find((t) => t.ISIN === bookmark)
          return (
            <div className="search-result" key={token.ISIN}>
              <div className="search-col">
                <div className="label">Token</div>
                <span>{token.ISIN}</span>
              </div>
              <div className="search-col">
                <div className="label">Closing Price</div>
                <span>{token.closingPrice}</span>
              </div>
              <div className="search-col">
                <div className="label">Last Trade Price</div>
                <span>{token.lastTradePrice}</span>
              </div>
              <div className="search-col">
                <div className="label">Price Variation Percentage</div>
                <span>{token.priceVariationPercentage}</span>
              </div>
              <div className="search-col">
                <FontAwesomeIcon
                  icon={solid('remove')}
                  size={'1x'}
                  onClick={() => removeBookmark(token.ISIN)}
                  className="bookmark"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Bookmarks
