import { useEffect, useState } from 'react'
import { Tokens } from '../constants/Tokens'
import Results from './Results'

function SearchTokens() {
  const [search, setSearch] = useState('')
  const [tokens, setTokens] = useState(Tokens)

  const [bookmarks, setBookmarks] = useState<string[]>([])

  function toggleBookmark(token: any) {
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
    // axios
    //   .get('api/v1/instrument/tokens')
    //   .then((response) => {
    //     setTokens(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })
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
              let bookmarked =
                bookmarks.find((b) => b == token.ISIN) != undefined
                  ? true
                  : false
              return (
                <Results
                  bookmarked={bookmarked}
                  token={token}
                  toggleBookmark={toggleBookmark}
                  key={token.ISIN}
                />
              )
            }
          })
        ) : (
          <>
            <small>Start typing to see results</small>
          </>
        )}
      </div>

      <div className="bookmarks-list mt-25">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark: string) => {
            let bookmarkedToken = tokens.find((t) => t.ISIN === bookmark)
            if (bookmarkedToken != undefined) {
              return (
                <Results
                  token={bookmarkedToken}
                  toggleBookmark={toggleBookmark}
                  key={bookmarkedToken.ISIN}
                />
              )
            }
          })
        ) : (
          <>
            <small>No Bookmarks Found</small>
          </>
        )}
      </div>
    </>
  )
}

export default SearchTokens
