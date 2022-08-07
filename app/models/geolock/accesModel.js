const { Sequelize } = require("sequelize");
const sequelize = require("../../geoSeq");

const accesSchema = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: Sequelize.STRING(20), allowNull: true },
  code: { type: Sequelize.STRING(10), allowNull: false },
  marker: { type: Sequelize.INTEGER, allowNull: false },
};
module.exports = sequelize.define("acces", accesSchema, {
  tableName: "acces",
  timestamps: false,
  underscored: true,
});