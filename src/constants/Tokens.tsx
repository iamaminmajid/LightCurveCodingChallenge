export const Tokens = [
  {
    Name: 'LISK', // string,
    ISIN: 'LSK', // string,
    lastTradePrice: 87.0, //  number
    priceVariationPercentage: 0.1, // or -0.1 number
    closingPriceVariation: 0.6, // number
    closingPrice: 86.0,
  },
  {
    Name: 'Bitcoin', // string,
    ISIN: 'BTC', // string,
    lastTradePrice: 17270.0, //  number
    priceVariationPercentage: 0.3, // or -0.1 number
    closingPriceVariation: 0.9, // number
    closingPrice: 17970.0,
  },
  {
    Name: 'Ethereum', // string,
    ISIN: 'ETH', // string,
    lastTradePrice: 1687.0, //  number
    priceVariationPercentage: 0.2, // or -0.1 number
    closingPriceVariation: 0.4, // number
    closingPrice: 1586.0,
  },
]

export const TokenSingle = [
  {
    name: 'LISK', // string
    Id: 1, // number
    ISIN: 'LSK', // string
    lastTradePrice: 87.0, // number
    priceVariationPercentage: 0.1, //, or -0.1  number
    closingPriceVariation: 0.6, // number
    closingPrice: 86.0, // number
    queue: [
      {
        askPrice: 85.0, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 86.0, // number
        bidQuantity: 50.00001, // number
        symbolId: 1, // number
        rowPlace: 1, // number
      },
    ],
  },
  {
    name: 'Bitcoin', // string
    Id: 2, // number
    ISIN: 'BTC', // string
    lastTradePrice: 17270.0, // number
    priceVariationPercentage: 0.3, //, or -0.1  number
    closingPriceVariation: 0.9, // number
    closingPrice: 17970.0, // number
    queue: [
      {
        askPrice: 17270.0, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 17270.0, // number
        bidQuantity: 50.00001, // number
        symbolId: 2, // number
        rowPlace: 1, // number
      },
    ],
  },
  {
    name: 'Ethereum', // string
    Id: 3, // number
    ISIN: 'ETH', // string
    lastTradePrice: 1687.0, // number
    priceVariationPercentage: 0.2, //, or -0.1  number
    closingPriceVariation: 0.4, // number
    closingPrice: 1586.0, // number
    queue: [
      {
        askPrice: 1687.0, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 1687.0, // number
        bidQuantity: 50.00001, // number
        symbolId: 3, // number
        rowPlace: 1, // number
      },
    ],
  },
]
