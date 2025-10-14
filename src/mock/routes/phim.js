import { Router } from 'express';
import { moviesList } from '../data/movies-list.js';
import { movieDetail } from '../data/movies-detail.js';
import { moviesWatchInf } from '../data/movies-watchinf.js';

const router = Router();

router.get('/tim-kiem', (req, res) => {
  res.json(moviesList);
});

router.get('/xem-phim/:id', (req, res) => {
  res.json(moviesWatchInf);
});

router.get('/:id', (req, res) => {
  res.json(movieDetail);
});

export default router;
