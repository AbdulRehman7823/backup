const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
    new GoogleStrategy({
        clientID: "161079421135-1ddb9j43odpdo40nt2n39530k827udvi.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
        scope:["profile","email"],
    },
    (accessToken, refreshToken,profile,callback)=>{
        callback(null,profile,accessToken,refreshToken);
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);

});
passport.deserializeUser((user,done)=>{
    done(null,user);
    
})

