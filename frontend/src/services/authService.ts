import api from './api';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export const authService = {
  // Register new user
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<unknown> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};