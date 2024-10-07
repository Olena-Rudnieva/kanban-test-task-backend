// import { Router, Request, Response } from 'express';
// import Board from '../models/board';
// import Column from '../models/column';
// import Card from '../models/card';

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

import express from 'express';
import { isEmptyBody, isValidId } from '../middlewares/index';
import boardController from '../controllers/board-controller';

import validateBody from '../decorators/validateBody';
import { boardJoiSchema } from '../models';

const boardAddValidate = validateBody(boardJoiSchema);

const boardsRouter = express.Router();

boardsRouter.get('/', boardController.getAll);

boardsRouter.get('/:id', isValidId, boardController.getBoardById);

boardsRouter.post('/', isEmptyBody, boardAddValidate, boardController.addBoard);

boardsRouter.put(
  '/:id',
  isValidId,
  isEmptyBody,
  boardAddValidate,
  boardController.updateBoardById
);

boardsRouter.delete('/:id', isValidId, boardController.deleteBoardByID);

export default boardsRouter;
