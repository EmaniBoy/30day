// src/contexts/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  const taskList = [
    { id: 1, name: 'Wake Up 9 or before week days + 11 on weekends' },
    { id: 2, name: 'Went to Gym (5 per week)' },
    { id: 3, name: 'Cardio (2 per week)' },
    { id: 4, name: 'Met Calorie Goals + Creatine/nutrient goals' },
    { id: 5, name: 'Met Protein Goal' },
    { id: 6, name: 'Journaled (or what your grateful for) or Meditated' },
    { id: 7, name: 'Read for ~20-30 minutes' },
    { id: 8, name: 'Did something good for someone else (3 per week)' },
    { id: 9, name: 'iPhone Screentime less than 4 hours' },
    { id: 10, name: '1 Hour of something productive/educational/working towards goal or task' }
  ];

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { name: 'Abhinav', points: 0 },
      { name: 'Dilan', points: 0 },
      { name: 'Karthik', points: 0 },
      { name: 'Jai', points: 0 }
    ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [tasks, users, currentUser]);

  const updateTaskScore = (taskId, date, score) => {
    if (!currentUser) return;

    const newTasks = { ...tasks };
    if (!newTasks[currentUser.username]) {
      newTasks[currentUser.username] = {};
    }
    if (!newTasks[currentUser.username][date]) {
      newTasks[currentUser.username][date] = {};
    }
    
    const oldScore = newTasks[currentUser.username][date][taskId] || 0;
    newTasks[currentUser.username][date][taskId] = score;
    
    setTasks(newTasks);

    // Update user points
    const pointDifference = score - oldScore;
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.name === currentUser.username
          ? { ...user, points: user.points + pointDifference }
          : user
      )
    );
  };

  const getDayTotal = (date) => {
    if (!currentUser || !tasks[currentUser.username] || !tasks[currentUser.username][date]) return 0;
    return Object.values(tasks[currentUser.username][date]).reduce((sum, score) => sum + score, 0);
  };

  return (
    <TaskContext.Provider value={{ tasks, taskList, users, updateTaskScore, getDayTotal }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}