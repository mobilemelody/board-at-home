
const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const client = new Client({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to Postgres')
  }
})

module.exports = {client}