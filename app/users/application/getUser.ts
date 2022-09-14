type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export class GetUser {
  async execute(id: string): Promise<User> {
    return {
      id: "123456",
      firstName: "joe",
      lastName: "olley",
      email: "joe@nate.tech",
    };
  }
}
