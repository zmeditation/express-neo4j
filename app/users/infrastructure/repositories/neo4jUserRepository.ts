import { Driver } from "neo4j-driver";
import { User } from "../../domain/models/user";
import { UserNode } from "../models/nodes/user";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../../domain/interfaces/userRepository";

export class Neo4jUserRepository implements UserRepository {
  constructor(private readonly driver: Driver) {}

  mapToUser(node: UserNode): User {
    if (!node.labels.includes("User")) {
      throw new Error("Invalid node type, expecting 'User'");
    }
    return {
      id: node.properties.id,
      email: node.properties.email,
      firstName: node.properties.firstName,
      lastName: node.properties.lastName,
      created: node.properties.created.toNumber(),
    };
  }

  async create(user: {
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const session = this.driver.session();
    try {
      const query = `
        MERGE (user:User {email: $email }) 
        ON CREATE SET
          user.id = $id,
          user.firstName = $firstName,
          user.lastName = $lastName,
          user.created = $created
        RETURN user`;
      const params = {
        id: "12345",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        created: 1665690371850,
      };
      const result = await session.writeTransaction((tx) =>
        tx.run(query, params)
      );
      // const result = await session.executeWrite((tx) => tx.run(query, params));
      console.log("RESULT", JSON.stringify(result));
      const userNode: UserNode = result.records[0].get("user");
      return this.mapToUser(userNode);
    } finally {
      await session.close();
    }
  }

  async follow(actorId: string, subjectId: string): Promise<boolean> {
    const session = this.driver.session();
    try {
      const query = `
        MATCH
          (actor:User {id: $actorId }),
          (subject:User {id: $subjectId })
        MERGE res =
          (actor)-[rel:FOLLOWS]->(subject)
        ON CREATE SET
          rel.created = $created
        RETURN res`;
      const params = {
        actorId,
        subjectId,
        created: Date.now(),
      };
      const result = await session.executeWrite((tx) => tx.run(query, params));
      const relation = result.records[0].get("res");
      return relation;
    } finally {
      await session.close();
    }
  }
}
