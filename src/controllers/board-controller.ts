import 'dotenv/config';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import Board from '../models/Board.js';
import { Request, Response, NextFunction } from 'express';

const getAll = async (req: Request, res: Response) => {
  const result = await Board.find();
  res.json(result);
};

const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Board.findById(id);
  if (!result) {
    throw HttpError(404, `Board with id ${id} not found`);
  }
  res.json(result);
};

const addBoard = async (req: Request, res: Response) => {
  const result = await Board.create(req.body);
  res.status(201).json(result);
};

const updateBoardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body);

  if (!result) {
    throw HttpError(404, `Board with id ${id} not found`);
  }
  res.json(result);
};

const deleteBoardByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, `Board with id ${id} not found`);
  }
  res.json({
    message: 'Delete success',
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getBoardById: ctrlWrapper(getBoardById),
  addBoard: ctrlWrapper(addBoard),
  updateBoardById: ctrlWrapper(updateBoardById),
  deleteBoardByID: ctrlWrapper(deleteBoardByID),
};
