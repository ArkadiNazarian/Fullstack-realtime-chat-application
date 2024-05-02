import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Github from '@/lib/github'

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_ID')
    }

    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE_CLIENT_SECRET')
    }

    return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt(context) {

            const { token, user, account, profile, trigger, session } = context;

            
            if (user) {
                token.user = user;
            }
            return token;

        },
        async session(context) {

            const { session, token } = context;
            const user = token.user;
            
            if (session && user) {
                session.user = user;
            }

            return session
        },
        redirect() {
            return '/dashboard'
        },
    },
}