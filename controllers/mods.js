const mods = {};
const modsModel = require('../models/mods');

mods.getAll = async function(req, res) {
    const data = await modsModel.getAll();
    console.log(data);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
}

module.exports = mods;