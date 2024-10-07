"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidatorsAtUpdate = void 0;
const runValidatorsAtUpdate = function (next) {
    this.options.runValidatiors = true;
    this.options.new = true;
    next();
};
exports.runValidatorsAtUpdate = runValidatorsAtUpdate;
