import { Router } from 'express';
import { genres } from '../data/genres.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(genres);
});

export default router;
