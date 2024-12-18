// src/components/TaskList.jsx
import { useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TaskList() {
  const { taskList, getDayTotal } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      <div className="lg:col-span-2 order-2 lg:order-1">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Tasks for {selectedDate.toLocaleDateString()}
          </h2>
          <div className="space-y-3">
            {taskList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                date={formatDate(selectedDate)}
              />
            ))}
          </div>
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <p className="text-base md:text-lg font-semibold text-indigo-700">
              Total points for today: {getDayTotal(formatDate(selectedDate))}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 order-1 lg:order-2">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full border-none text-sm md:text-base"
            tileClassName={({ date }) =>
              getDayTotal(formatDate(date)) > 0
                ? 'bg-green-100'
                : getDayTotal(formatDate(date)) < 0
                ? 'bg-red-100'
                : ''
            }
          />
        </div>
      </div>
    </div>
  );
}