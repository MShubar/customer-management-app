import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

const DeleteCustomerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('authToken')
      await api.delete(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/customers', {
        state: { success: 'Customer deleted successfully!' }
      })
    } catch (err) {
      alert('Failed to delete customer.')
      console.error(err)
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/customers')
  }

  return (
    <div className="delete-confirmation">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this customer?</p>
      <div className="button-group">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn-action delete"
        >
          Yes, Delete
        </button>
        <button onClick={handleCancel} className="btn-action cancel">
          No, Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteCustomerPage
