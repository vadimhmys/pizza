import sequelize from '../sequelize.js';
import database from 'sequelize';

const { DataTypes } = database;

const Pizza = sequelize.define('pizza', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  types: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  sizes: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.FLOAT },
});

export { Pizza };
