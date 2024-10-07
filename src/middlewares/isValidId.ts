import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpError(400, `${id} is not a valid ID`));
  }
  next();
};

export default isValidId;
