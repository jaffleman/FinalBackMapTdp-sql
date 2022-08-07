const { Sequelize } = require("sequelize");
const sequelize = require("../../geoSeq");

const markerSchema = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  longitude: { type: Sequelize.DOUBLE, allowNull: false },
  latitude: { type: Sequelize.DOUBLE, allowNull: false },
};
module.exports = sequelize.define("acces", markerSchema, {
  tableName: "marker",
  timestamps: false,
  underscored: true,
});