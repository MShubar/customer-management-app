import React, { useState, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
const EditCustomer = () => {
  const { id } = useParams()
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = localStorage.getItem('authToken')
      const response = await api.get(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCustomer(response.data)
    }

    fetchCustomer()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('authToken')
      await api.put(
        `/customers/${id}`,
        {
          name: customer.name,
          email: customer.email,
          phone: customer.phone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/customers', {
        state: { success: 'Customer updated successfully!' }
      })
    } catch (err) {
      console.error('Error updating customer:', err)
    }
  }

  return (
    <div className="form-page-container">
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Edit Customer
        </h2>
        <div className="form-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn-login">
              Update Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCustomer
