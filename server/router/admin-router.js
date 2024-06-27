const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  getAllUsers,
  deleteUserById,
  addFruits,
  updateFruits,
  deleteFruitById,
  addOils,
  updateOils,
  addGrains,
  updateGrains,
} = require("../controllers/admin-controller");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  },
});

// Fetch all users
router.get("/users", getAllUsers);

// Delete a user by ID
router.delete("/users/delete/:id", deleteUserById);

// Add a fruit
router.post("/fruits/add", upload.single("image"), addFruits);

// Update a fruit
router.put("/fruits/update/:id", upload.single("image"), updateFruits);
//delete a fruit
router.delete("/fruits/delete/:id", deleteFruitById);
// Add a oil
router.post("/oils/add", upload.single("image"), addOils);

// Update a oil
router.put("/oils/update/:id", upload.single("image"), updateOils);
// Add a grain
router.post("/grains/add", upload.single("image"), addGrains);

// Update a grain
router.put("/grains/update/:id", upload.single("image"), updateGrains);

module.exports = router;
