import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const DB_FILE = process.env.DATABASE_FILE || './data.db'

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database(DB_FILE)

function initDb() {
  db.prepare(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT,
    password_hash TEXT,
    created_at TEXT
  )`).run()

  db.prepare(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    api_id INTEGER UNIQUE,
    title TEXT,
    price REAL,
    description TEXT,
    category TEXT,
    image TEXT,
    created_at TEXT
  )`).run()
}

async function seedProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const products = await res.json()
    const insert = db.prepare(`INSERT OR IGNORE INTO products (api_id, title, price, description, category, image, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    const now = new Date().toISOString()
    const insertMany = db.transaction((items) => {
      for (const p of items) {
        insert.run(p.id, p.title, p.price, p.description, p.category, p.image, now)
      }
    })
    insertMany(products)
    console.log('Products seeded:', products.length)
  } catch (err) {
    console.error('Failed to seed products:', err)
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }
  const password_hash = bcrypt.hashSync(password, 10)
  try {
    const stmt = db.prepare('INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
    const info = stmt.run(username, email || null, password_hash, new Date().toISOString())
    return res.json({ id: info.lastInsertRowid, username })
  } catch (err) {
    if (err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'username already exists' })
    }
    console.error(err)
    return res.status(500).json({ error: 'internal error' })
  }
})

app.get('/api/products', (req, res) => {
  try {
    const rows = db.prepare('SELECT api_id as id, title, price, description, category, image FROM products ORDER BY id DESC').all()
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch products' })
  }
})

initDb()
seedProducts()

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
