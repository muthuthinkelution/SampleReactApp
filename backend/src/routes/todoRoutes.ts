import express from 'express';
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from '../controllers/todoController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

router.patch('/:id/toggle', toggleTodo);

export default router;