import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await pool.connect();
        try {
          const result = await client.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
          if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return { id: user.id, name: user.name, email: user.email };
            }
          }
        } finally {
          client.release();
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const { email, name, image } = user;
          const client = await pool.connect();
          
          // Check if user already exists
          const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
          
          if (result.rows.length === 0) {
            // If user doesn't exist, create a new one
            await client.query('INSERT INTO users (email, name, image, auth_provider) VALUES ($1, $2, $3, $4)', [email, name, image, 'google']);
          }
          
          client.release();
          return true;
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
      }
      
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [token.email]);
        if (result.rows.length > 0) {
          const dbUser = result.rows[0];
          token.gender = dbUser.gender;
          token.phoneNumber = dbUser.phoneNumber;
          token.age = dbUser.age;
          token.address = dbUser.address;
        }
      } finally {
        client.release();
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.gender = token.gender;
      session.user.phoneNumber = token.phoneNumber;
      session.user.age = token.age;
      session.user.address = token.address;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
