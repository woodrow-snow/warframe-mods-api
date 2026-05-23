const mongo = require('../database/database');
const equipModel = {};

// helper function to help cut out repeating code
const getDB = () => {
     return mongo.getDatabase().db().collection('equipment');
};

equipModel.getAll = async function () {
     return await getDB().find().toArray();
};

equipModel.getSingle = async function (eId) {
     return await getDB().findOne({ _id: eId });
};

equipModel.createEquip = async function (newE) {
     return await getDB().insertOne(newE);
};

module.exports = equipModel;
