const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming User is the model name for user collection
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  colony: {
    type: String,
    required: true,
  },
  houseno: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;
