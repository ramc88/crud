const mongoose = require('mongoose');
const config = require('config');

const seedDb = require('../scripts/seedDb');

function init() {
  let url = config.get('db.url');

  // reads environment vars for db connection
  if (process.env.DB_HOST) {
    url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  }

  if (!url) throw new Error('No db url specified');

  mongoose.connect(
    url,
    {
      autoIndex: false,
      auto_reconnect: true,
      useNewUrlParser: true,
    },
  );

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });

  mongoose.set('useFindAndModify', false);
  mongoose.set('debug', false);

  mongoose.connection.on('connected', async () => {
    console.log('Mongoose default connection open');
    await seedDb.run();
  });
}

module.exports = {
  init,
};