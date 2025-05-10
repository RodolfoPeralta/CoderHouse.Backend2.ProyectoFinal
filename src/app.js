const express = require('express');
const apiRouter = require('./routes/api');
const viewRouter = require('./routes/views/viewRouter');
const viewAuthRouter = require('./routes/views/viewAuthRouter');
const configureHandlebars = require('./config/handlebars/handlebars');
const configureMiddlewares = require('./config/Middlewares/middlewares');
const mongoConnection = require('./config/mongo/mongo');
const configureSession = require('./config/session/session');
const path = require('path');
const configureLocalPassport = require('./config/passport/configureLocalPassport');
const configureJwtPassport = require('./config/passport/configureJwtPassport');
require("dotenv").config();

const app = express();

// MongoDB connection path
const mongoPath = process.env.MONGO_URI;

// MongoDB Connection
mongoConnection(mongoPath);

// Session
configureSession(app, mongoPath);

// Middlewares
configureMiddlewares(app);

// Passport
configureLocalPassport();
configureJwtPassport();

// Static files configuration
app.use("/static", express.static(path.join(__dirname, "./public")));

// Handlebars
configureHandlebars(app);

// Routes
app.use("/", viewAuthRouter);
app.use("/api", apiRouter);
app.use("/views", viewRouter);

module.exports = app;