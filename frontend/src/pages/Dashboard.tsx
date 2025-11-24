import Header from '../components/Layout/Header';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;