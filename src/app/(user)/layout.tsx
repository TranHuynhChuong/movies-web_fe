import { Header } from '@/components/Header';
export const dynamic = 'force-dynamic';
export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="min-h-screen mx-auto max-w-9xl">{children}</main>
    </>
  );
}
