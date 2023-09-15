import { type NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/server/db";

import { mysqlTable } from "@/server/db/schema";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, mysqlTable),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        //session.userSettings = token.userSettings;
      }

      return session;
    },

    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        //TODO: get userSettings

        if (!token.userSettings) {
          //TODO create userSettings
        }
      }

      return token;
    },

    redirect() {
      return "/admin";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
