"use strict";
// import mongoose, { Document, Schema } from 'mongoose';
// import { IColumn } from './column';
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IBoard extends Document {
//   name: string;
//   columns: IColumn[];
// }
// const boardSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
// });
// export default mongoose.model<IBoard>('Board', boardSchema);
const mongoose_1 = require("mongoose");
// import { handleSaveError, runValidatorsAtUpdate } from './hooks/index.js';
// import Joi from 'joi';
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
}, { versionKey: false, timestamps: true });
// export const contactAddSchema = Joi.object({
//   name: Joi.string().required().messages({
//     'any.required': `missing required "name" field`,
//   }),
//   phone: Joi.string().required().messages({
//     'any.required': `missing required "phone" field`,
//   }),
//   message: Joi.string(),
// });
// contactSchema.post('save', handleSaveError);
// contactSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
// contactSchema.post('findOneAndUpdate', handleSaveError);
// const Contact = model('contact', contactSchema);
// export default Contact;
