const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");



// // SETUP
dotenv.config({ path: "./server/.env" });

const app = express();
const port = process.env.PORT || 5000;
const portfolioRouter = require("../server/portfolioRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("secretcode"));
app.use("/send-portfolio", portfolioRouter);

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


// app.get('/', async (req, res) => {
//   try {
//     const result = await yahooFinance.quote('TSLA');
//     res.send(result)
//   }
//   catch (error) {
//     return res.send(error)
//   }
// }
// )



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
