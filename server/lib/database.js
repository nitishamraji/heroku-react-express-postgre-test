const Sequelize = require('sequelize')

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
})

const Stocks = database.define('stocks', {
  doc: { type: Sequelize.JSONB, allowNull: false }
})

module.exports = {
  Stocks,
  database
}
