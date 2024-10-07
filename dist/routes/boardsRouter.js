"use strict";
// import { Router, Request, Response } from 'express';
// import Board from '../models/board';
// import Column from '../models/column';
// import Card from '../models/card';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.post('/boards', async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const newBoard = new Board({ name, columns: [] });
//     await newBoard.save();
//     res.status(201).json(newBoard);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating board', error });
//   }
// });
// router.get('/boards', async (req: Request, res: Response) => {
//   try {
//     const boards = await Board.find().populate('columns');
//     res.json(boards);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching boards', error });
//   }
// });
// router.post('/boards/:boardId/columns', async (req: Request, res: Response) => {
//   const { title } = req.body;
//   try {
//     const board = await Board.findById(req.params.boardId);
//     const newColumn = new Column({ title, cards: [] });
//     await newColumn.save();
//     board?.columns.push(newColumn);
//     await board?.save();
//     res.status(201).json(newColumn);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding column', error });
//   }
// });
// router.post('/columns/:columnId/cards', async (req: Request, res: Response) => {
//   const { title, description } = req.body;
//   try {
//     const column = await Column.findById(req.params.columnId);
//     const newCard = new Card({ title, description });
//     await newCard.save();
//     column?.cards.push(newCard);
//     await column?.save();
//     res.status(201).json(newCard);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding card', error });
//   }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const index_1 = require("../middlewares/index");
const board_controller_1 = __importDefault(require("../controllers/board-controller"));
const validateBody_1 = __importDefault(require("../decorators/validateBody"));
const models_1 = require("../models");
const boardAddValidate = (0, validateBody_1.default)(models_1.boardJoiSchema);
const boardsRouter = express_1.default.Router();
boardsRouter.get('/', board_controller_1.default.getAll);
boardsRouter.get('/:id', index_1.isValidId, board_controller_1.default.getBoardById);
boardsRouter.post('/', index_1.isEmptyBody, boardAddValidate, board_controller_1.default.addBoard);
boardsRouter.put('/:id', index_1.isValidId, index_1.isEmptyBody, boardAddValidate, board_controller_1.default.updateBoardById);
boardsRouter.delete('/:id', index_1.isValidId, board_controller_1.default.deleteBoardByID);
exports.default = boardsRouter;
