import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import api from '../api'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await api.get('/customers', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCustomers(response.data)
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('authToken')
        window.location.href = '/'
      } else {
        setError('Error fetching customers: ' + err.message)
      }
    }
  }

  useEffect(() => {
    fetchCustomers()

    if (location.state?.success) {
      setSuccessMessage(location.state.success)
      setTimeout(() => setSuccessMessage(''), 3000)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  if (error) return <div className="error">{error}</div>

  return (
    <div className="customer-table-container">
      <div className="message-wrapper">
        {successMessage && (
          <div className="success-banner">{successMessage}</div>
        )}
      </div>

      <div className="customer-table-header">...</div>

      <div className="customer-table-header">
        <div className="left">
          <h2>Customer List</h2>
        </div>
        <Link to="/add" className="add-button">
          +
        </Link>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="clickable-row"
              onClick={() => navigate(`/customers/${c.id}`)}
            >
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email || '-'}</td>
              <td>{c.phone || '-'}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => navigate(`/edit/${c.id}`)}
                  className="btn-action"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/delete/${c.id}`)}
                  className="btn-action delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerList
