import { Router } from "express";
import userRouter from "./routes/user.routes";
import session from "express-session";
import passport from "passport";
import router from "./routes/auth.routes";

const v1Router = Router();

v1Router.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
v1Router.use(passport.initialize());
v1Router.use(passport.session());

v1Router.use("/auth", router);
v1Router.use("/user", userRouter);
export default v1Router;
