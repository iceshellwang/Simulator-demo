const express = require("express");
const router = express.Router();
// const auth = require("../controllers/authMiddleware");
const { sendPortfolio, getLastPortfolio } = require("../server/controller");

router.route("/").post(sendPortfolio);
router.route("/").get(getLastPortfolio);


module.exports = router;