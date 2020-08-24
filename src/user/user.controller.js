const express = require("express");
const validate = require("express-validation");
const UserService = require("./user.service");
const userValidation = require("./user.validation");
const HttpException = require("../exceptions/httpException");
const authenticate = require('../middleware/authenticate');

// const authenticate = require("../lib/authenticate");

class Controller {
    constructor() {
        this.path = "/user";
        this.router = express.Router();
        this.userService = new UserService();
        this.initializeRoutes();
    }
    async login(req, res, next) {
        try {
            const user = await this.userService.login(req.body);
            res.send(user);
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async addUser(req, res, next) {
        try {
            await this.userService.addUser(req.body);
            res.end()
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async verifyAccount(req, res, next) {
        try {
            await this.userService.verifyAccount(req.query.key);
            res.end()
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async logout(req, res, next) {
        try {
            await this.userService.logout(req.headers.authorization);
            res.end()
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async testApi(req, res, next) {
        try {
            await this.userService.testApi();
            res.end()
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async refreshToken(req, res, next) {
        try {
            let data = await this.userService.refreshToken(req.body);
            res.send(data)
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }
    
    initializeRoutes() {
        this.router.post(`${this.path}/authenticate`, validate(userValidation.login), (req, res, next) => this.login(req, res, next));
        this.router.get(`${this.path}/verify`, validate(userValidation.verifyAccount), (req, res, next) => this.verifyAccount(req, res, next));
        this.router.post(`${this.path}/`, validate(userValidation.addUser), (req, res, next) => this.addUser(req, res, next));
        this.router.put(`${this.path}/refresh`, validate(userValidation.refresh), (req, res, next) => this.refreshToken(req, res, next));
        this.router.use(this.path, authenticate());
        this.router.get(`${this.path}/test`, (req, res, next) => res.send(req.user));
        this.router.post(`${this.path}/logout`, (req, res, next) => this.logout(req, res, next));
    }
}

module.exports = Controller;