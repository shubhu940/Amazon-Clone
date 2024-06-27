const AddressModel = require("../models/address");

const customer_address = async(req, res) => {
  try {
    const addressData  = req.body;

    const Address = await AddressModel.create(addressData);
    
    res.status(200).json({
      msg: "saved Sucessful"
    });
  } catch (error) {
    res.status(400).json({ message: "failed to save" });
  }
};

module.exports = customer_address;
