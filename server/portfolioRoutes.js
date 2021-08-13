const express = require("express");
const router = express.Router();
// const auth = require("../controllers/authMiddleware");
const { sendPortfolio } = require("../server/controller");

router.route("/").post(sendPortfolio);


module.exports = router;