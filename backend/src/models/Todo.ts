import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../types';

const todoSchema = new Schema<ITodo>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries by userId
todoSchema.index({ userId: 1, createdAt: -1 });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;