"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardJoiSchema = exports.columnJoiSchema = exports.cardJoiSchema = void 0;
const mongoose_1 = require("mongoose");
const hooks_1 = require("./hooks");
const joi_1 = __importDefault(require("joi"));
const cardSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});
const columnSchema = new mongoose_1.Schema({
    title: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        required: [true, 'Set title for column'],
    },
    cards: {
        type: [cardSchema],
    },
});
const boardSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Set name for board'],
    },
    columns: {
        type: [columnSchema],
    },
}, { versionKey: false, timestamps: true });
exports.cardJoiSchema = joi_1.default.object({
    _id: joi_1.default.string().optional(),
    title: joi_1.default.string().optional().messages({
        'string.base': 'Title must be a string',
    }),
    description: joi_1.default.string().optional().messages({
        'string.base': 'Description must be a string',
    }),
});
exports.columnJoiSchema = joi_1.default.object({
    _id: joi_1.default.string().optional(),
    title: joi_1.default.string()
        .valid('To Do', 'In Progress', 'Done')
        .required()
        .messages({
        'any.required': 'Set title for column',
        'any.only': 'Title must be one of: To Do, In Progress, Done',
    }),
    cards: joi_1.default.array().items(exports.cardJoiSchema).optional(),
});
exports.boardJoiSchema = joi_1.default.object({
    _id: joi_1.default.string().optional(),
    name: joi_1.default.string().required().messages({
        'any.required': 'Set name for board',
        'string.base': 'Name must be a string',
    }),
    columns: joi_1.default.array().items(exports.columnJoiSchema).optional(),
    createdAt: joi_1.default.string().optional(),
    updatedAt: joi_1.default.string().optional(),
});
boardSchema.post('save', hooks_1.handleSaveError);
boardSchema.pre('findOneAndUpdate', hooks_1.runValidatorsAtUpdate);
boardSchema.post('findOneAndUpdate', hooks_1.handleSaveError);
const Board = (0, mongoose_1.model)('board', boardSchema);
exports.default = Board;
