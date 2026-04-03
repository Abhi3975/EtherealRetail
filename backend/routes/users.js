const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "fallback_secret_ethereal_999",
    {
      expiresIn: "30d",
    },
  );
};

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Whoa there, you forgot some fields.",
        });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Looks like an account with that email already exists.",
        });
    }

    const user = await User.create({
      name,
      email,
      hashedPassword: password,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: "Welcome to the club. Don't forget your password.",
        token: generateToken(user._id, user.role),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+hashedPassword");

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        message:
          user.role === "admin"
            ? "Admin detected. Dashboard access granted."
            : "Logged in. Grab a cart.",
        token: generateToken(user._id, user.role),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid email or password. Try again?",
        });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
