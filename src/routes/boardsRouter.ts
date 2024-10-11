import express from 'express';
import { isEmptyBody, isValidId } from '../middlewares/index';
import boardController from '../controllers/board-controller';
import cardController from '../controllers/card-controller';

import validateBody from '../decorators/validateBody';
import { boardJoiSchema, cardJoiSchema } from '../models';

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
