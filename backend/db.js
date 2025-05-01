const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let db

async function getDbConnection() {
  if (!db) {
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database
    })
  }
  return db
}

async function initDb() {
  const db = await getDbConnection()

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `)

  await db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

initDb().catch((err) => {
  console.error('Error initializing database:', err)
})

module.exports = { getDbConnection }
