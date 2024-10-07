import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../helpers';

const isEmptyBody = (req: Request, res: Response, next: NextFunction): void => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, 'All fields empty'));
  }
  next();
};

export default isEmptyBody;
