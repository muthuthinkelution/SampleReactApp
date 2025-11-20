//This file centralizes all custom TypeScript type/interfaces used across your backend
//  (usually placed in src/types/index.ts and imported wherever needed).

import { Request } from 'express';
import { Document, Types } from 'mongoose';

// User document interface
export interface IUser extends Document<Types.ObjectId> {
  // Let Mongoose handle _id as ObjectId
  // You don't need to declare _id at all, or declare it properly:
  _id: Types.ObjectId;        // correct type
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Todo document interface
export interface ITodo extends Document<Types.ObjectId> {
  _id: Types.ObjectId;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended Express Request with user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
}