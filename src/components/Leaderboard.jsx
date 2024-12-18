// src/components/Leaderboard.jsx
import { useTaskContext } from '../contexts/TaskContext';

export default function Leaderboard() {
  const { users } = useTaskContext();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
      <div className="space-y-4">
        {users
          .sort((a, b) => b.points - a.points)
          .map((user, index) => (
            <div
              key={user.name}
              className="flex items-center justify-between p-4 rounded-lg transition-all"
              style={{
                backgroundColor: index === 0 ? '#FEF9C3' : 'white',
                border: '1px solid #E5E7EB'
              }}
            >
              <div className="flex items-center space-x-4">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                  ${index === 0 ? 'bg-yellow-400' : 
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-400' : 'bg-gray-300'}
                `}>
                  {index + 1}
                </div>
                <span className="font-semibold text-gray-700">{user.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-indigo-600">{user.points}</span>
                <span className="text-gray-500">pts</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}