import express from 'express';
import cors from 'cors';
import theLoaiRoutes from './routes/the-loai.js';
import quocGiaRoutes from './routes/quoc-gia.js';
import phimRoutes from './routes/phim.js';
import phienBanRoutes from './routes/phien-ban.js';
import mayChuRoutes from './routes/may-chu.js';
import xacThucRoutes from './routes/xac-thuc.js';
import thongKeRoutes from './routes/thong-ke.js';

const app = express();
app.use(cors());
app.use(express.json());

// Gắn route
app.use('/phim', phimRoutes);
app.use('/the-loai', theLoaiRoutes);
app.use('/quoc-gia', quocGiaRoutes);
app.use('/phien-ban', phienBanRoutes);
app.use('/may-chu', mayChuRoutes);
app.use('/xac-thuc', xacThucRoutes);
app.use('/thong-ke', thongKeRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mock server chạy tại: http://localhost:${PORT}`);
});
