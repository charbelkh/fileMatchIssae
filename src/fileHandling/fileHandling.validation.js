const joi = require("joi");

const validationOption = {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
    status: 400
};

const validation = {
    matchInFile: {
        option: validationOption,
        query: {
            type: joi.string().required(),
            filePath: joi.string().required(),
            pattern: joi.string().optional()
        }
    },
};

module.exports = validation;