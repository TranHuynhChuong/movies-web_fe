import { Header } from '@/components/Header';
import { Providers } from '@/contexts/Providers';

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <Header />
      <main className="min-h-screen">{children}</main>
    </Providers>
  );
}
