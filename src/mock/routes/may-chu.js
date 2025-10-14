import { Router } from 'express';
import { servers } from '../data/servers.js';

const router = Router();

router.get('/', (req, res) => {
  res.json(servers);
});

export default router;
