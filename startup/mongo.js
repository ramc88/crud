const mongoose = require('mongoose');
const config = require('config');

const seedDb = require('../scripts/seedDb');

function init() {
  const url = process.env.MONGO || config.get('db.url');
  console.log('mongourl: ', url)

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