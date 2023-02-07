import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../Utils/db';
import { compare } from 'bcryptjs';
import type {AuthOptions} from 'next-auth';


export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        await prisma.$connect();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user) {
          throw new Error(`No user with email ${email} was found`);
        }

        const isValid = await compare(password as string, user.password);

        if (!isValid) {
          throw new Error(`password incorrect`);
        }

        return { email: user.email, id: user.id, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default NextAuth(authOptions);
