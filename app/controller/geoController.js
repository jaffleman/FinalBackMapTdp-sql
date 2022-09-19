const tdps = require("../models/tdp/tdpModel");
const marker = require("../models/geolock/markerModel");
const acces = require('../models/geolock/accesModel');
const { Op } = require("sequelize");
const { response } = require("express");

marker.hasMany(acces, {foreignKey:'id'}); // id d'un element de repartiteur correspond a plusieurs elements de tdps (1 to many)
acces.belongsTo(marker,{foreignKey:'mk'});//le champ 'reglette_type' d'un element de tdps correspond a un seul element de la table reglette (1 to 1)

const TOLERANCE= 5
const SCREAN_TOLERANCE= 70

const geoControler = {
  async getAllAcces(req, res) {
    console.log(req.body)
    const accesTab = await acces.findAll({
      attributes: ["id",'type','code'], // les champs que l'on souhaite en retour de la requette
      where: { //les contraintes
        mk: req.body.id,
      },
    })
    console.log(accesTab)
    res.json(accesTab)
  },


  async searchByPosition(req, res) {
    console.log(req.body)
  },


  async findAllMarker(req, res) {
    console.log(req.body)
    const longitude = Math.round(req.body.longitude * 100000)
    const latitude = Math.round(req.body.latitude * 100000)
    const longDelta = Math.round(req.body.longitudeDelta * 100000)|SCREAN_TOLERANCE
    const latDelta = Math.round(req.body.latitudeDelta * 100000)|SCREAN_TOLERANCE
    const intervalLat = [latitude-latDelta, latitude+latDelta]
    const intervalLon = [longitude-longDelta, longitude+longDelta]
    const markers = await marker.findAll({
      attributes: ["id",'longitude','latitude','author','adresse','accesNbr','createdDate'], // les champs que l'on souhaite en retour de la requette
      where: { //les contraintes
        longitude: {[Op.between]:intervalLon},
        latitude:{[Op.between]:intervalLat}
      },
    })
    const cosvertMarkers = markers.map(m=>{
      return{
        longitude:(m.longitude/100000),
        latitude:(m.latitude/100000),
        id:m.id,
        author:m.author,
        adresse:m.adresse,
        accesNbr:m.accesNbr,
        createdDate:m.createdDate===null?m.createdDate:new Date(m.createdDate).toDateString()
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
        latitude,
        author:req.body.author||'unknow',
        adresse:req.body.adresse||'unknow',
        createdDate: new Date()
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


  async updateAcces(req, res) {
      const updated = await acces.bulkCreate(req.body, {
        updateOnDuplicate: ["type","code"]
      });
    res.json(updated)
  },
  
  async updateMarker(req, res){
    const id = req.body.id
    delete req.body.id
    const updated = await marker.update(req.body, {
      where:{ "id" : id}
    })
    res.json(updated)
  },

  updateid(req, res) {
  },

  async delete(req, res) {
    const suppMarker = await marker.destroy({
      where:{id:req.body.id}
    })
    res.json(suppMarker)
  }
};

module.exports = geoControler;