import api from './api';
import type { TodoResponse, CreateTodoData, UpdateTodoData } from '../types';

export const todoService = {
  // Get all todos
  getTodos: async (): Promise<TodoResponse> => {
    const response = await api.get<TodoResponse>('/todos');
    return response.data;
  },

  // Get single todo
  getTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.get<TodoResponse>(`/todos/${id}`);
    return response.data;
  },

  // Create todo
  createTodo: async (data: CreateTodoData): Promise<TodoResponse> => {
    const response = await api.post<TodoResponse>('/todos', data);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, data: UpdateTodoData): Promise<TodoResponse> => {
    const response = await api.put<TodoResponse>(`/todos/${id}`, data);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.delete<TodoResponse>(`/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion
  toggleTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.patch<TodoResponse>(`/todos/${id}/toggle`);
    return response.data;
  },
};