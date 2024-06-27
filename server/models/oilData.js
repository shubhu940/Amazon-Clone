const {Schema, model} = require("mongoose");

const oilDataSchema = new Schema({
    
category:{type:String, required: true},
title:{type:String, required: true},
imgSrc:{type:String, required: true},
description:{type:String, required: true},
price:{type:String, required: true},
});

const OilData = new model("OilData",oilDataSchema,"Oils");

module.exports = OilData;