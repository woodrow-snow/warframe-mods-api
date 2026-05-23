const mongo = require('../database/database');
const modsModel = {};

// helper function to help cut out repeating code
const getDB = () => {
    return mongo.getDatabase().db().collection('mods');
}

/* ***********************************************
 * returns all mods in db
 * *********************************************** */
modsModel.getAll = async function() {
    return await getDB().find().toArray();
}

/* ***********************************************
 * returns single mod in db based on id
 * *********************************************** */
modsModel.getSingle = async function (modId) {
    return await getDB().findOne({ _id: modId })
}

module.exports = modsModel;