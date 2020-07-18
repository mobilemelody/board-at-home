
const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to Postgres')
  }
})

module.exports = {client}