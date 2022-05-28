const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compress = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const { error404Middleware, errorHandler } = require('./middleware');

const app = express();

var corsOptions = {
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    origin: '*',
    allowedHeaders: ['api_key', 'api-key', 'Content-Type', 'Authorization'],
    exposedHeaders: ['api_key', 'api-key', 'Content-Type', 'Authorization']
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(compress());
app.use(helmet());

// Restrict all routes to only 10 requests per IP address every minute
const limiter = rateLimit({
  windowMs: 10 * 60 * 100,    // 1 minute
  max: 10                     // 10 requests per IP
});

app.use(limiter);

app.get('/ping', (req, res) => {
    console.log(pong)
    res.send('pong');
});

app.use('/api', routes);


/**
 * Set health check api
 */

app.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.status(200).send(data);
});


app.use(errorHandler);
app.use(error404Middleware);

function happyEnding() {
  process.exit(0);
}

function sadEnding(err) {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
}

process.on('SIGINT', happyEnding);
process.on('SIGTERM', happyEnding);
process.on('uncaughtException', sadEnding);
process.on('unhandledRejection', sadEnding);

module.exports = app;
