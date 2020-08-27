import express from "express";
// Middlewares
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import apiRouter from "./routers/apiRouter";
import cors from "cors";
import globalRouter from "./routers/globalRouter";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import "./passport";

const allowList = ["https://gpoopmap.netlify.app", "http://localhost:3000"];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;

  if (
    allowList.findIndex((element) => element === req.header("Origin")) !== -1
  ) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet()); // Express App에 도움을 주는 미들웨어
app.use(cookieParser()); // Session을 다루기 위한 미들웨어
app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해하게 해주는 미들웨어
app.use(morgan("dev")); // Logging에 도움을 주는 미들웨어

app.set("trust proxy", 1); //trust first proxy

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use(routes.home, cors(corsOptionsDelegate), globalRouter);
app.use(routes.api, cors(corsOptionsDelegate), apiRouter);

export default app;
