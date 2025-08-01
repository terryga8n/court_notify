import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminUserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users/')
      .then(res => setUsers(res.data))
      .catch(() => alert('Failed to fetch users.'));
  };

  const handleAddUser = () => {
    axios.post('http://localhost:5000/api/users/register', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({ email: '', password: '', role: '' });
      })
      .catch(() => alert('Failed to add user.'));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => fetchUsers())
      .catch(() => alert('Failed to delete user.'));
  };

  return (
    <div className="container py-4">
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h2 className="mb-3 text-success" style={{ fontWeight: 700 }}>User Management</h2>
        <h4 className="mb-3 text-secondary" style={{ fontWeight: 600 }}>Existing Users</h4>
        <div className="table-responsive mb-4">
          <table className="table table-bordered align-middle">
            <thead className="table-success">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td className="text-capitalize">{u.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-muted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h4 className="mb-3 text-secondary" style={{ fontWeight: 600 }}>Add New User</h4>
        <form
          className="row g-3 align-items-end"
          onSubmit={e => {
            e.preventDefault();
            handleAddUser();
          }}
        >
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="clerk">Clerk</option>
              <option value="magistrate">Magistrate</option>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserManagement;
