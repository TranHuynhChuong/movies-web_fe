import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as {
      user?: { role?: string };
      expiresIn?: number;
    } | null;

    const userRole = token?.user?.role;
    const isExpired = Date.now() > (token?.expiresIn ?? 0);

    // --- Kiểm tra hết hạn token ---
    if (isExpired) {
      const loginUrl = new URL('/admin-login', req.url);
      loginUrl.searchParams.set('expired', '1');
      return NextResponse.redirect(loginUrl);
    }

    // --- Chặn người không phải ADMIN ---
    if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // --- Cho phép qua ---
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Nếu trả về true thì cho phép qua middleware,
       * nếu false thì redirect về trang đăng nhập của next-auth.
       */

      authorized: ({ token }) => {
        return !!token;
      },
    },
    pages: {
      signIn: '/admin-login',
    },
  }
);

export const config = {
  /**
   * Chỉ áp dụng middleware cho tất cả route bắt đầu bằng /admin/
   */
  matcher: ['/admin/:path*'],
};
