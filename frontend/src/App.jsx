import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import AuthPage from './components/AuthPage'
import CustomerList from './components/CustomerList'
import AddCustomer from './components/AddCustomer'
import EditCustomer from './components/EditCustomer'
import Sidebar from './partials/Sidebar'
import './App.css'
import CustomerDetail from './components/CustomerDetail'
import DeleteCustomerPage from './components/DeleteCustomerPage'
const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'))

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
  }

  return (
    <Router>
      {!authToken ? (
        <Routes>
          <Route path="*" element={<AuthPage setAuthToken={setAuthToken} />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex' }}>
          <Sidebar handleLogout={handleLogout} />
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/customers" />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/:id" element={<CustomerDetail />} />
              <Route path="/add" element={<AddCustomer />} />
              <Route path="/edit/:id" element={<EditCustomer />} />
              <Route path="/delete/:id" element={<DeleteCustomerPage />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  )
}

export default App
