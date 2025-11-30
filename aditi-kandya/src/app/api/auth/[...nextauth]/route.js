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
        const client = await pool.connect();
        try {
          const { email, name, image } = user;
          let result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
          if (result.rows.length === 0) {
            result = await client.query('INSERT INTO users (email, name, image, auth_provider) VALUES ($1, $2, $3, $4) RETURNING *', [email, name, image, 'google']);
          }
          const dbUser = result.rows[0];
          user.db_id = dbUser.id;
          user.role = dbUser.role;
          if (dbUser.email === 'aditikandya1@gmail.com' || dbUser.role === 'ADMIN') {
            user.role = 'owner';
          }
        } catch (error) {
          console.error('Error during sign-in:', error);
          return false;
        } finally {
          client.release();
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.db_id || user.id;
        token.role = user.role;
      }
      
      if (token.id) {
          const client = await pool.connect();
          try {
            const result = await client.query('SELECT * FROM users WHERE id = $1', [token.id]);
            if (result.rows.length > 0) {
              const dbUser = result.rows[0];
              token.gender = dbUser.gender;
              token.phoneNumber = dbUser.phoneNumber;
              token.age = dbUser.age;
              token.address = dbUser.address;
              token.role = dbUser.role;

              if (dbUser.email === 'aditikandya1@gmail.com' || dbUser.role === 'ADMIN') {
                token.role = 'owner';
              }
            }
          } finally {
            client.release();
          }
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.gender = token.gender;
      session.user.phoneNumber = token.phoneNumber;
      session.user.age = token.age;
      session.user.address = token.address;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
