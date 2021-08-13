let Portfolio = require("../server/portfolioModel");
const yahooFinance = require('yahoo-finance');

exports.sendPortfolio = async (req, res) => {
  const { stockCode1, share1, stockCode2, share2, stockCode3, share3, startDate, endDate } = req.body;
  const stockCodeArr = [stockCode1, stockCode2, stockCode3];

  try {

    const result = await yahooFinance.historical({
      symbols: stockCodeArr,
      from: startDate,
      to: endDate,

    });

    const stock1 = Object.values(result)[0]
    const stock2 = Object.values(result)[1]
    const stock3 = Object.values(result)[2]

    const stock1PriceChange = stock1[0].adjClose - stock1[stock1.length - 1].adjClose
    const investStock1 = stock1[stock1.length - 1].adjClose * share1
    const returnStock1 = stock1PriceChange * share1
    const stock2PriceChange = stock2[0].adjClose - stock2[stock2.length - 1].adjClose
    const investStock2 = stock2[stock2.length - 1].adjClose * share2
    const returnStock2 = stock2PriceChange * share2
    const stock3PriceChange = stock3[0].adjClose - stock3[stock3.length - 1].adjClose
    const investStock3 = stock3[stock3.length - 1].adjClose * share3
    const returnStock3 = stock3PriceChange * share3
    const totalReturn = (returnStock1 + returnStock2 + returnStock3).toFixed(2)
    const rateOfReturn = totalReturn / (investStock1 + investStock2 + investStock3)
    var formatedRateOfReturn = Number(rateOfReturn * 100).toFixed(1);
    formatedRateOfReturn += "%";

    //save to DB
    const newPortfolio = new Portfolio({
      stockCode1,
      share1,
      stockCode2,
      share2,
      stockCode3,
      share3,
      startDate,
      endDate,
      totalReturn,
      rateOfReturn: formatedRateOfReturn,
    });
    await newPortfolio.save()

    return res.status(200).json({
      status: "success",
      totalReturn: totalReturn,
      rateOfReturn: formatedRateOfReturn
    });

  }

  catch (error) {
    console.log(error)
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }

}



exports.getLastPortfolio = async (req, res) => {

  try {

    const lastPortfolio = await Portfolio.find().sort({ $natural: -1 }).limit(1);
    console.log(lastPortfolio[0])

    return res.status(200).json({
      status: "success",
      lastPortfolio: lastPortfolio[0],
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "Something unexpected happened.",
    });
  }
};

