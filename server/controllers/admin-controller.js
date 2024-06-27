// adminController.js

const User = require("../models/user");
const FruitData = require("../models/fruitData");
const OilData = require("../models/oilData");
const GrainData = require("../models/grainData");
// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, { password: 0 }); // Exclude password field
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users from database:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user from database:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
// Delete a Fruit by ID
const deleteFruitById = async (req, res) => {
  try {
    const Id = req.params.id;
    const deletedFruit = await FruitData.findByIdAndDelete(Id);
    if (!deletedFruit) {
      return res.status(404).json({ msg: "Fruit not found" });
    }
    return res.status(200).json({ msg: "Fruit deleted successfully" });
  } catch (error) {
    console.error("Error deleting user from database:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const addFruits = async (req, res) => {
  const fruit = new FruitData({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imgSrc: req.file ? "/uploads/" + req.file.filename : "",
  });
  try {
    const newFruit = await fruit.save();
    res.status(201).json(newFruit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const addOils = async (req, res) => {
  const oil = new OilData({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imgSrc: req.file ? "/uploads/" + req.file.filename : "",
  });
  try {
    const newOil = await oil.save();
    res.status(201).json(newOil);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const addGrains = async (req, res) => {
  const grain = new GrainData({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imgSrc: req.file ? "/uploads/" + req.file.filename : "",
  });
  try {
    const newGrain = await grain.save();
    res.status(201).json(newGrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFruits = async (req, res) => {
  try {
    const fruit = await FruitData.findById(req.params.id);
    if (!fruit) return res.status(404).json({ message: "Fruit not found" });

    fruit.category = req.body.category;
    fruit.title = req.body.title;
    fruit.description = req.body.description;
    fruit.price = req.body.price;

    if (req.file) {
      fruit.imgSrc = "/uploads/" + req.file.filename;
    }

    const updatedFruit = await fruit.save();
    res.json(updatedFruit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateOils = async (req, res) => {
  try {
    const oil = await OilData.findById(req.params.id);
    if (!oil) return res.status(404).json({ message: "Oil not found" });

    oil.category = req.body.category;
    oil.title = req.body.title;
    oil.description = req.body.description;
    oil.price = req.body.price;

    if (req.file) {
      oil.imgSrc = "/uploads/" + req.file.filename;
    }

    const updatedOil = await oil.save();
    res.json(updatedOil);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateGrains = async (req, res) => {
  try {
    const grain = await GrainData.findById(req.params.id);
    if (!grain) return res.status(404).json({ message: "grain not found" });

    grain.category = req.body.category;
    grain.title = req.body.title;
    grain.description = req.body.description;
    grain.price = req.body.price;

    if (req.file) {
      grain.imgSrc = "/uploads/" + req.file.filename;
    }

    const updatedGrain = await grain.save();
    res.json(updatedGrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUserById,
  addFruits,
  updateFruits,
  deleteFruitById,
  addOils,
  updateOils,
  addGrains,
  updateGrains,
};
