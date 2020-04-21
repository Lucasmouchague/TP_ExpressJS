'use strict';
module.exports = (sequelize, DataTypes) => {
  const Faille = sequelize.define('Faille', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    score: DataTypes.FLOAT,
    description: DataTypes.TEXT
  }, {});
  Faille.associate = function(models) {
    // associations can be defined here
  };
  return Faille;
};