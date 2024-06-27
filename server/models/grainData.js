const { Schema, model } = require("mongoose");

const grainDataSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

const GrainData = new model("GrainData", grainDataSchema, "Grains");

module.exports = GrainData;
