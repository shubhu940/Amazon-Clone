const express = require("express");
const {oilDatas, fruitDatas, grainDatas} = require("../controllers/allData-controller");

const router = express.Router();

router.route("/oil").get(oilDatas);
router.route("/fruit").get(fruitDatas);
router.route("/grain").get(grainDatas);

module.exports= router;