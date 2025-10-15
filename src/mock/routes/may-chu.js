import { Router } from 'express';
import { servers } from '../data/servers.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(servers);
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
