import { error } from 'console';
import mongoose, { Document, Schema } from 'mongoose';

export interface IEmail extends Document {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  status: 'sent' | 'failed';
  messageId?: string;
  error?: string;
  createdAr: Date;
}

//email schema

const EmailSchema: Schema = new Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      trim: true,
    },
    html: {
      type: String,
    },
    status: {
      type: String,
      enum: ['sent', 'failed'],
      required: true,
    },
    messageId: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Email = mongoose.model<IEmail>('Email', EmailSchema);
