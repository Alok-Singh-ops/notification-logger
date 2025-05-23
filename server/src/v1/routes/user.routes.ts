import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  userController.addUser(req, res, next);
});

export default userRouter;
