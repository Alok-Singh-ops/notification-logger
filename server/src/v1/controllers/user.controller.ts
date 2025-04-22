import { NextFunction, Request, Response } from "express";
import { signUpSchema } from "../schema";
import { UserService } from "../services/user.service";

// user controller handles http request and forward the request to services
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async addUser(req: Request, res: Response, next: NextFunction) {
    const { error, data } = signUpSchema.safeParse(req.body);
    if (error) {
      res.status(400).json({
        message: "Please provide all the details",
      });
    } else {
      const user = await this.userService.registerUser(data);

      if (!user) {
        return res.status(409).json({
          message: "User with this email already exists",
        });
      }

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          email: user.email,
        },
      });
    }
  }
}
