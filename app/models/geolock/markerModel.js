const { Sequelize } = require("sequelize");
const sequelize = require("../../geoSeq");

const markerSchema = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true  },
  longitude: { type: Sequelize.INTEGER, allowNull: false },
  latitude: { type: Sequelize.INTEGER, allowNull: false },
};
module.exports = sequelize.define("m", markerSchema, {
  tableName: "marker",
  timestamps: false,
  // underscored: true,
});