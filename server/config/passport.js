var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(
 new GoogleStrategy(
  {
    clientID: "161079421135-1ddb9j43odpdo40nt2n39530k827udvi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/api/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
   var userData = {
    email: profile.emails[0].value,
    name: profile.displayName,
    token: accessToken
   };
   done(null, userData);
  }
 )
);