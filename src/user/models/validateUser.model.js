const mongoose = require("mongoose");

const userValidationModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    key: String,
    validity: Date,
    created: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model("UserValidationl", userValidationModel);