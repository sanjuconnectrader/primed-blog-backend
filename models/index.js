import { Sequelize } from 'sequelize';
import config from '../config/config.js';
import blogModel from './blogmodel.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const db = {
  Blog: blogModel(sequelize, Sequelize.DataTypes),
  sequelize,
  Sequelize,
};

export default db;