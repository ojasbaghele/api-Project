const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeandsql', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize ;