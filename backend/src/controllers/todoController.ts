import { Response } from 'express';
import Todo from '../models/Todo';
import { AuthRequest } from '../types';

// @desc    Get all todos for logged-in user
// @route   GET /api/todos
// @access  Private
export const getTodos = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error: any) {
    console.error('Get todos error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message,
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
export const getTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error: any) {
    console.error('Get todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message,
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
export const createTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Title is required',
      });
      return;
    }

    const todo = await Todo.create({
      userId,
      title,
      description: description || '',
      completed: false,
    });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo,
    });
  } catch (error: any) {
    console.error('Create todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message,
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
export const updateTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo,
    });
  } catch (error: any) {
    console.error('Update todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message,
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
export const deleteTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: todo,
    });
  } catch (error: any) {
    console.error('Delete todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message,
    });
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
// @access  Private
export const toggleTodo = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo toggled successfully',
      data: todo,
    });
  } catch (error: any) {
    console.error('Toggle todo error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling todo',
      error: error.message,
    });
  }
};