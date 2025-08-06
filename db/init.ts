import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbFile = './db/database.sqlite3';

async function initDB() {
  const db = await open({ filename: dbFile, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref TEXT,
      uid TEXT,
      server TEXT,
      amount INTEGER,
      method TEXT,
      phone TEXT,
      status TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Database siap digunakan');
}

initDB();
