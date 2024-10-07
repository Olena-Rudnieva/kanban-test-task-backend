"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_js_1 = require("../helpers/index.js");
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return next((0, index_js_1.HttpError)(400, `${id} is not a valid ID`));
    }
    next();
};
exports.default = isValidId;
