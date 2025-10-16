import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: any) {
    type Token = {
      user?: {
        role?: string;
      };
    };

    const token = req.nextauth.token as Token | undefined;
    const userRole = token?.user?.role;

    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
