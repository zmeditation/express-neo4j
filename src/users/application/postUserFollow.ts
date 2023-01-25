import { UserRepository } from "../domain/interfaces/userRepository";
import { Follows } from "../domain/models/follows";

export type PostUserFollowPayload = {
  actorId: string;
  subjectId: string;
};

export class PostUserFollow {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    actorId,
    subjectId,
  }: PostUserFollowPayload): Promise<Follows> {
    return this.userRepository.follow(actorId, subjectId);
  }
}
