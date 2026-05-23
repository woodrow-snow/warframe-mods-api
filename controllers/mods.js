const mods = {};
const { ObjectId } = require('mongodb');
const modsModel = require('../models/mods');

// helper function to remove duplicate code
async function returnDataAsJson(res, data) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
}

mods.getAll = async function(req, res) {
    const data = await modsModel.getAll();
    returnDataAsJson(res, data);
}

mods.getSingle = async function (req, res) {
    const modId = new ObjectId(req.params.id);
    const data = await modsModel.getSingle(modId);
    returnDataAsJson(res, data);
}

module.exports = mods;