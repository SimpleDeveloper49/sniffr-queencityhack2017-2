"use strict";
module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define(
    "Phone",
    {
      phoneId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "phone_id"
      },
      phoneNumber: {
        type: DataTypes.TEXT,
        field: "phone_number",
        validate: {
          isNumeric: {
            args: [true],
            msg: "Phone Numbers must be numeric."
          }
        }
      }
    },
    {
      underscored: true,
      underscoredAll: true,
      version: true
    }
  );

  return Phone;
};
