## Prerequisites
In order to complete this coding challenge you will need to configure a React based development environment.
Background:
Consider you are working on the development of decentralized exchange and you need to build two screens for decentralized exchange as described below.

## Task:
- The first screen is a search bar on top and a list of bookmarked symbol (s).
  - Allow users to search on a symbol by a given token name like BTC, ETH and LSK. The user should see a list of tokens with 3 columns i.e. `Price`, `priceVariationPercentage`, `LastTradePrice`, and a button to add or remove bookmarks from each token.
    - endpoint instrument/symbols.
    - list of cryptocurrencies tokens.
  - Allow user(s) to add/remove token symbols to the bookmark list (the list should be stored in the device storage).
  - Allow users to visit the bookmark list and latest price from a websocket. In this scenario, the pricing of the token changes every 500ms and it should be reflected like this.
  - Allow users to navigate the token details page by clicking on each token.
  - Each bookmark needs to be stored in the device storage and recovered on reopening the application.
  - Each token should get the `LastTradePrice` update from a web socket.
    - It may have a push frequency of up to 7000 updates per second.
    - Please make sure you don't have changes over blackbox websocket functions.
    - `priceVariationPercentage` needs to be recalculated based on `closingPrice` and `LastTradePrice` from the websocket.
- The second screen should contain the token details and show the token name, `lastTradePrice` (priceVariationPercentage), `closingPrice`  (closingPriceVariation), and ask/bid queue.
  - The Last Price should get an update from a web socket with the following conditions:
    - It may have a push frequency of up to 7000 updates per second.
    - Please make sure you don't have changes over blackbox websocket functions.
    - `priceVariationPercentage` needs to be recalculated based on `closingPrice` and `LastTradePrice` from the websocket.
  - Unfortunately, the backend service is not ready for fetching API data so you need to mock the APIs on the client side (we need the ability to switch easily between mocked and real API calls when building the application).
  - Prepare automated tests that perform basic checks against the above challenge.
  
## The API for the tokens is:
```javascript
// endpoint: api/v1/instrument/tokens
// request params: { name : string }
response = [{
    Name: 'LISK', // string,
    ISIN: 'LSK', // string,
    lastTradePrice:87.00, //  number
    priceVariationPercentage: 0.1, // or -0.1 number
    closingPriceVariation: 0.6, // number
    closingPrice: 86.00,
}]
```

The API for the token details is:
```javascript
// endpoint api/v1/instrument/token/:id
// request params: { limit : number = 5 }
response = {
    name: 'LISK', // string 
    Id: 01, // number
    ISIN: 'LSK', // string 
    lastTradePrice: 87.00, // number
    priceVariationPercentage: 0.1, //, or -0.1  number
    closingPriceVariation:  0.6, // number
    closingPrice: 86.00, // number
    queue: [{
        askPrice: 85.00, // number
        askQuantity: 0.47367, // number
        bidNumber: 1003, // number
        bidPrice: 86.00, // number
        bidQuantity: 50.00001, // number
        symbolId: 01, // number 
        rowPlace: 1, // number
    }]
}
```

The subscribe channel of the websocket is:
```javascript 
import { socket } from "src/utils/socket";
channel is `{name}-{tokenId}`
socket.subscribe('channel', (price: number) => {})
```

## Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Feel Free to modify configuration if it's needed

## Contributors
See [contributors section](https://github.com/LiskHQ/coding-challenge-template/graphs/contributors).

## License

Copyright © 2016-2021 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/coding-challenge-template/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.
