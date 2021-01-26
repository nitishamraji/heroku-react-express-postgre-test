require('dotenv').config();

module.exports = {
  development: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    operatorsAliases: "Sequelize.Op"
  },
  test: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    operatorsAliases: "Sequelize.Op"
  },
  production: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    operatorsAliases: "Sequelize.Op",
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
  }
};
