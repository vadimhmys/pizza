import PizzaModel from '../models/Pizza.js';
import AppError from '../errors/AppError.js';

class Pizza {
  async getAll(req, res, next) {
    try {
      const pizzas = await PizzaModel.getAll();
      res.json(pizzas);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id товара');
      }
      const pizza = await PizzaModel.getOne(req.params.id);
      res.json(pizza);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      const pizza = await PizzaModel.create(req.body);
      res.json(pizza);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id товара');
      }
      const pizza = await PizzaModel.update(req.params.id, req.body);
      res.json(pizza);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Не указан id товара');
      }
      const pizza = await PizzaModel.delete(req.params.id);
      res.json(pizza);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Pizza();
