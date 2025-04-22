import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prismaClient } from "./db"; // path to your Prisma client
import { VerifyCallback } from "passport-oauth2";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await prismaClient.user.findUnique({ where: { id } });
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: passport.Profile,
      done: VerifyCallback
    ) => {
      try {
        const existingUser = await prismaClient.user.findUnique({
          where: { githubId: profile.id },
        });

        if (existingUser) return done(null, existingUser);

        const user = await prismaClient.user.create({
          data: {
            githubId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            avatarUrl: profile.photos?.[0].value,
          },
        });

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
