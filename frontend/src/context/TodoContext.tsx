import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { todoService } from '../services/todoService';
import type { TodoContextType, Todo, CreateTodoData, UpdateTodoData } from '../types';
import { useAuth } from './AuthContext';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Fetch todos when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodos();
      setTodos(response.data as Todo[]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Create new todo
  const createTodo = async (data: CreateTodoData) => {
    try {
      setError(null);
      const response = await todoService.createTodo(data);
      setTodos((prev) => [response.data as Todo, ...prev]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create todo');
      throw err;
    }
  };

  // Update todo
  const updateTodo = async (id: string, data: UpdateTodoData) => {
    try {
      setError(null);
      const response = await todoService.updateTodo(id, data);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? (response.data as Todo) : todo))
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update todo');
      throw err;
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete todo');
      throw err;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const response = await todoService.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? (response.data as Todo) : todo))
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to toggle todo');
      throw err;
    }
  };

  const value: TodoContextType = {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};