const express = require("express");
const validate = require("express-validation");
const fileHandlingService = require("./fileHandling.service");
const fileHandlingValidation = require("./fileHandling.validation");
const HttpException = require("../exceptions/httpException");
const authenticate = require('../middleware/authenticate');

// const authenticate = require("../lib/authenticate");

class Controller {
    constructor() {
        this.path = "/fileHandling";
        this.router = express.Router();
        this.fileHandlingService = new fileHandlingService();
        this.initializeRoutes();
    }

    async getOptions(req, res, next) {
        try {
            let data = await this.fileHandlingService.getOptions();
            res.send(data)
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    async matchInFile(req, res, next) {
        try {
            let results = await this.fileHandlingService.matchInFile(req.query.type, req.query.filePath, req.query.pattern);
            res.send(results)
        } catch (e) {
            next(new HttpException(500, e.message));
        }
    }

    initializeRoutes() {
        this.router.get(`${this.path}/options`, (req, res, next) => this.getOptions(req, res, next));
        this.router.use(this.path, authenticate());
        this.router.get(`${this.path}/matchInFile`, validate(fileHandlingValidation.matchInFile), (req, res, next) => this.matchInFile(req.user));
    }
}

module.exports = Controller;