const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const googleAuth = require("../../middlewares/googleAuth");
const { default: axios } = require("axios");
const Token = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const passport = require("passport");
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User is already Exist!");
      res.status(400).send({ message: "This user already exists" });
    } else {
      user = new User(req.body);
      (user.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString()),
        await user.save();

      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      await sendEmail(user.email, "Verify Email", url);
      res.status(200).send({message:"Please verify your Email"});
    }
  } catch (err) {
    res.status(500).send({ message: "Invalid information" + err });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user)
      return res.status(400).send({ message: "This user is not registered" });

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if (originalPassword != inputPassword)
      return res.status(422).send({ message: "Password is incorrect" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const signedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
    };
    const accessToken = jwt.sign(signedUser, process.env.SECRET_TOKEN);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


/* GET Google Authentication API. */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/", session: false }),
  function(req, res) {
    console.log("----------------------------------------------------");
    console.log(req.user);
    console.log("----------------------------------------------------");


   var token = req.user.token;

      res.redirect("http://localhost:3000?token=" + token);
  }
);


/*
router.get('/login/success',async(req, res)=>{
  console.log("From google");
  console.log(req.body);
  res.status(200).send(req.user);
})
router.post("/google", (req, res) => {
  res.redirect("/api/auth/googleAuth");
});
router.get("/googleAuth", googleAuth);
router.get("/google/callback/", googleAuth, async (req, res) => {
  
  const googleUser = { email: req.user.email, username: req.user.displayName, verified: req.verified,img:req.picture,password:"google",userType:"reader"};
  
  let user = await User.findOne({ email: googleUser.email });
  if(!user){
    const sgUser = await new User(googleUser).save();
    const signedUser = {
      _id: sgUser._id,
      username: sgUser.username,
      email: sgUser.email,
      phone: sgUser.phone,
      userType: sgUser.userType,
    };
    const accessToken = jwt.sign(signedUser, process.env.SECRET_TOKEN);
    res.status(200).json({ accessToken: accessToken });
  }else{
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
  res.redirect("http://localhost:3000/");
})
  


 router.get("/login/success",(req,res)=>{
  console.log("access;;;;;;;;;;;;;")
   try {
    if(req.user){
res.status(200).json({
  error:false,
  user:req.user,
  message:"Successfully logged in"
})
    }else{
res.status(403).json({error:true,message:"Not Authorized"});
    }
   } catch (error) {
    
   }
});
router.get("/login/failed",(req,res)=>{
  res.status(401).json({
    error:true,
    message:"Log in failure",
  })
});

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("http://localhost:3000");
})
router.get("/google",passport.authenticate("google",["profile","email"]))

router.get("/google/callback",
passport.authenticate("google",{
  successRedirect:"http://localhost:3000",
  failureRedirect:"/login/failed"
}))*/







router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).send({ message: "Invalid Verification Link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).send({ message: "Invalid Verification Token" });

    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();

    res.status(200).send({ message: "Email is verified Successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = router;
