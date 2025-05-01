import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import api from '../api'
const Sidebar = () => {
  const [active, setActive] = useState('User Management')
  const navigate = useNavigate()

  const navItem = (label, icon, collapsible, toggleSection, route = null) => (
    <div
      className={`sidebar-item ${active === label ? 'active' : ''}`}
      onClick={() => {
        setActive(label)
        if (collapsible) {
          toggleSection()
        } else {
          if (route) navigate(route)
        }
      }}
    >
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </div>
  )

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken')
    try {
      await api.post(
        '/users/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    } catch (err) {
      console.error('Error logging out:', err)
    }

    localStorage.removeItem('authToken')
    navigate('/', { replace: true })
  }

  return (
    <div className="sidebar">
      <div className="logo">SaluberMD</div>

      {navItem('User Management', <FaUser />, false, () => {}, '/customers')}

      <div
        className="sidebar-item"
        onClick={handleLogout}
        style={{ marginTop: 'auto', color: 'red' }}
      >
        <span className="icon">
          <FaSignOutAlt />
        </span>
        <span className="label">Logout</span>
      </div>
    </div>
  )
}

export default Sidebar
