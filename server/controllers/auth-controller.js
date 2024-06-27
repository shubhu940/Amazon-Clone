
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const UserCreated = await User.create({
      name,
      email,
      mobile,
      password,
    });
    res.status(201).json({
      msg: UserCreated,
      // token: await UserCreated.generateToken(),
      userId: UserCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }


};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // const user = await bcrypt.compare(password,userExist.password);

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "login Sucessful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),

      });

    } else {
      res.status(401).json({ msg: "Invalid email or password" })
    }

  } catch (error) {
    res.status(500).json("internal server error");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error from the user route: ${error}`);
    res.status(500).json({ msg: "Server error" });
  }
};

const admin = async (req, res) => {
  const { email, password } = req.body;
  if (email === "shubhu@gmail.com" && password === "shubhu") {
    return res.json({ message: "admin login success" });
  } else {
    return res.status(401).json({ message: "Incorrect password" });
  }
};






module.exports = { register, login, user, admin };
