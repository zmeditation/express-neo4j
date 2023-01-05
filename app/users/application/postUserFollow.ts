import { UserRepository } from "../domain/interfaces/userRepository";
import { User } from "../domain/models/user";

export type PostUserFollowPayload = {
  actorId: string;
  subjectId: string;
};

export class PostUserFollow {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    actorId,
    subjectId,
  }: PostUserFollowPayload): Promise<Boolean> {
    return await this.userRepository.follow(actorId, subjectId);
  }
}
