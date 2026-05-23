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

equipModel.updateEquip = async function (id, info) {
     await getDB().updateOne(
          { _id: id },
          {
               $set: {
                    type_name: info.type_name
               }
          }
     );

     return 'Update Successful';
};

equipModel.deleteEquip = async function (id) {
     return await getDB().deleteOne({ _id: id });
}

module.exports = equipModel;
