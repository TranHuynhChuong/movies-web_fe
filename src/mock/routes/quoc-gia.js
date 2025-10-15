import { Router } from 'express';
import { countries } from '../data/countries.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(countries);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.patch('/:id', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

export default router;
