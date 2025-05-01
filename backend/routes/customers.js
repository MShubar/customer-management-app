const express = require('express')
const authenticateToken = require('../middleware/jwt')
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customers')
const router = express.Router()

router.get('/', authenticateToken, getAllCustomers)
router.get('/:id', authenticateToken, getCustomerById)
router.post('/', authenticateToken, createCustomer)
router.put('/:id', authenticateToken, updateCustomer)
router.delete('/:id', authenticateToken, deleteCustomer)

module.exports = router
