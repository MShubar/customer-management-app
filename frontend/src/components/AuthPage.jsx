import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
const AuthPage = ({ setAuthToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post('/users/login', {
        username,
        password
      })
      const { token } = response.data
      localStorage.setItem('authToken', token)
      setAuthToken(token)
      navigate('/customers')
    } catch (err) {
      console.error('Login failed', err)
      setError('Login failed: Invalid credentials')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
    </div>
  )
}

export default AuthPage
