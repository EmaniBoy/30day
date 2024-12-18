// src/pages/Tasks.jsx
import TaskList from '../components/TaskList';

export default function Tasks() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Daily Tasks</h1>
      <TaskList />
    </div>
  );
}