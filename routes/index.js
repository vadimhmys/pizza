import express from 'express';

import pizza from './pizza.js';
import category from './category.js';

const router = new express.Router();

router.use('/pizza', pizza);
router.use('/category', category);

export default router;
