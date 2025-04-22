import { prismaClient } from "../../config/db";

// repo are responsible for db operation
export class UserRepo {
  async createUser(data: { email: string; password: string }) {
    return await prismaClient.user.create({
      data: {
        ...data,
        githubId: "default-github-id", // Replace with a valid value or logic to generate it
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  }
}
