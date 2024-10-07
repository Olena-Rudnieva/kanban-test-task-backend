"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = __importDefault(require("../models/board"));
const column_1 = __importDefault(require("../models/column"));
const card_1 = __importDefault(require("../models/card"));
const router = (0, express_1.Router)();
router.post('/boards', async (req, res) => {
    const { name } = req.body;
    try {
        const newBoard = new board_1.default({ name, columns: [] });
        await newBoard.save();
        res.status(201).json(newBoard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
    }
});
router.get('/boards', async (req, res) => {
    try {
        const boards = await board_1.default.find().populate('columns');
        res.json(boards);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching boards', error });
    }
});
router.post('/boards/:boardId/columns', async (req, res) => {
    const { title } = req.body;
    try {
        const board = await board_1.default.findById(req.params.boardId);
        const newColumn = new column_1.default({ title, cards: [] });
        await newColumn.save();
        board?.columns.push(newColumn);
        await board?.save();
        res.status(201).json(newColumn);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding column', error });
    }
});
router.post('/columns/:columnId/cards', async (req, res) => {
    const { title, description } = req.body;
    try {
        const column = await column_1.default.findById(req.params.columnId);
        const newCard = new card_1.default({ title, description });
        await newCard.save();
        column?.cards.push(newCard);
        await column?.save();
        res.status(201).json(newCard);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding card', error });
    }
});
exports.default = router;
