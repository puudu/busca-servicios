const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

const AppError = require("./utils/appError");
const reviewRouter = require("./routers/reviewRouter");
const serviceRouter = require("./routers/serviceRouter");
const categoryRouter = require("./routers/categoryRouter");
const userRouter = require("./routers/userRouter");
const comunaRouter = require("./routers/comunaRouter");
const regionRouter = require("./routers/regionRouter");

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize());
app.use(xss());

// limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour.",
});
app.use("/api", limiter);

// ROUTES
// EXAMPLE: app.use('/api/v1/tours', tourRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comunas", comunaRouter);
app.use("/api/v1/regiones", regionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
