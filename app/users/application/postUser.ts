import { UserRepository } from "../domain/interfaces/userRepository";
import { User } from "../domain/models/user";

export type PostUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

export class PostUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userPayload: PostUserPayload): Promise<User> {
    return await this.userRepository.create(userPayload);
  }
}
