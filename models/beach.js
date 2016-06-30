'use strict';
module.exports = function(sequelize, DataTypes) {
  var beach = sequelize.define('beach', {
    name_id: DataTypes.INTEGER,
    beach_id: DataTypes.INTEGER,
    surfline_spot_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.beach.hasMany(models.session);
      }
    }
  });
  return beach;
};
