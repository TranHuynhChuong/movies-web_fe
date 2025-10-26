import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: any) {
    type Token = {
      user?: {
        role?: string;
      };
      accessTokenExpiresIn?: number;
    };

    const token = req.nextauth.token as Token | undefined;
    const userRole = token?.user?.role;
    const isExpired = Date.now() > (token?.accessTokenExpiresIn ?? 0);

    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN' && isExpired) {
      return NextResponse.redirect(new URL('/admin-login', req.url));
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
