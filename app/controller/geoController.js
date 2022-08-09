const tdps = require("../models/tdp/tdpModel");
const marker = require("../models/geolock/markerModel");
const acces = require('../models/geolock/accesModel');
const { Op } = require("sequelize");

marker.hasMany(acces, {foreignKey:'id'}); // id d'un element de repartiteur correspond a plusieurs elements de tdps (1 to many)
acces.belongsTo(marker,{foreignKey:'mk'});//le champ 'reglette_type' d'un element de tdps correspond a un seul element de la table reglette (1 to 1)
const TOLERANCE= 5
const SCREAN_TOLERANCE= 70
const geoControler = {

  async search(req, res) {
    console.log(req.body)
    res.json({return:'reponse'})
  },


  async searchByPosition(req, res) {
    console.log(req.body)
  },


  async findAllMarker(req, res) {
    console.log(req.body)
    const longitude = Math.round(req.body.longitude * 100000)
    const latitude = Math.round(req.body.latitude * 100000)
    const intervalLat = [latitude-SCREAN_TOLERANCE, latitude+SCREAN_TOLERANCE]
    const intervalLon = [longitude-SCREAN_TOLERANCE, longitude+SCREAN_TOLERANCE]
    const markers = await marker.findAll({
      attributes: ["id",'longitude','latitude'], // les champs que l'on souhaite en retour de la requette
      where: { //les contraintes
        longitude: {[Op.between]:intervalLon},
        latitude:{[Op.between]:intervalLat}
      },
    })
    const cosvertMarkers = markers.map(m=>{
      return{
        longitude:(m.longitude/100000),
        latitude:(m.latitude/100000),
        id:m.id
      }
    })
    res.json(cosvertMarkers)
  },


  async create(req, res ) {
    console.log(req.body)
    const longitude = Math.round(req.body.longitude * 100000)
    const latitude = Math.round(req.body.latitude * 100000)
    const intervalLat = [latitude-TOLERANCE, latitude+TOLERANCE]
    const intervalLon = [longitude-TOLERANCE, longitude+TOLERANCE]
    const marker_id = await marker.findOrCreate({
      attributes: ["id"], // les champs que l'on souhaite en retour de la requette
      where: { //les contraintes
        longitude: {[Op.between]:intervalLon},
        latitude:{[Op.between]:intervalLat}
      },
      defaults:{
        longitude,
        latitude
      }
    })
    .catch((err) => {throw(err)});
    const acces_id = await acces.bulkCreate(
      req.body.acces.map(({type,code})=>{
        console.log(marker_id)
        return { type, code, mk: marker_id[0].dataValues.id }
      })
    ).catch(err=>{throw(err)});
    res.json({acces_id})
  },


  async update(req, res) {
  },
    

  updateid(req, res) {
  },

  async delete(req, res) {
  }
};

module.exports = geoControler;