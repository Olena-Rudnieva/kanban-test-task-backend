"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const Board_1 = __importDefault(require("../models/Board"));
const getAll = async (req, res) => {
    const result = await Board_1.default.find();
    res.json(result);
};
const getBoardById = async (req, res) => {
    const { id } = req.params;
    const result = await Board_1.default.findById(id);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Board with id ${id} not found`);
    }
    res.json(result);
};
const addBoard = async (req, res) => {
    const result = await Board_1.default.create(req.body);
    res.status(201).json(result);
};
const updateBoardById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Board_1.default.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Board with id ${id} not found`);
    }
    res.json(result);
};
const deleteBoardByID = async (req, res, next) => {
    const { id } = req.params;
    const result = await Board_1.default.findByIdAndDelete(id);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Board with id ${id} not found`);
    }
    res.json({
        message: 'Delete success',
    });
};
exports.default = {
    getAll: (0, ctrlWrapper_1.default)(getAll),
    getBoardById: (0, ctrlWrapper_1.default)(getBoardById),
    addBoard: (0, ctrlWrapper_1.default)(addBoard),
    updateBoardById: (0, ctrlWrapper_1.default)(updateBoardById),
    deleteBoardByID: (0, ctrlWrapper_1.default)(deleteBoardByID),
};
