const utils = {};
const equipModel = require('../models/equip');

utils.checkForEquipType = async function (ui_type) {
     // getting all equips from db
     const equips = await equipModel.getAll();
     let doesExist = false;

     for (let i = 0; i < equips.length; i++) {
          if (equips[i].type_name === this.toTitleCase(ui_type)) {
               doesExist = true;
               break;
          }
     }

     return doesExist;
};

// helper function to remove duplicate code
utils.returnData = async function (res, data, res_type) {
     if (res_type === 'get') {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(data);
     } else if (res_type === 'post') {
          res.status(201).send(data.insertedId);
     } else if (res_type === 'err') {
          res.status(400).send(data);
     }
};

utils.toTitleCase = function (str) {
     return str
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
};

module.exports = utils;
