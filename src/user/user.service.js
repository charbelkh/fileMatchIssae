const User = require('./models/user.model');
const UserToken = require('./models/userToken.model');
const UserVerification = require('./models/validateUser.model');
const refreshTokenModel = require('./models/userRefreshToken.model.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('../configs/config')
let CronJob = require('cron').CronJob;

class Service {
    constructor() {
        this.User = User
        this.UserToken = UserToken
        this.UserVerification = UserVerification
        this.refreshTokenModel = refreshTokenModel
        // let job = new CronJob('0 */6 * * *', function () {
        //     try {
        //         // UserVerification.remove({ validity: { $lt : new Date()} });
        //         // UserToken.remove({ validity: { $lt : new Date()} })
        //         // console.log("here")
        //     } catch (e) {
        //         console.log("error deleting expired ", e)
        //     }
        // }, null, true);
        // job.start();
    }

    async login(body) {
        let {
            email,
            phoneNumber,
            password
        } = body;
        let obj;
        if (email) obj = {
            email: email,
            password: password,
            verified: true
        }
        else obj = {
            phoneNumber: phoneNumber,
            password: password,
            verified: true
        }
        const userExists = await this.User.findOne(obj, {
            password: 0,
            __v: 0
        });
        if (userExists) {
            let date = new Date();
            let token = jwt.sign({
                data: {
                    user: userExists,
                    date: new Date()
                }
            }, config.jwt.secret, {
                expiresIn: config.jwt.validity
            });
            let refreshToken = jwt.sign({
                data: {
                    user: userExists,
                    date: new Date()
                }
            }, config.jwt.secret, {
                expiresIn: config.jwt.validity_refresh
            });



            let newUserToken = new this.UserToken({
                user: mongoose.Types.ObjectId(userExists._id),
                token: token,
                validity: date.setSeconds(date.getSeconds() + config.jwt.validity)
            })

            let newUserRefreshToken = new this.refreshTokenModel({
                user: mongoose.Types.ObjectId(userExists._id),
                token: refreshToken,
                validity: date.setSeconds(date.getSeconds() + config.jwt.validity_refresh)
            })

            await newUserToken.save();
            await newUserRefreshToken.save()
            return {
                token: token,
                refreshToken: refreshToken,
                name: userExists.name
            };

        } else {
            throw new Error('unAuthorized');
        }
    }

    async addUser(body) {
        const existingRecord = await this.User.findOne({
            $or: [{
                email: body.email
            }, {
                phoneNumber: body.phoneNumber
            }]
        });
        if (!existingRecord) {
            const newRecord = new this.User(body);
            //TODO add user email verification
            return newRecord.save();
        } else throw new Error('alreadyExists');
    }

    async verifyAccount(key) {
        const existingRecord = await this.UserVerification.findOne({
            $and: [{
                key: key
            }, {
                validity: {
                    $gt: new Date()
                }
            }]
        });
        if (!existingRecord) {
            this.User.findByIdAndUpdate(existingRecord.user, {
                verified: true
            })
        } else throw new Error('invalidVerificationUrl');
    }


    async logout(token) {
        await this.UserToken.findOneAndUpdate({
            token: token
        }, {
            usable: false
        });
    }

    async refreshToken(body) {
        console.log(body)
        let refreshTokenDetails = await this.refreshTokenModel.findOne({
            token: body.refreshToken
        });
        console.log("rf",refreshTokenDetails)
        let userExists = await this.User.findOne({
            _id: refreshTokenDetails.user
        });
        if (userExists) {
            let date = new Date();
            let token = jwt.sign({
                data: {
                    user: userExists,
                    date: new Date()
                }
            }, config.jwt.secret, {
                expiresIn: config.jwt.validity
            });
            let refreshToken = jwt.sign({
                data: {
                    user: userExists,
                    date: new Date()
                }
            }, config.jwt.secret, {
                expiresIn: config.jwt.validity_refresh
            });

            const updatedRefreshRecord = await this.refreshTokenModel.findOneAndUpdate({
                token: body.refreshToken
            }, {
                token: refreshToken,
                validity: date.setSeconds(date.getSeconds() + config.jwt.validity)
            });

            const updatedRecord = await this.UserToken.findOneAndUpdate({
                token: body.token
            }, {
                token: token,
                validity: date.setSeconds(date.getSeconds() + config.jwt.validity)
            });

            return {
                token: token,
                refreshToken: refreshToken,
                name: userExists.name
            };

        } else {
            throw new Error('unAuthorized');
        }
    }

}

module.exports = Service;