import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const options = {
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await client.connect();
        const db = client.db('webcam-modeling');
        const collection = db.collection('users');

        const user = await collection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with the email');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.role = user.role;
      return session;
    },
  },
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/register',
  },
};

export default (req, res) => NextAuth(req, res, options);
