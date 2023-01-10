const passport = require("passport");

const verifyCallback = (req, resolve, reject) => async (err, user) => {
  if (err || !user) {
    return reject(new Error("You are not authenticated by google!"));
  }

  req.user = user;

  resolve();
};

const googleAuth = async (req, res, next) =>
  new Promise((resolve, reject) => {
    console.log("from promise", req.query);
    passport.authenticate(
      "google",
      
      {
        successRedirect:"http://localhost:3000/",
        failureRedirect:"http://localhost:3000/",
        scope: ["email", "profile"],
        session: false,
      },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));

module.exports = googleAuth;
