const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({

  share1: {
    type: Number,
    required: true,
  },
  stockCode1: {
    type: String,
    required: true,
  },
  share2: {
    type: Number,
    required: true,
  },
  stockCode2: {
    type: String,
    required: true,
  },
  share3: {
    type: Number,
    required: true,
  },
  stockCode3: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  totalReturn: {
    type: Number,
    required: true,
  },
  rateOfReturn: {
    type: String,
    required: true,
  }

});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
