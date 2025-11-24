import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error } = useTodos();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Todos</p>
          <p className="text-3xl font-bold">{todos.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Active</p>
          <p className="text-3xl font-bold">{activeTodos.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Completed</p>
          <p className="text-3xl font-bold">{completedTodos.length}</p>
        </div>
      </div>

      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Active Todos ({activeTodos.length})
          </h2>
          <div>
            {activeTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Completed Todos ({completedTodos.length})
          </h2>
          <div>
            {completedTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No todos yet!</h3>
          <p className="text-gray-500">Create your first todo to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;