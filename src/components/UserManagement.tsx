import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the server
    fetch(`${API_URL}/api/users`)
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleRoleChange = (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    // Update user role on the server
    fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'editor' | 'viewer')}
                  className="p-1 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;