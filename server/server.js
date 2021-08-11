const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const Portfolio = require("../portfolioModel");


// // SETUP
dotenv.config({ path: "./server/.env" });

const app = express();
const port = process.env.PORT || 5000;
//const portfolioRouter = require("./portfolioRoutes");

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser("secretcode"));
//app.use("/api/send-portfolio", portfolioRouter);
const yahooFinance = require('yahoo-finance');
// // DATABASE
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .catch((err) => console.log(err));
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// app.get('/', (req, res) => {
//   const result = await yahooFinance.quote('TSLA');
//   res.json(result)
// })
// app.post("/addname", (req, res) => {
//   var myData = new Portfolio(req.body);
//   myData.save()
//     .then(item => {
//       res.send("item saved to database");
//     })
//     .catch(err => {
//       res.status(400).send("unable to save to database");
//     });
// });
// // ROUTES
// const authRouter = require("./routes/authRoutes");
// const dataRouter = require("./routes/dataRoutes");
// const newsRouter = require("./routes/newsRoutes");
// const stockRouter = require("./routes/stockRoutes");

// app.use("/api/auth", authRouter);
// app.use("/api/data", dataRouter);
// app.use("/api/news", newsRouter);
// app.use("/api/stock", stockRouter);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname + "/../client/build/index.html"));
//     });
// }

// APP
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
