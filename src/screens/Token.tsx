import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import BidQueue from '../components/BidQueue'
import { TokenSingle } from '../constants/Tokens'
import { socket } from '../utils/socket'

function Token() {
  let tokenId = useParams().id

  const [isBookmarked, setIsBookmarked] = useState(false)

  const tokenImage =
    'https://raw.githubusercontent.com/atomiclabs/cryptocurrency-icons/master/128/color/' +
    tokenId?.toLowerCase() +
    '.png'

  const [token, setToken] = useState<any>(
    TokenSingle.find((t) => t.ISIN === tokenId),
  )

  function toggleBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')

    if (isBookmarked) {
      bookmarks = bookmarks.filter((b: any) => b !== tokenId)
      setIsBookmarked(false)
    } else {
      bookmarks.push(tokenId || '')
      setIsBookmarked(true)
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  function getDataFromWebSocket() {
    let LastTradePriceFromSocket = 0
    socket('LastTradePrice').subscribe(
      `${token.name}-${tokenId}`,
      (data: number) => {
        LastTradePriceFromSocket = data
      },
    )
    let ClosingPriceFromSocket = 0
    socket('ClosingPrice').subscribe(
      `${token.name}-${tokenId}`,
      (data: number) => {
        ClosingPriceFromSocket = data
      },
    )

    setInterval(() => {
      let priceVariation = LastTradePriceFromSocket - ClosingPriceFromSocket
      let priceVariationPercentage =
        (priceVariation / ClosingPriceFromSocket) * 100

      setToken({
        ...token,
        lastTradePrice: LastTradePriceFromSocket,
        closingPrice: ClosingPriceFromSocket,
        priceVariationPercentage: priceVariationPercentage,
        closingPriceVariation: priceVariation,
      })
    }, 500)
  }

  useEffect(() => {
    setIsBookmarked(
      JSON.parse(localStorage.getItem('bookmarks') || '[]')?.includes(
        tokenId,
      ) || false,
    )
    getDataFromWebSocket()

    //In case of API call
    // const config = {
    //   url: `api/v1/instrument/token/${tokenId}`,
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     limit: 10,
    //   },
    // }
    // axios(config)
    //   .then((response) => {
    //     setToken(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })
  }, [tokenId])

  return (
    <div className="hero">
      <h1>
        <FontAwesomeIcon
          icon={regular('circle-left')}
          style={{ marginRight: '15px', cursor: 'pointer' }}
          onClick={() => window.history.back()}
        />
        Token Details
      </h1>
      <div className="main">
        <div className="token-details">
          <div className="token-details__left">
            <div className="token-image">
              <img src={tokenImage} alt="token" />
            </div>
            <div className="token-name">
              <h2>{token.name}</h2>
            </div>
          </div>
          <div className="token-details__right">
            <div className="token-bookmarked">
              <span className="mr-25">
                {token.priceVariationPercentage.toFixed(2)}%
                {token.priceVariationPercentage > 0 ? (
                  <FontAwesomeIcon
                    icon={solid('caret-up')}
                    style={{ color: 'green' }}
                    size="2x"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={solid('caret-down')}
                    style={{ color: 'red' }}
                    size="2x"
                  />
                )}
              </span>
              <FontAwesomeIcon
                icon={isBookmarked ? solid('bookmark') : regular('bookmark')}
                style={{ marginRight: '15px', cursor: 'pointer' }}
                onClick={toggleBookmark}
                size="2x"
              />
            </div>
          </div>
        </div>
        <div className="token-info">
          <div className="token-info-box">
            <div className="label">Last Trade Price</div>
            <span>{token.lastTradePrice} USD</span>
          </div>
          <div className="token-info-box">
            <div className="label">Closing Price</div>
            <span>{token.closingPrice} USD</span>
          </div>
          <div className="token-info-box">
            <div className="label">Closing Price Variation</div>
            <span>{token.closingPriceVariation.toFixed()} USD</span>
          </div>
          <div className="token-info-box">
            <div className="label">Price Variation Percentage</div>
            <span>{token.priceVariationPercentage.toFixed(2)}%</span>
          </div>
        </div>
        <div className="token-queue">
          <BidQueue queue={token.queue} />
        </div>
      </div>
    </div>
  )
}

export default Token
