import express, { json, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-github2";
import session from "express-session";
import cors from "cors"
import axios from "axios"
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend
// app.use(v1Router)

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  new Strategy(
    {
      clientID: "Ov23li02DFf8qzD2YcPS",
      clientSecret: "7d3c99c49ab5221e762788b93b905f7cbe1ed7f1",
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ["read:user", "user:email","write:repo_hook"], // Ensures user details and email
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      profile.accessToken = accessToken; // Attach accessToken to profile
      return done(null, profile);
    }
  )
);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // @ts-ignore
  done(null, user);
});

app.get("/auth/github", passport.authenticate("github"));





app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  // @ts-ignore
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as any; // Type assertion for TypeScript
    const accessToken = user.accessToken; // Get accessToken from profile

    try {
      // Fetch user's GitHub profile using the token
      res.redirect(`http://localhost:5173/projects?token=${accessToken}`);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Error fetching GitHub profile" });
    }
  }
);


// app.post("/webhook",(req,res)=>{
//   console.log(req.body);
// })


// get all public repo
app.get("/repo",async(req:Request,res:Response)=>{
  const token = req.headers["authorization"]
  console.log(token);
  try {
    const repo = await axios.get("https://api.github.com/user/repos",{
      headers: {
        "Authorization": token
      }
    })
    const filteredRepoWithoutForked = repo.data.filter((item:any)=> item.fork === false)
    res.status(200).json(filteredRepoWithoutForked)
  } catch (error) {
    // console.log(error);
  }
})

app.post("/webhook", (req, res) => {
  console.log("hi");
  console.log(req.body,"body");
  const commits = req.body.commits;
  res.status(200).send("Changelog updated");
});

app.get("/",(req,res)=>{
  res.status(200).json({
    message: "ok"
  })
})

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
