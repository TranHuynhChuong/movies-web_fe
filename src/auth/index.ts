import { login } from '@/services/auth/post';
import CredentialsProvider from 'next-auth/providers/credentials';
import { type NextAuthOptions } from 'next-auth';
import { NEXTAUTH_SECRET } from '@/libs/secret';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    role: string;
    accessToken: string;
    expiresIn: number;
  }

  interface Session {
    accessToken?: string;
    expiresIn: number;
    user: {
      id: string;
      username: string;
      role: string;
    };
  }

  interface JWT {
    accessToken?: string;
    accessTokenExpiresIn?: number;
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
      },
      async authorize(credentials) {
        try {
          const { data } = await login(credentials);
          if (!data) return null;

          return {
            id: data.user.id,
            username: data.user.username,
            role: data.user.role,
            accessToken: data.access_token,
            expiresIn: data.expires_in,
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
        token.accessTokenExpiresIn = Date.now() + user.expiresIn * 1000;
      }

      if (Date.now() > token.accessTokenExpiresIn) {
        return {};
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user = token.user as { id: string; username: string; role: string };
      }
      return session;
    },
  },

  pages: {
    signIn: '/admin-login',
  },
};
