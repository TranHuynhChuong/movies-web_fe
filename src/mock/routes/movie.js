import { Router } from 'express';
import { moviesList } from '../data/movies-list.js';
import { movieDetail } from '../data/movie-detail.js';

const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.patch('/:id', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.get('/search', (req, res) => {
  res.json(moviesList);
});

router.get('/list', (req, res) => {
  res.json(moviesList);
});

router.get('/total', (req, res) => {
  res.json({
    data: {
      movies: 16,
      series: 12,
      upcoming: 6,
    },
  });
});

router.get('/:id', (req, res) => {
  res.json(movieDetail);
});

export default router;
