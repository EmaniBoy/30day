// src/components/TaskItem.jsx
import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

export default function TaskItem({ task, date }) {
    const { tasks, updateTaskScore } = useTaskContext();
    const { currentUser } = useAuth();

    const getTaskScore = () => {
        if (!currentUser || !tasks[currentUser.username] || !tasks[currentUser.username][date]) {
          return 0;
        }
        return tasks[currentUser.username][date][task.id] || 0;
      };

    const handleScoreChange = (newScore) => {
        updateTaskScore(task.id, date, newScore);
    };
    
  const scoreOptions = [
    { value: -1, label: '-1', color: 'bg-red-500' },
    { value: 0, label: '0', color: 'bg-gray-500' },
    { value: 1, label: '+1', color: 'bg-green-500' }
  ];
  
  const currentScore = getTaskScore();

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-200">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-medium text-gray-900">{task.name}</h3>
        </div>
        <div className="flex space-x-2">
          {scoreOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateTaskScore(task.id, date, option.value)}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg transition-all text-sm md:text-base ${
                currentScore === option.value
                  ? `${option.color} text-white`
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}