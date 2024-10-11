import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import boardsRouter from './routes/boardsRouter';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

const corsOptions = {
  origin: 'https://kanban-test-task-frontend.vercel.app',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/boards', boardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

interface CustomError extends Error {
  status?: number;
}

app.use(
  (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message });
  }
);

export default app;
