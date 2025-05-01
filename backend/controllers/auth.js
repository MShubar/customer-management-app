const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getDbConnection } = require('../db')

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const db = await getDbConnection()
    const result = await db.get('SELECT * FROM users WHERE username = ?', [
      username
    ])

    if (result && (await bcrypt.compare(password, result.password))) {
      const token = jwt.sign(
        { userId: result.id, username: result.username },
        'your_secret_key_here',
        { expiresIn: '1h' }
      )

      return res.json({ token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.error('Error during login:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
const logoutUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(400).json({ message: 'No token provided' })
  }

  try {
    const db = await getDbConnection()
    await db.run('INSERT INTO blacklisted_tokens (token) VALUES (?)', [token])

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    console.error('Error during logout:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
module.exports = { loginUser, logoutUser }
