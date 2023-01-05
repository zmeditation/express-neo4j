import { User } from "../domain/models/user";

export class GetUser {
  async execute(id: string): Promise<User> {
    return {
      id: "123456",
      firstName: "joe",
      lastName: "olley",
      email: "joe@nate.tech",
      created: new Date(),
    };
  }
}
