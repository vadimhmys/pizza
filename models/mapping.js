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
  rating: { type: DataTypes.FLOAT },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define('basket_product', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const ProductProp = sequelize.define('product_prop', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
});

Basket.belongsToMany(Pizza, { through: BasketProduct, onDelete: 'CASCADE' });
Pizza.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' });

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);
Pizza.hasMany(BasketProduct);
BasketProduct.belongsTo(Pizza);

Category.hasMany(Pizza, { onDelete: 'RESTRICT' });
Pizza.belongsTo(Category);

Pizza.belongsToMany(User, { through: Rating, onDelete: 'CASCADE' });
User.belongsToMany(Pizza, { through: Rating, onDelete: 'CASCADE' });

Pizza.hasMany(Rating);
Rating.belongsTo(Pizza);
User.hasMany(Rating);
Rating.belongsTo(User);

Pizza.hasMany(ProductProp, { as: 'props', onDelete: 'CASCADE' });
ProductProp.belongsTo(Pizza);

export { Pizza, Rating, Category, ProductProp, User, Basket, BasketProduct };
