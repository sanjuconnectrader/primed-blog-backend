import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,      // <- added
    dialect:  'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT_TEST || process.env.DB_PORT, // optional override
    dialect:  'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,      // <- added
    dialect:  'mysql',
  },
};
