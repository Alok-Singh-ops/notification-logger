import { prismaClient } from "../../config/db";
import { UserRepo } from "../repository/user.repository";

export class UserService {
  private userRepo: UserRepo;
  constructor() {
    this.userRepo = new UserRepo();
  }

  async registerUser(data: { email: string; password: string }) {
    const existingUser = await this.userRepo.findUserByEmail(data.email);
    if (existingUser) {
      return null;
    }
    return await this.userRepo.createUser(data);
  }
}
