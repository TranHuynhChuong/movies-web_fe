'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', {
      redirect: false,
      username,
      password,
    }).then((res) => {
      if (res?.error) {
        setError('Tên đăng nhập/mật khẩu không đúng');
      } else {
        router.push('/admin');
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="border p-8 rounded-2xl shadow-lg w-96">
      <h1 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-3 p-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-primary text-black py-2 rounded-md hover:bg-primary-dark"
      >
        Đăng nhập
      </button>
      {error && <p className="text-red-500 pt-4 text-center">{error}</p>}
    </form>
  );
}
