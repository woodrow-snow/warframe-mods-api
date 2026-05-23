const mods = {};
const { ObjectId } = require('mongodb');
const modsModel = require('../models/mods');
const equipModel = require('../models/equip');
const utils = require('../utils/utils');

mods.getAll = async function (req, res) {
     const data = await modsModel.getAll();
     utils.returnData(res, data, 'get');
};

mods.getSingle = async function (req, res) {
     const modId = new ObjectId(req.params.id);
     const data = await modsModel.getSingle(modId);
     utils.returnData(res, data, 'get');
};

mods.createMod = async function (req, res) {
     try {
          // validating request
          if (!req.body.name) {
               res.status(400).send({ message: 'content can not be empty!' });
               return;
          }

          // creating new mode and checking if req has id
          let newMod;
          if (req.body._id != null) {
               newMod = {
                    _id: new ObjectId(req.body._id),
                    name: req.body.name,
                    copies: req.body.copies,
                    c_rank: req.body.c_rank,
                    max_rank: req.body.max_rank,
                    rarity: req.body.rarity,
                    in_set: req.body.in_set
               };
          } else {
               newMod = {
                    name: req.body.name,
                    copies: req.body.copies,
                    c_rank: req.body.c_rank,
                    max_rank: req.body.max_rank,
                    rarity: req.body.rarity,
                    in_set: req.body.in_set
               };
          }

          //  Handling equip_id
          const equip_type = req.body.equip_id.toLowerCase();
          const equip_exist = await utils.checkForEquipType(equip_type);

          if (equip_exist) {
               const equips = await equipModel.getAll();
               equips.forEach((e) => {
                    if (e.type_name.toLowerCase() == equip_type) {
                         newMod.equip_id = {
                              $oid: new ObjectId(e._id)
                         };
                    }
               });

               // saving new mod in DB
               const result = await modsModel.createMod(newMod);
               utils.returnData(res, result, 'post');
          } else {
               utils.returnData(
                    res,
                    'Equipment type does not exist, please create it and try again',
                    'err'
               );
          }
     } catch (err) {
          console.error(err);

          res.status(500).send({
               message: 'Error creating mod'
          });
     }
};

mods.updateMod = async function (req, res) {
     const modId = new ObjectId(req.params.id);
     try {
          const updatedInfo = {
               name: req.body.name,
               copies: req.body.copies,
               c_rank: req.body.c_rank,
               max_rank: req.body.max_rank,
               rarity: req.body.rarity,
               in_set: req.body.in_set
          };

          // updating entry in db
          const results = await modsModel.updateMod(modId, updatedInfo);
          res.status(200).send(results);
     } catch (err) {
          console.error(err);

          res.status(500).send({ message: 'Error updating mod' });
     }
};

mods.deleteMod = async function (req, res) {
     const modId = new ObjectId(req.params.id);

     try {
          const results = await modsModel.deleteMod(modId);
          res.status(200).send(results);
     } catch (err) {
          console.error(err);

          res.status(500).send({ message: 'Error occurred while attempting delete operation' });
     }
};

module.exports = mods;
