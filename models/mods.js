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

/* ***********************************************
 * creates a new mod in db
 * *********************************************** */
modsModel.createMod = async function (mod) {
    return await getDB().insertOne(mod);
}

modsModel.updateMod = async function (id, newInfo) {
    const ogMod = await this.getSingle(id);

    // testing
    console.log(ogMod.toString());

    result = await getDB().updateOne(
        { _id: id },
        {
            $set: {
                name: newInfo.name ?? ogMod.name,
                copies: newInfo.copies ?? ogMod.copies,
                c_rank: newInfo.c_rank ?? ogMod.c_rank,
                max_rank: newInfo.max_rank ?? ogMod.max_rank,
                equip_id: newInfo.equip_id ?? ogMod.equip_id,
                rarity: newInfo.rarity ?? ogMod.rarity,
                in_set: newInfo.in_set ?? ogMod.in_set,
            }
        }
    );

    return "Update Successful";
}

module.exports = modsModel;