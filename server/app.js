var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const adminRouter = require("./routes/api/adminApi");
const authRouter = require("./routes/api/auth");
const productRouter = require("./routes/api/productApi");
const poetRouter = require("./routes/api/PoetApi");
const readerRouter = require("./routes/api/readerApi");
const orderRouter = require("./routes/api/orderApi");
const paymentRouter = require("./routes/api/stripe");
const chatRouter = require("./routes/api/ChatApi");
var debug = require("debug")("fypbackend:server");
const User = require("./models/User");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
var http = require("http");
const passwordResetRoutes = require("./routes/api/PasswordReset")
const { Server } = require("socket.io");
var app = express();
app.use(cors({ origin: true, credentials: true }));
var server = http.createServer(app);
var port = "3000";
/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT || 4000);
server.on("error", onError);
server.on("listening", onListening);

const dotenv = require("dotenv");

dotenv.config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(passport.initialize());
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      try {
        done(false, profile);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
app.use(logger("dev"));
app.use("/api/checkout/webhook", express.raw({ type: "*/*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/poetries", productRouter);
app.use("/api/poet", poetRouter);
app.use("/api/reader", readerRouter);
app.use("/api/order", orderRouter);
app.use("/api/checkout", paymentRouter);
app.use("/api/chat", chatRouter);
app.use('/api/password-reset',passwordResetRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}




const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.DB_Connect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1); // Exit process with failure
  }
};

mongoose.set("strictQuery", true);
connectDB();

module.exports = app;
