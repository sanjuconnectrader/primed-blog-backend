import { Sequelize } from 'sequelize';
import config        from '../config/config.js';
import blogModel     from './blogmodel.js';

const env       = process.env.NODE_ENV || 'development';
const dbConfig  = config[env];

// ──────────────────────────────────────────────────────────────
// Ensure the port is numeric (falls back to default 3306)
// ──────────────────────────────────────────────────────────────
const DB_PORT = Number(dbConfig.port) || 3306;

const sequelize = new Sequelize(
  dbConfig.database,           // DB name
  dbConfig.username,           // user
  dbConfig.password,           // pwd
  {
    host:   dbConfig.host,
    port:   DB_PORT,           // ✅ explicit port
    dialect: dbConfig.dialect, // 'mysql'
    logging: false,

    // Uncomment if your provider requires SSL (e.g. Railway, PlanetScale)
    // dialectOptions: {
    //   ssl: { rejectUnauthorized: false },
    // },
  }
);

const db = {
  Blog: blogModel(sequelize, Sequelize.DataTypes),
  sequelize,
  Sequelize,
};

export default db;
