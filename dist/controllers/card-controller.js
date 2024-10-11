"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const Board_1 = __importDefault(require("../models/Board"));
const addCardToColumn = async (req, res) => {
    const { boardId, columnId } = req.params;
    const { title, description } = req.body;
    const board = await Board_1.default.findById(boardId);
    console.log('board', board);
    if (!board) {
        throw (0, HttpError_1.default)(404, `Board with id ${boardId} not found`);
    }
    const column = board.columns.id(columnId);
    console.log('column', column);
    if (!column) {
        throw (0, HttpError_1.default)(404, `Column with id ${columnId} not found`);
    }
    const newCard = {
        title,
        description,
    };
    console.log('newCard', newCard);
    column.cards.push(newCard);
    await board.save();
    res.status(201).json(newCard);
};
const updateCardInColumn = async (req, res) => {
    const { boardId, columnId, cardId } = req.params;
    const { title, description } = req.body;
    const board = await Board_1.default.findById(boardId);
    if (!board) {
        throw (0, HttpError_1.default)(404, `Board with id ${boardId} not found`);
    }
    const column = board.columns.id(columnId);
    if (!column) {
        throw (0, HttpError_1.default)(404, `Column with id ${columnId} not found`);
    }
    const card = column.cards.id(cardId);
    if (!card) {
        throw (0, HttpError_1.default)(404, `Card with id ${cardId} not found`);
    }
    card.title = title || card.title;
    card.description = description || card.description;
    await board.save();
    res.json(card);
};
// const deleteCardFromColumn = async (
//   boardId: string,
//   columnId: string,
//   cardId: string
// ) => {
//   const board = await Board.findById(boardId);
//   if (!board) {
//     throw new Error(`Board with id ${boardId} not found`);
//   }
//   const column = board.columns.id(columnId);
//   if (!column) {
//     throw new Error(`Column with id ${columnId} not found`);
//   }
//   column.cards = column.cards.filter((card) => card._id.toString() !== cardId);
//   await board.save();
//   return column;
// };
const deleteCardFromColumn = async (req, res) => {
    const { boardId, columnId, cardId } = req.params;
    const board = await Board_1.default.findById(boardId);
    if (!board) {
        throw (0, HttpError_1.default)(404, `Board with id ${boardId} not found`);
    }
    const column = board.columns.id(columnId);
    if (!column) {
        throw (0, HttpError_1.default)(404, `Column with id ${columnId} not found`);
    }
    const card = column.cards.id(cardId);
    if (!card) {
        throw (0, HttpError_1.default)(404, `Card with id ${cardId} not found`);
    }
    column.cards.pull({ _id: cardId });
    await board.save();
    res.status(200).json({ message: 'Card deleted successfully', cardId });
};
exports.default = {
    addCardToColumn: (0, ctrlWrapper_1.default)(addCardToColumn),
    updateCardInColumn: (0, ctrlWrapper_1.default)(updateCardInColumn),
    deleteCardFromColumn: (0, ctrlWrapper_1.default)(deleteCardFromColumn),
};
