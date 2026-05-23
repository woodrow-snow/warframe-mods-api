const controller = {};
const { ObjectId } = require('mongodb');
const equipModel = require('../models/equip');
const utils = require('../utils/utils')

controller.getAll = async function(req,res) {
    const data = await equipModel.getAll();
    utils.returnData(res, data, 'get');
}

controller.getSingle = async function (req, res) {
    const eId = new ObjectId(req.params.id);
    const data = await equipModel.getSingle(eId);
    utils.returnData(res, data, 'get');
}

controller.createEquip = async function (req, res) {
    try {
        // validating request
        if (!req.body.type_name) {
            res.status(400).send({ message: 'content can not be empty!' });
            return;
        }

        let newEquip;
        const type_name = utils.toTitleCase(req.body.type_name);

        if (req.body._id != null) {
            newEquip = {
                _id: new ObjectId(req.body._id),
                type_name: type_name
            };
        }
        else {
            newEquip = {
                type_name: type_name
            };
        }

        // saving new equip
        const result = await equipModel.createEquip(newEquip);
        utils.returnData(res, result, 'post');

    } catch (err) {
        console.error(err);

        res.status(500).send({
            message: 'Error creating mod'
        });
    }
}

module.exports = controller;