import { Schema, model } from 'mongoose';
import { handleSaveError, runValidatorsAtUpdate } from './hooks';
import Joi from 'joi';

const cardSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const columnSchema = new Schema({
  title: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    required: [true, 'Set title for column'],
  },
  cards: {
    type: [cardSchema],
  },
});

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for board'],
    },
    columns: {
      type: [columnSchema],
    },
  },
  { versionKey: false, timestamps: true }
);

export const cardJoiSchema = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string().optional().messages({
    'string.base': 'Title must be a string',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string',
  }),
});

export const columnJoiSchema = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string()
    .valid('To Do', 'In Progress', 'Done')
    .required()
    .messages({
      'any.required': 'Set title for column',
      'any.only': 'Title must be one of: To Do, In Progress, Done',
    }),
  cards: Joi.array().items(cardJoiSchema).optional(),
});

export const boardJoiSchema = Joi.object({
  _id: Joi.string().optional(),
  name: Joi.string().required().messages({
    'any.required': 'Set name for board',
    'string.base': 'Name must be a string',
  }),
  columns: Joi.array().items(columnJoiSchema).optional(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
});

boardSchema.post('save', handleSaveError);
boardSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);

boardSchema.post('findOneAndUpdate', handleSaveError);

const Board = model('board', boardSchema);

export default Board;
