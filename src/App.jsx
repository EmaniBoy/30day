// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Tasks from './pages/Task';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navigation />
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <Home />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navigation />
                      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <Tasks />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}