const joi = require("joi");

const validationOption = {
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
    status: 400
};

const validation = {

    login: {
        option: validationOption,
        body: {
            email: joi.string().email({
                minDomainSegments: 2,
                tlds: {
                    allow: ["com", "net"]
                }
            }).optional(),
            phoneNumber: joi.string().optional(),
            password: joi.string().min(6).required()
        }
    },
    addUser: {
        option: validationOption,
        body: {
            email: joi.string().email({
                minDomainSegments: 2,
                tlds: {
                    allow: ["com", "net"]
                }
            }).required(),
            phoneNumber: joi.string().required(),
            name: joi.string().required(),
            password: joi.string().min(6).required()
        }
    },
    refresh: {
        option: validationOption,
        body: {
            token: joi.string().required(),
            refreshToken:joi.string().required()
        }
    },
    verifyAccount: {
        option: validationOption,
        query: {
            key: joi.string().required()
        }
    },
};

module.exports = validation;