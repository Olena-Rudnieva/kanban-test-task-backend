"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const isEmptyBody = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return next((0, helpers_1.HttpError)(400, 'All fields empty'));
    }
    next();
};
exports.default = isEmptyBody;
