const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = pool;

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

const Hand = sequelize.define('Hand', {
    hands: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    analysis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playerId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unknown'
    }
}, {
    tableName: 'hands',
    freezeTableName: true,
});

// Sync the schema (this creates the table if it doesn't exist)
sequelize.sync()
    .then(() => console.log('All tables created successfully.'))
    .catch(error => console.error('Error while creating tables:', error));

module.exports = { sequelize, Hand };