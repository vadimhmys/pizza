import express from 'express';
import PizzaController from '../controllers/Pizza.js';

const router = new express.Router();

router.get('/getall', PizzaController.getAll);
router.get('/getone/:id([0-9]+)', PizzaController.getOne);
router.post('/create', PizzaController.create);
router.put('/update/:id([0-9]+)', PizzaController.update);
router.delete('/delete/:id([0-9]+)', PizzaController.delete);

export default router;
