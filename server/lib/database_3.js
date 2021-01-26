const pgpOptions = {}

const connectionString = process.env.DATABASE_URL

console.log('connectionString: ' + connectionString);

const pgp = require('pg-promise')(pgpOptions)

const db = pgp(connectionString)

module.exports = { db, connectionString }
