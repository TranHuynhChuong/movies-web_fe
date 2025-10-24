import express from 'express';
import cors from 'cors';
import genreRoutes from './routes/genre.js';
import countryRoutes from './routes/country.js';
import movieRoutes from './routes/movie.js';
import versionRoutes from './routes/version.js';
import serverRoutes from './routes/server.js';
import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';

const app = express();
app.use(cors());
app.use(express.json());

// Gắn route
app.use('/movies', movieRoutes);
app.use('/genres', genreRoutes);
app.use('/countries', countryRoutes);
app.use('/versions', versionRoutes);
app.use('/servers', serverRoutes);
app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mock server chạy tại: http://localhost:${PORT}`);
});
