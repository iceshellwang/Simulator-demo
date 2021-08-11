const express = require("express");
const router = express.Router();
// const auth = require("../controllers/authMiddleware");
const { sendPortfolio } = require("../controller");

router.route("/send-portfolio").post(sendPortfolio);


module.exports = router;