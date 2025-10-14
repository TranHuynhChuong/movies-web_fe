import { Router } from 'express';
import { versions } from '../data/versions.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(versions);
});

export default router;
