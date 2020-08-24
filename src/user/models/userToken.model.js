const mongoose = require("mongoose");

const userTokenModel = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    token: String,
    validity: Date,
    usable: {
        type: Boolean,
        default:true
    },
    created: {
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model("UserToken", userTokenModel);