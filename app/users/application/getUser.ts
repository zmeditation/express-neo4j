import { UserRepository } from "../domain/interfaces/userRepository";
import { User } from "../domain/models/user";

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}
