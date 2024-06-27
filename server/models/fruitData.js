const { Schema, model } = require("mongoose");

const fruitDataSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

const FruitData = new model("FruitData", fruitDataSchema, "Fruits");

module.exports = FruitData;
