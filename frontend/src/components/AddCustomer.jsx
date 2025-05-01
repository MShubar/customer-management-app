import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
const AddCustomer = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('authToken')
      await api.post(
        '/customers',
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setName('')
      setEmail('')
      setPhone('')
      navigate('/customers', {
        state: { success: 'Customer added successfully!' }
      })
    } catch (err) {
      console.error('Error adding customer:', err)
    }
  }

  return (
    <div className="form-page-container">
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Add Customer
        </h2>
        <div className="form-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-login">
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer
