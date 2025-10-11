import { Router } from 'express';
import { countries } from '../data/countries.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(countries);
});

export default router;
