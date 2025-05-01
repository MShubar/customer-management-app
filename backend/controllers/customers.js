const { getDbConnection } = require('../db.js')

const getAllCustomers = async (req, res) => {
  const db = await getDbConnection()
  const customers = await db.all('SELECT * FROM customers')
  res.json(customers)
}

const getCustomerById = async (req, res) => {
  const db = await getDbConnection()
  const customer = await db.get(
    'SELECT * FROM customers WHERE id = ?',
    req.params.id
  )
  if (!customer) return res.status(404).json({ message: 'Not found' })
  res.json(customer)
}

const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body
  const db = await getDbConnection()
  const result = await db.run(
    'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone]
  )
  res.status(201).json({ id: result.lastID, name, email, phone })
}

const updateCustomer = async (req, res) => {
  const { name, email, phone } = req.body
  const db = await getDbConnection()
  await db.run(
    'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, req.params.id]
  )
  res.json({ id: req.params.id, name, email, phone })
}

const deleteCustomer = async (req, res) => {
  const db = await getDbConnection()
  await db.run('DELETE FROM customers WHERE id = ?', req.params.id)
  res.status(204).end()
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
