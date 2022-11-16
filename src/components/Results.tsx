import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import { socket } from '../utils/socket'
interface Props {
  token: any
  bookmarked?: boolean
  toggleBookmark: (token: any) => void
}

function Results({ token, bookmarked = true, toggleBookmark }: Props) {
  const [tokenPrice, setTokenPrice] = useState(0)
  const [tokenPriceVariation, setTokenPriceVariation] = useState(0)
  const [lastTradePrice, setLastTradePrice] = useState(0)

  function PriceFromSocket() {
    let lastTrade = 0
    socket('LastTradePrice').subscribe(
      `${token.name}-${token.ISIN}`,
      (data: number) => {
        lastTrade = data
      },
    )
    let closing = 0
    socket('ClosingPrice').subscribe(
      `${token.name}-${token.ISIN}`,
      (data: number) => {
        closing = data
      },
    )

    setInterval(() => {
      setTokenPrice(closing)
      setLastTradePrice(lastTrade)
      setTokenPriceVariation((lastTrade - closing) * 100)
    }, 500)
  }

  useEffect(() => {
    PriceFromSocket()
  }, [])
  return (
    <div className="search-result">
      <Link className="search-result__left" to={`/${token.ISIN}`}>
        <div className="search-col">
          <div className="label">Token</div>
          <span>{token.ISIN}</span>
        </div>
        <div className="search-col">
          <div className="label">Price</div>
          <span>{tokenPrice}</span>
        </div>
        <div className="search-col">
          <div className="label">Last Trade Price</div>
          <span>{lastTradePrice}</span>
        </div>
        <div className="search-col">
          <div className="label">Price Variation Percentage</div>
          <span>
            {tokenPriceVariation.toFixed(2)}%
            {tokenPriceVariation > 0 ? (
              <FontAwesomeIcon
                icon={solid('caret-up')}
                style={{ color: 'green' }}
                size="1x"
              />
            ) : (
              <FontAwesomeIcon
                icon={solid('caret-down')}
                style={{ color: 'red' }}
                size="1x"
              />
            )}
          </span>
        </div>
      </Link>
      <div className="search-result__right">
        <div className="search-col">
          <FontAwesomeIcon
            icon={bookmarked ? solid('bookmark') : regular('bookmark')}
            size={'1x'}
            onClick={() => toggleBookmark(token.ISIN)}
            className="bookmark"
          />
        </div>
      </div>
    </div>
  )
}

export default Results
