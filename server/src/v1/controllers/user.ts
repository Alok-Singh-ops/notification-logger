import { NextFunction, Request, Response } from "express";
import { signUpSchema } from "../schema";

export class UserController{



  public addUser(req:Request,res:Response,next:NextFunction){
      const {error,data} = signUpSchema.safeParse(req.body)
      if (error) {
        res.status(400).json({
          message: "Please provide all the details"
        })
      } else {
        const {email,name,password} = data
      }


  }

}