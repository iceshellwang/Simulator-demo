// const Portfolio = require("../portfolioModel");

// const axios = require("axios");
// const Stock = require("../models/stockModel");

const yahooFinance = require('yahoo-finance');
exports.sendPortfolio = async (req, res) => {
  const { stockCode, share, startDate, endDate } = req.body;
  try {

    const result = await yahooFinance.historical({
      symbol: stockCode,
      from: startDate,
      to: endDate,

    });
    const len = result.length
    const priceChange = result[len - 1].adjClose - result[0].adjClose
    const totalReturn = priceChange * share
    console.log(req.body)

    return res.status(200).json({
      status: "success",
      totalReturn: totalReturn,
    });

  }



  catch (error) {
    console.log(error)
    return res.send(error)
  }

}



// const getResult = async (stocks) => {
//   try {
//     const promises = stocks.map(async (stock) => {


//       const result = await yahooFinance.historical({ 
//         symbol: stockCode,
//         from: startDate,
//         to: endDate})
//       return {
//         ticker: stock.ticker,

//       };
//     });

//     return Promise.all(promises);
//   } catch (error) {
//     return [];
//   }
// };




// const getStockData = async (stocks) => {
//   try {
//     const promises = stocks.map(async (stock) => {
//       const url = `https://api.tiingo.com/tiingo/daily/${stock.ticker}/prices?token=${process.env.TIINGO_API_KEY}`;
//       const response = await axios.get(url);
//       return {
//         ticker: stock.ticker,
//         date: response.data[0].date,
//         adjClose: response.data[0].adjClose,
//       };
//     });

//     return Promise.all(promises);
//   } catch (error) {
//     return [];
//   }
// };
//return ROA for this portfolio
// exports.testPortfolio = async (req, res) => {
//   const { stockCode, share, stockCode2, share2, stockCode3, share3, startDate, endDate } = req.body;
//   try {
//     // if (req.user !== req.params.userId) {
//     //   return res.status(200).json({
//     //     status: "fail",
//     //     message: "Credentials couldn't be validated.",
//     //   });
//     // }

//     //const stocks = await Stock.find({ userId: req.params.userId });
//     const stocksData = await getStockData(stocks);
//     const modifiedStocks = stocks.map((stock) => {
//       let name;
//       let currentPrice;
//       let currentDate;
//       data.stockData.forEach((stockData) => {
//         if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
//           name = stockData.name;
//         }
//       });

//       stocksData.forEach((stockData) => {
//         if (stockData.ticker.toLowerCase() === stock.ticker.toLowerCase()) {
//           currentDate = stockData.date;
//           currentPrice = stockData.adjClose;
//         }
//       });

//       return {
//         id: stock._id,
//         ticker: stock.ticker,
//         name,
//         purchasePrice: stock.price,
//         purchaseDate: stock.date,
//         quantity: stock.quantity,
//         currentDate,
//         currentPrice,
//       };
//     });

//     return res.status(200).json({
//       status: "success",
//       stocks: modifiedStocks,
//     });
//   } catch (error) {
//     return res.status(200).json({
//       status: "fail",
//       message: "Something unexpected happened.",
//     });
//   }
// };

