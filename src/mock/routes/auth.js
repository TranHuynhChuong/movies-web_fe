import { Router } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'super-secure-random-string-1234567890';

const router = Router();

const users = [
  {
    id: '1',
    username: 'admin',
    password: '123456',
    role: 'ADMIN',
  },
  {
    id: '2',
    username: 'user',
    password: '123456',
    role: 'USER',
  },
];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({
      error: 'Invalid username or password',
    });
  }

  const expiresIn = 3600; // 1 giờ
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
  return res.status(200).json({
    data: {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    },
  });
});

export default router;
