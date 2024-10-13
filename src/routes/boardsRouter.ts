import express from 'express';
import { isEmptyBody, isValidId } from '../middlewares/index.js';
import boardController from '../controllers/board-controller.js';
import cardController from '../controllers/card-controller.js';

import validateBody from '../decorators/validateBody.js';
import { boardJoiSchema, cardJoiSchema } from '../models/Board.js';

const boardAddValidate = validateBody(boardJoiSchema);
const cardAddValidate = validateBody(cardJoiSchema);

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

boardsRouter.put(
  '/:id/columns',
  isValidId,
  isEmptyBody,
  boardController.updateColumns
);

boardsRouter.post(
  '/:boardId/columns/:columnId/cards',
  isEmptyBody,
  cardAddValidate,
  cardController.addCardToColumn
);

boardsRouter.put(
  '/:boardId/columns/:columnId/cards/:cardId',
  isEmptyBody,
  cardAddValidate,
  cardController.updateCardInColumn
);

boardsRouter.delete(
  '/:boardId/columns/:columnId/cards/:cardId',
  cardController.deleteCardFromColumn
);

export default boardsRouter;
