const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  databse: 'reviews',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,

});

const connection = {
  pool,
  query: (...args) => pool.connect().then((client) => client.query(...args).then((res) => {
    client.release();
    return res.rows;
  })),
};

module.exports = connection;
