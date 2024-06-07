'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const calendar = require('./calendar');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const User = require("./user")(sequelize, Sequelize);
db.User = User;

const Club = require("./club")(sequelize, Sequelize);
db.Club = Club;

const Calendar = require("./calendar")(sequelize, Sequelize);
db.Calendar = Calendar;

const Member = require("./member")(sequelize, Sequelize);
db.Member = Member;

const Application = require("./application")(sequelize, Sequelize);
db.Application = Application;

Club.hasMany(User, { foreignKey: 'club_id' });
User.belongsTo(Club, { foreignKey: 'club_id' });

Club.hasMany(Calendar, { foreignKey: 'club_id' });
Calendar.belongsTo(Club, { foreignKey: 'club_id' });

Club.hasMany(Member, { foreignKey: 'club_id' });
Member.belongsTo(Club, { foreignKey: 'club_id' });

Club.hasMany(Application, { foreignKey: 'club_id' });
Application.belongsTo(Club, { foreignKey: 'club_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
