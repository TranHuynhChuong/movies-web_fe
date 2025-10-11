import express from 'express';
import cors from 'cors';
import theLoaiRoutes from './routes/the-loai.js';
import quocGiaRoutes from './routes/quoc-gia.js';
import phimRoutes from './routes/phim.js';

const app = express();
app.use(cors());
app.use(express.json());

// Gắn route
app.use('/phim', phimRoutes);
app.use('/the-loai', theLoaiRoutes);
app.use('/quoc-gia', quocGiaRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mock server chạy tại: http://localhost:${PORT}`);
});
