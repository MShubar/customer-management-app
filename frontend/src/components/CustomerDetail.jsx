import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

const CustomerDetail = () => {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await api.get(`/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setCustomer(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCustomer()
  }, [id])

  return (
    <div className="form-page-container">
      {customer ? (
        <div className="form-card dark-card">
          <h2
            className="form-header"
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            Customer Details
          </h2>

          <div className="form-group">
            <label>Name</label>
            <p className="detail-field">{customer.name}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <p className="detail-field">{customer.email}</p>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <p className="detail-field">{customer.phone}</p>
          </div>

          {/* Action Buttons */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className="btn-action"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit
            </button>
            <button
              className="btn-action delete"
              onClick={() => navigate(`/delete/${id}`)}
              style={{ marginLeft: '1rem' }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      )}
    </div>
  )
}

export default CustomerDetail
