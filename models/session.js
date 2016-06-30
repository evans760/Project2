'use strict';
module.exports = function(sequelize, DataTypes) {
  var session = sequelize.define('session', {
    user_id: DataTypes.INTEGER,
    beach_id: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.session.belongsTo(models.user);
        models.session.belongsTo(models.beach);
      }
    }
  });
  return session;
};
