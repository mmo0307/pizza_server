const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const moment = require('moment-timezone');

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Clients = sequelize.define('clients', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    //role: {type: DataTypes.INTEGER, defaultValue: 2}
});

const Addresses = sequelize.define('addresses', {
    id_address: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address_name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Orders = sequelize.define('orders', {
    order_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //client_id: {type: DataTypes.JSON, allowNull: false},
    client_name: {type: DataTypes.STRING, allowNull: false},
    products: {type: DataTypes.JSON, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    order_date: {type: DataTypes.DATE, allowNull: false, defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss')}
    //address_id: {type: DataTypes.INTEGER, allowNull: false},
});

Role.hasMany(Clients);

Addresses.hasMany(Orders);

Clients.hasMany(Orders);

module.exports = {
    Role,
    Clients,
    Addresses,
    Orders
}
