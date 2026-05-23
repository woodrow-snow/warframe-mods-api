const mongo = require('../database/database');
const modsModel = {};

modsModel.getAll = async function() {
    return await mongo.getDatabase().db().collection('mods').find().toArray();
}

module.exports = modsModel;