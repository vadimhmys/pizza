import { Pizza as PizzaMapping } from './mapping.js';

class Pizza {
  async getAll(query) {
    const { category, sortBy } = query;
    const where = {};
    if (category) where.categoryId = +category;
    const pizzas = await PizzaMapping.findAll({
      where,
      order: [[`${query.sortBy}`, `${query.order}`]],
    });
    return pizzas;
  }

  async getOne(id) {
    const pizza = await PizzaMapping.findByPk(id);
    if (!pizza) {
      throw new Error('Товар не найден в БД');
    }
    return pizza;
  }

  async create(data) {
    const { imageUrl = '', title, types = [], sizes = [], price, category = 0, rating } = data;
    const pizza = await PizzaMapping.create({
      imageUrl,
      title,
      types,
      sizes,
      price,
      category,
      rating,
    });
    return pizza;
  }

  async update(id, data) {
    const pizza = await PizzaMapping.findByPk(id);
    if (!pizza) {
      throw new Error('Товар не найден в БД');
    }

    const {
      imageUrl = pizza.imageUrl,
      title = pizza.title,
      types = pizza.types,
      sizes = pizza.sizes,
      price = pizza.price,
      category = pizza.category,
      rating = pizza.rating,
    } = data;
    await pizza.update({ imageUrl, title, types, sizes, price, category, rating });
    return pizza;
  }

  async delete(id) {
    const pizza = await PizzaMapping.findByPk(id);
    if (!pizza) {
      throw new Error('Товар не найден в БД');
    }
    await pizza.destroy();
    return pizza;
  }
}

export default new Pizza();
