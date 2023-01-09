const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const googleAuth = require("../../middlewares/googleAuth");
const { default: axios } = require("axios");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User is already Exist!")
      res.status(422).send({ message: "This user already exists" });
    } else {
      user = new User(req.body);
      (user.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()),
        await user.save();
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send({ message: "Invalid information" + err });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;

    console.log(inputPassword + "    " + originalPassword);
    if (originalPassword != inputPassword) {
      res.status(422).send({ message: "Password is incorrect" });
    } else {
      const signedUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
      };
      const accessToken = jwt.sign(signedUser, process.env.SECRET_TOKEN);
      res.status(200).json({ accessToken: accessToken });
    }
  } else {
    res.status(500).send({ message: "This user is not registered." });
  }
});
router.post("/google", (req, res) => {
  res.redirect("/api/auth/googleAuth");
});
router.get("/googleAuth", googleAuth);
router.get("/google/callback/", googleAuth, (req, res) => {
  const user = { email: req.user.email, fullName: req.user.displayName };

  res.status(200).redirect("http://localhost:3000/login");
});

module.exports = router;