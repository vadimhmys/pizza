import { Pizza as PizzaMapping } from './mapping.js';

class Pizza {
  async getAll(query) {
    let { categoryId, sortBy, order, limit, page } = query;
    limit = limit && /[0-9]+/.test(limit) && parseInt(limit) ? parseInt(limit) : 4;
    page = page && /[0-9]+/.test(page) && parseInt(page) ? parseInt(page) : 1;
    const offset = (page - 1) * limit;
    const where = {};
    let pizzas;
    if (categoryId && categoryId > 0) {
      where.categoryId = +categoryId;
      pizzas = await PizzaMapping.findAndCountAll({
        where,
        limit,
        offset,
        order: [[`${sortBy}`, `${order}`]],
      });
    }

    if (categoryId === '0') {
      pizzas = await PizzaMapping.findAndCountAll({
        where,
        limit,
        offset,
        order: [[`${sortBy}`, `${order}`]],
      });
    }
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
