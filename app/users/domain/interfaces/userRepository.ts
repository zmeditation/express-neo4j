import { User } from "../models/user";

export interface UserRepository {
  create: (user: {
    email: string;
    firstName: string;
    lastName: string;
  }) => Promise<User>;
  follow: (actorId: string, subjectId: string) => Promise<Boolean>;
}
