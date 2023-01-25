import { Follows } from "../models/follows";
import { User } from "../models/user";

export interface UserRepository {
  getById: (id: string) => Promise<User>;
  create: (user: {
    email: string;
    firstName: string;
    lastName: string;
  }) => Promise<User>;
  follow: (actorId: string, subjectId: string) => Promise<Follows>;
}
