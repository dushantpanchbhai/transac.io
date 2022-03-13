const express = require("express");
const asyncHandler = require("express-async-handler");
const UserSchema = require("./UserSchema");
const generateToken = require("./util/generateToken");
const router = express.Router();

const signupHandler = asyncHandler(async (req, res) => {
  console.log("signing in ...");
  const { username, email, password } = req.body;
  const books = [];
  const userExist = await UserSchema.findOne({ email });
  if (userExist) { 
    res.status(400);
    throw new Error("user already exist");
  }
  const user = await UserSchema.create({
    username,
    email,
    password,
    books,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      email: user.email,
      username: user.username,
      books: user.books,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }
});

const loginHandler = asyncHandler(async (req, res) => {
  console.log("logging in ....");
  const { email, password } = req.body;
  const user = await UserSchema.findOne({email});
  if (user && (await user.matchPassword(password))) {
    res.status(201).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

router.route("/createUser").post(signupHandler);
router.route("/login").post(loginHandler);

module.exports = router;
