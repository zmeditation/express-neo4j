import { Driver, Path, Session } from "neo4j-driver";
import { User } from "../../domain/models/user";
import { UserNode } from "../models/nodes/user";
import { v4 as uuid } from "uuid";
import { UserRepository } from "../../domain/interfaces/userRepository";
import { runQuery } from "../../../graph/runQuery";
import { Follows } from "../../domain/models/follows";

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
      created: node.properties.created.toString(),
    };
  }

  mapToRelationship(path: Path): Follows {
    const segment = path.segments[0];
    if (segment.relationship.type !== "FOLLOWS") {
      throw new Error("Invalid path relationship type, expecting 'FOLLOWS'");
    }
    return {
      actorId: segment.start.properties.id,
      subjectId: segment.end.properties.id,
      type: segment.relationship.type,
      created: segment.relationship.properties.created.toString(),
    };
  }

  async create(user: {
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    const query = `
    MERGE (user:User {email: $email }) 
    ON CREATE SET
      user.id = $id,
      user.firstName = $firstName,
      user.lastName = $lastName,
      user.created = datetime()
    RETURN user`;
    const params = {
      id: uuid(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return runQuery<User>(this.driver, async (session: Session) => {
      const result = await session.executeWrite((tx) => tx.run(query, params));
      const userNode: UserNode = result.records[0].get("user");
      return this.mapToUser(userNode);
    });
  }

  async getById(id: string) {
    const query = `
        MATCH (user)
        WHERE user.id = $id
        RETURN user`;
    const params = { id };
    return runQuery<User>(this.driver, async (session: Session) => {
      const result = await session.executeRead((tx) => tx.run(query, params));
      const userNode: UserNode = result.records[0].get("user");
      return this.mapToUser(userNode);
    });
  }

  async getByEmail(email: string) {
    const query = `
        MATCH (user)
        WHERE user.email = $email
        RETURN user`;
    const params = { email };

    return runQuery<User>(this.driver, async (session: Session) => {
      const result = await session.executeRead((tx) => tx.run(query, params));
      const userNode: UserNode = result.records[0].get("user");
      return this.mapToUser(userNode);
    });
  }

  async follow(actorId: string, subjectId: string): Promise<Follows> {
    const query = `
        MATCH
          (actor:User {id: $actorId }),
          (subject:User {id: $subjectId })
        MERGE relationship =
          (actor)-[rel:FOLLOWS]->(subject)
        ON CREATE SET
          rel.created = datetime()
        RETURN relationship`;
    const params = { actorId, subjectId };

    return runQuery<Follows>(this.driver, async (session: Session) => {
      const result = await session.executeWrite((tx) => tx.run(query, params));
      const relation: Path = result.records[0].get("relationship");
      return this.mapToRelationship(relation);
    });
  }
}
