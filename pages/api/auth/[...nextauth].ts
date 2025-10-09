import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // TODO: Replace this with real user lookup
        const { email, password } = credentials as any
        if (email === process.env.DEV_ADMIN_EMAIL && password === process.env.DEV_ADMIN_PASS) {
          return { id: '1', name: 'Admin', email }
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
})
