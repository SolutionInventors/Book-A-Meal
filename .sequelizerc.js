const path = require('path');

module.exports = {
  "config": path.resolve('./server/persistent/config', 'config.json'),
  "models-path": path.resolve('./server/persistent/'),
  "seeders-path": path.resolve('./server/persistent/seeders'),
  "migrations-path": path.resolve('./server/persistent/migrations')
};