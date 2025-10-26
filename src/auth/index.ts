import { login } from '@/services/auth/post';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DefaultSession, DefaultUser, type NextAuthOptions } from 'next-auth';
import { NEXTAUTH_SECRET } from '@/libs/secret';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    username: string;
    role: string;
    accessToken: string;
    expiresIn: number;
  }

  interface Session extends DefaultSession {
    accessToken?: string;
    expiresIn: number;
    user: {
      id: string;
      username: string;
      role: string;
    };
  }

  interface JWT extends DefaultJWT {
    accessToken?: string;
    expiresIn?: number;
    user?: {
      id: string;
      username: string;
      role: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const { data } = await login(credentials);
          if (!data) return null;

          return {
            id: data.user.id,
            username: data.user.username,
            role: data.user.role,
            accessToken: data.accessToken,
            expiresIn: data.expiresIn,
          };
        } catch (err) {
          console.error('Login error:', err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  secret: NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.user = { id: user.id, username: user.username, role: user.role };
        token.accessToken = user.accessToken;
        token.expiresIn = Date.now() + user.expiresIn;
      }

      if (token.expiresIn && typeof token.expiresIn === 'number' && Date.now() > token.expiresIn) {
        console.log('Token hết hạn');
        return {};
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user = token.user as { id: string; username: string; role: string };
        session.expiresIn = token.expiresIn as number;
      }
      return session;
    },
  },

  pages: {
    signIn: '/admin-login',
  },
};
