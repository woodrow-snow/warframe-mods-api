const { body, validationResult } = require('express-validator');

const addModValidationRules = () => {
    return [
        body('name')
            .trim()
            .toLowerCase()
            .notEmpty()
            .withMessage('Name must have a value')
            .isString()
            .withMessage("Name must be a string"),
        body('copies')
            .notEmpty()
            .trim()
            .isNumeric()
            .withMessage("Copies must only be numbers")
            .isLength({ max: 2 })
            .withMessage("Copies can only be 2 digits big"),
        body('c_rank')
            .notEmpty()
            .withMessage('c_rank cannot be empty')
            .trim()
            .isNumeric()
            .withMessage("c_rank must be number only")
            .isLength({ max: 2 })
            .withMessage("c_rank can only be 2 digits big"),
        body('max_rank')
            .notEmpty()
            .trim()
            .isLength({ max: 2 })
            .withMessage("c_rank can only be 2 digits big")
            .isNumeric()
            .withMessage("c_rank must be number only"),
        body('rarity')
            .notEmpty()
            .withMessage('rarity must not be empty')
            .trim()
            .isAlpha()
            .withMessage('rarity must be letters only'),
        body('in_set')
            .trim()
            .notEmpty()
            .withMessage('in set must not be empty')
            .isIn(['yes', 'no'])
            .withMessage("in_set must be either 'yes' or 'no'")
    ]
}

const putModValidationRules = () => {
    return [
        body('name')
            .trim()
            .toLowerCase()
            .isString()
            .withMessage("Name must be a string"),
        body('copies')
            .trim()
            .isNumeric()
            .withMessage("Copies must only be numbers")
            .isLength({ max: 2 })
            .withMessage("Copies can only be 2 digits big"),
        body('c_rank')
            .trim()
            .isNumeric()
            .withMessage("c_rank must be number only")
            .isLength({ max: 2 })
            .withMessage("c_rank can only be 2 digits big"),
        body('max_rank')
            .trim()
            .isLength({ max: 2 })
            .withMessage("c_rank can only be 2 digits big")
            .isNumeric()
            .withMessage("c_rank must be number only"),
        body('rarity')
            .trim()
            .isAlpha()
            .withMessage('rarity must be letters only'),
        body('in_set')
            .trim()
            .isIn(['yes', 'no'])
            .withMessage("in_set must be either 'yes' or 'no'")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    addModValidationRules,
    validate,
    putModValidationRules,
}