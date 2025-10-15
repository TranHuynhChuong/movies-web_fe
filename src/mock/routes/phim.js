import { Router } from 'express';
import { moviesList } from '../data/movies-list.js';
import { movieInf } from '../data/movie-inf.js';
import { movieDetail } from '../data/movie-detail.js';
import { moviesWatchInf } from '../data/movie-watchinf.js';

const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.patch('/:id', (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.get('/chi-tiet/:id', (req, res) => {
  res.json(movieDetail);
});

router.get('/tim-kiem', (req, res) => {
  res.json(moviesList);
});

router.get('/tong', (req, res) => {
  res.json({
    data: {
      movies: 16,
      series: 12,
      upcoming: 6,
    },
  });
});

router.get('/xem-phim/:id', (req, res) => {
  res.json(moviesWatchInf);
});

router.get('/:id', (req, res) => {
  res.json(movieInf);
});

export default router;
