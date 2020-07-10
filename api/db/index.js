
const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
    client.query('SELECT * FROM "Game"', (err, res) => {
      if (err) {
        console.log(err)
      } else {
      console.log(res)
      }
    })
  }
})

// SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\' ORDER BY table_name

module.exports = {client}