const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("../utils/appError");
const globalErrorHandler = require("../controllers/error");
const areasRoutes = require("../routes/areas");
const spectrumRoutes = require("../routes/spectrum");

const ExpressLoaders = ({ app }) => {
  app = express();

  // MIDDLEWARES
  /**
   * Set security HTTP headers
   */
  app.use(helmet());

  /**
   * Development logging
   */
  app.use(morgan("dev"));

  /**
   * Enable CORS only for specific origin
   */
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    }),
  );

  /**
   * parse incoming requests with JSON payloads
   */
  app.use(express.json({ limit: "10kb" }));

  /**
   * Data sanitization against NoSQL injection
   */
  app.use(mongoSanitize());
  /**
   * Data sanitization against XSS
   */
  app.use(xss());
  /**
   * Prevent parameter pollution
   */
  app.use(hpp());

  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // allows 100 requests in 60 mins
    message: "Too many requests, try again later!",
  });

  app.use("/api", limiter);

  // routes
  app.use("/api/v1/areas", areasRoutes);
  app.use("/api/v1/spectrum", spectrumRoutes);
  
  // handling unexpected routes
  app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on the server`), 404);
  });

  app.use(globalErrorHandler);

  return app;
};

module.exports = ExpressLoaders;
