import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
  preferred_language: string;
  role: string;
  farm_name?: string;
  location?: string;
  farm_size?: number;
  primary_crop?: string;
  created_at: string;
  updated_at: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredLanguage: string;
  role: 'farmer' | 'agronomist' | 'admin';
  farmProfile: {
    farmName: string;
    location: string;
    stateOrRegion: string;
    farmSizeAcres: number;
    primaryCrops: string[];
    soilType: string;
    irrigationType: string;
    experienceYears: number;
  };
  createdAt: string;
}

export function toSafeUser(u: UserRecord): SafeUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    preferredLanguage: u.preferred_language || 'en',
    role: (u.role as any) || 'farmer',
    farmProfile: {
      farmName: u.farm_name || `${u.name}'s Farm`,
      location: u.location || 'Krishnagiri, Tamil Nadu',
      stateOrRegion: 'Tamil Nadu',
      farmSizeAcres: u.farm_size || 3.5,
      primaryCrops: u.primary_crop ? u.primary_crop.split(',').map((s) => s.trim()).filter(Boolean) : [],
      soilType: 'Red Loam with High Organic Matter',
      irrigationType: 'Drip Irrigation & Borewell',
      experienceYears: 10,
    },
    createdAt: u.created_at,
  };
}

class DatabaseManager {
  private db: any = null;
  private isSqlite = false;
  private jsonStorePath: string;
  private inMemoryUsers: Map<string, UserRecord> = new Map();

  constructor() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch (err) {
        console.warn('Could not create data directory:', err);
      }
    }

    const dbPath = path.join(dataDir, 'farmate.db');
    this.jsonStorePath = path.join(dataDir, 'users.json');

    // Attempt to initialize SQLite via node:sqlite
    try {
      // Dynamic require to avoid issues when bundling
      const { DatabaseSync } = require('node:sqlite');
      this.db = new DatabaseSync(dbPath);
      this.isSqlite = true;
      this.initSqliteSchema();
      console.log('FAR[M]ATE SQLite Database initialized successfully at:', dbPath);
    } catch (err) {
      console.warn('node:sqlite not available, falling back to persistent JSON storage:', err);
      this.initJsonStore();
    }

    this.seedDefaultUsers();
  }

  private initSqliteSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        phone TEXT,
        preferred_language TEXT DEFAULT 'en',
        role TEXT DEFAULT 'farmer',
        farm_name TEXT,
        location TEXT,
        farm_size REAL,
        primary_crop TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
    `);
  }

  private initJsonStore() {
    try {
      if (fs.existsSync(this.jsonStorePath)) {
        const raw = fs.readFileSync(this.jsonStorePath, 'utf8');
        const list: UserRecord[] = JSON.parse(raw);
        list.forEach((u) => this.inMemoryUsers.set(u.id, u));
      }
    } catch (e) {
      console.error('Failed to load JSON store:', e);
    }
  }

  private persistJsonStore() {
    try {
      const list = Array.from(this.inMemoryUsers.values());
      fs.writeFileSync(this.jsonStorePath, JSON.stringify(list, null, 2), 'utf8');
    } catch (e) {
      console.error('Failed to persist JSON store:', e);
    }
  }

  private seedDefaultUsers() {
    // Seed default farmer if not exists: Ramesh Patel
    const existing = this.findByEmail('ramesh.farmer@example.com');
    if (!existing) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('Farmer@123', salt);
      const now = new Date().toISOString();
      this.create({
        id: 'usr-1',
        name: 'Ramesh Patel',
        email: 'ramesh.farmer@example.com',
        password_hash: hash,
        phone: '+91 98765 43210',
        preferred_language: 'en',
        role: 'farmer',
        farm_name: 'Shri Lakshmi Organic Farm',
        location: 'Krishnagiri, Tamil Nadu',
        farm_size: 4.5,
        primary_crop: '',
        created_at: now,
        updated_at: now,
      });
      console.log('Seeded demo farmer Ramesh Patel (ramesh.farmer@example.com / Farmer@123)');
    }
  }

  public findById(id: string): UserRecord | null {
    if (this.isSqlite) {
      const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
      const row = stmt.get(id);
      return row || null;
    }
    return this.inMemoryUsers.get(id) || null;
  }

  public findByEmail(email: string): UserRecord | null {
    const cleanEmail = email.trim().toLowerCase();
    if (this.isSqlite) {
      const stmt = this.db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)');
      const row = stmt.get(cleanEmail);
      return row || null;
    }
    for (const u of this.inMemoryUsers.values()) {
      if (u.email.toLowerCase() === cleanEmail) return u;
    }
    return null;
  }

  public findByName(name: string): UserRecord | null {
    const cleanName = name.trim().toLowerCase();
    if (this.isSqlite) {
      const stmt = this.db.prepare('SELECT * FROM users WHERE LOWER(name) = LOWER(?)');
      const row = stmt.get(cleanName);
      return row || null;
    }
    for (const u of this.inMemoryUsers.values()) {
      if (u.name.toLowerCase() === cleanName) return u;
    }
    return null;
  }

  public findByIdentifier(identifier: string): UserRecord | null {
    const clean = identifier.trim().toLowerCase();
    if (clean.includes('@')) {
      return this.findByEmail(clean);
    }
    // Try by name first, if not found try email just in case
    const byName = this.findByName(clean);
    if (byName) return byName;
    return this.findByEmail(clean);
  }

  public create(record: UserRecord): UserRecord {
    if (this.isSqlite) {
      const stmt = this.db.prepare(`
        INSERT INTO users (
          id, name, email, password_hash, phone, preferred_language, role,
          farm_name, location, farm_size, primary_crop, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `);
      stmt.run(
        record.id,
        record.name,
        record.email,
        record.password_hash,
        record.phone || null,
        record.preferred_language || 'en',
        record.role || 'farmer',
        record.farm_name || null,
        record.location || null,
        record.farm_size || null,
        record.primary_crop || null,
        record.created_at,
        record.updated_at
      );
      return record;
    }

    this.inMemoryUsers.set(record.id, record);
    this.persistJsonStore();
    return record;
  }

  public update(id: string, updates: Partial<UserRecord>): UserRecord | null {
    const existing = this.findById(id);
    if (!existing) return null;

    const updated: UserRecord = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (this.isSqlite) {
      const stmt = this.db.prepare(`
        UPDATE users SET
          name = ?,
          email = ?,
          phone = ?,
          preferred_language = ?,
          role = ?,
          farm_name = ?,
          location = ?,
          farm_size = ?,
          primary_crop = ?,
          updated_at = ?
        WHERE id = ?
      `);
      stmt.run(
        updated.name,
        updated.email,
        updated.phone || null,
        updated.preferred_language,
        updated.role,
        updated.farm_name || null,
        updated.location || null,
        updated.farm_size || null,
        updated.primary_crop || null,
        updated.updated_at,
        id
      );
      return updated;
    }

    this.inMemoryUsers.set(id, updated);
    this.persistJsonStore();
    return updated;
  }

  public getAllSafe(): SafeUser[] {
    if (this.isSqlite) {
      const stmt = this.db.prepare('SELECT * FROM users ORDER BY created_at DESC');
      const rows: UserRecord[] = stmt.all() as UserRecord[];
      return rows.map(toSafeUser);
    }
    return Array.from(this.inMemoryUsers.values()).map(toSafeUser);
  }
}

export const farmateDB = new DatabaseManager();
