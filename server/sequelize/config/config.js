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
    pool: {
        max: 20,
        min: 1,
        idle: 10,
      },
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
    define: {
      timestamps: false,
    }
  }
};
