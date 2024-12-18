// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const users = [
    { id: 1, username: 'Abhinav', password: 'password123' },
    { id: 2, username: 'Dilan', password: 'password123' },
    { id: 3, username: 'Karthik', password: 'password123' },
    { id: 4, username: 'Jai', password: 'password123' }
  ];

  const login = (username, password) => {
    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}