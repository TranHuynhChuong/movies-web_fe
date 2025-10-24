import { Router } from 'express';
const router = Router();

const dbStats = {
  movies: 120,
  genres: 15,
  countries: 8,
  versions: 25,
  servers: 4,
  usedStorageMB: 5120,
};

router.get('/', (req, res) => {
  return res.status(200).json({
    data: {
      movies: dbStats.movies,
      genres: dbStats.genres,
      countries: dbStats.countries,
      versions: dbStats.versions,
      servers: dbStats.servers,
      usedStorageMB: dbStats.usedStorageMB,
    },
  });
});

export default router;
