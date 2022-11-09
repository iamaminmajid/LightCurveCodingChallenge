import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import {
  solid,
  regular,
  brands,
  icon,
} from '@fortawesome/fontawesome-svg-core/import.macro'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tokens } from '../constants/Tokens'

function SearchTokens() {
  const [search, setSearch] = useState('')
  const [tokens, setTokens] = useState(Tokens)

  const [bookmarks, setBookmarks] = useState<string[]>([])

  function addBookmark(token: any) {
    let newBookmarks: string[] = [...bookmarks]

    if (newBookmarks.includes(token)) {
      newBookmarks = newBookmarks.filter((b) => b !== token)
      setBookmarks(newBookmarks)
    } else {
      newBookmarks.push(token)
      setBookmarks(newBookmarks)
    }

    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
  }

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem('bookmarks') || '[]'))
    //In case of API call
    axios
      .get('api/v1/instrument/tokens')
      .then((response) => {
        setTokens(response.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  return (
    <>
      <input
        type="text"
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="search-results">
        {search ? (
          tokens.map((token) => {
            if (token.ISIN.toLowerCase().includes(search.toLowerCase())) {
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
                      icon={
                        bookmarks.find((b) => b == token.ISIN) != undefined
                          ? solid('bookmark')
                          : regular('bookmark')
                      }
                      size={'1x'}
                      onClick={() => addBookmark(token.ISIN)}
                      className="bookmark"
                    />
                  </div>
                </div>
              )
            }
          })
        ) : (
          <>
            <small>Start typing to see results</small>
          </>
        )}
      </div>
    </>
  )
}

export default SearchTokens
