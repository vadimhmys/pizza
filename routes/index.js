import express from 'express';

import pizza from './pizza.js';

const router = new express.Router();

router.use('/pizza', pizza);

export default router;
