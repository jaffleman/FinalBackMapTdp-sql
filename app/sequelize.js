const { Sequelize } = require("sequelize");
// console.log(process.env.PG_URL);
// Ici on crée l'objet de type sequelize que tout mes models vont utiliser pour communiquer avec la BDD
const sequelize = new Sequelize(process.env.PG_URL, {
  // ici on peut rajouter des options
  // comme par exemple des elements que l'on veut ajouter à tout les models
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = sequelize;
