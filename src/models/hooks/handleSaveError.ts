import { Document } from 'mongoose';

interface CustomError extends Error {
  status?: number;
}

export const handleSaveError = (
  error: CustomError,
  doc: Document,
  next: any
): void => {
  if (error) {
    error.status = 400;
  }
  next();
};
