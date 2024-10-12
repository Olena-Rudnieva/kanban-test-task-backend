import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers/index.js';

const isEmptyBody = (req: Request, res: Response, next: NextFunction): void => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, 'All fields empty'));
  }
  next();
};

export default isEmptyBody;
