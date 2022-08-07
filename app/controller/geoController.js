const tdps = require("../models/tdp/tdpModel");
const repartiteurs = require("../models/tdp/repModel");
const reglettes = require('../models/tdp/regModel')
const options = require('../models/tdp/optModel')


const geoControler = {

  async search(req, res) {
    console.log(req.body)
    res.json({return:'reponse'})
  },


  async searchByPosition(req, res) {
    console.log(req.body)
  },


  async searchRep(req, res) {
  },


  async create(req, res ) {
    console.log(req.body)
  },


  async update(req, res) {
  },
    

  updateid(req, res) {
  },

  async delete(req, res) {
  }
};

module.exports = geoControler;