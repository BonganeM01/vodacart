import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const PORT = process.env.PORT || 3000
const DB_FILE = process.env.DATABASE_FILE || './data.db'

const app = express()
app.use(cors())
app.use(express.json())

const usePostgres = Boolean(process.env.DATABASE_URL || process.env.DB_HOST)
let db = null
let pgPool = null

if (usePostgres) {
  const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'vodacart'}:${process.env.DB_PASSWORD || 'vodacart_password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'vodacart'}`
  pgPool = new Pool({ connectionString, ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined })
  console.log('Using PostgreSQL at', process.env.DATABASE_URL || process.env.DB_HOST)
} else {
  db = new Database(DB_FILE)
}

function initSqlite() {
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

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' })
  }
  const password_hash = bcrypt.hashSync(password, 10)

  try {
    if (usePostgres) {
      // try to find customer role
      let roleId = null
      try {
        const r = await pgPool.query("SELECT id FROM roles WHERE name='customer' LIMIT 1")
        if (r.rows.length) roleId = r.rows[0].id
      } catch (e) {
        // ignore; role may not exist
      }

      const q = `INSERT INTO users (username, email, password_hash, role_id, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING id, username`
      const values = [username, email || null, password_hash, roleId, new Date().toISOString()]
      const result = await pgPool.query(q, values)
      return res.json(result.rows[0])
    } else {
      const stmt = db.prepare('INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
      const info = stmt.run(username, email || null, password_hash, new Date().toISOString())
      return res.json({ id: info.lastInsertRowid, username })
    }
  } catch (err) {
    if (usePostgres && err && err.code === '23505') {
      return res.status(409).json({ error: 'username already exists' })
    }
    if (!usePostgres && err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'username already exists' })
    }
    console.error(err)
    return res.status(500).json({ error: 'internal error' })
  }
})

app.get('/api/products', async (req, res) => {
  try {
    if (usePostgres) {
      const q = `SELECT products.id::text as id, products.title, products.price, products.description, COALESCE(products.category, categories.name) AS category, products.image
                 FROM products
                 LEFT JOIN categories ON products.category_id = categories.id
                 ORDER BY products.created_at DESC`
      const result = await pgPool.query(q)
      return res.json(result.rows)
    } else {
      const rows = db.prepare('SELECT api_id as id, title, price, description, category, image FROM products ORDER BY id DESC').all()
      return res.json(rows)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch products' })
  }
})

// If using sqlite, run init + seed like before
if (!usePostgres) {
  initSqlite()
  seedProducts()
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
