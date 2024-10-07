"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSaveError = void 0;
const handleSaveError = (error, doc, next) => {
    if (error) {
        error.status = 400;
    }
    next();
};
exports.handleSaveError = handleSaveError;
