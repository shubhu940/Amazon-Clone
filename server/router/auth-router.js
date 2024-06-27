const express = require("express");
const router = express.Router();
const { register, login,user,admin} = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware,user);
router.route("/admin_login").post(admin);

module.exports = router;
