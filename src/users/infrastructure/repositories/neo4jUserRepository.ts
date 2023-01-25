import { Driver, Session } from "neo4j-driver";
import { v4 as uuid } from "uuid";

import { openSession } from "../../../utils/graph/openSession";
import * as Nodes from "../models/nodes";
import * as QueryResults from "../models/queryResults";
import { User } from "../../domain/models/user";
import { Follows } from "../../domain/models/follows";
import { UserRepository } from "../../domain/interfaces/userRepository";

export class Neo4jUserRepository implements UserRepository {
  constructor(private readonly driver: Driver) {}

  mapToUser(node: Nodes.User): User {
    if (!node) {
      throw new Error(`Unable to map node: ${node} to user `);
    }
    return {
      id: node.properties.id,
      email: node.properties.email,
      firstName: node.properties.firstName,
      lastName: node.properties.lastName,
      created: node.properties.created.toString(),
    };
  }

  mapToFollowsRelationship(queryResult: QueryResults.Follow): Follows {
    if (!queryResult) {
      throw new Error(
        `Unable to map query result ${queryResult} to follows relationship`
      );
    }
    const { actor, relationship, subject } = queryResult;
    return {
      actorId: actor.properties.id,
      subjectId: subject.properties.id,
      type: relationship.type,
      created: relationship.properties.created.toString(),
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
    return openSession<User>(this.driver, async (session: Session) => {
      const result = await session.executeWrite((tx) =>
        tx.run<QueryResults.User>(query, params)
      );
      const users = result.records.map((record) => record.get("user"));
      return this.mapToUser(users[0]);
    });
  }

  async getById(id: string) {
    const query = `
      MATCH (user)
      WHERE user.id = $id
      RETURN user`;
    const params = { id };
    return openSession<User>(this.driver, async (session: Session) => {
      const result = await session.executeRead((tx) =>
        tx.run<QueryResults.User>(query, params)
      );
      const users = result.records.map((record) => record.get("user"));
      return this.mapToUser(users[0]);
    });
  }

  async follow(actorId: string, subjectId: string): Promise<Follows> {
    const query = `
      MATCH
        (actor:User {id: $actorId }),
        (subject:User {id: $subjectId })
      MERGE path =
        (actor)-[relationship:FOLLOWS]->(subject)
      ON CREATE SET
        relationship.created = datetime()
      RETURN actor, relationship, subject`;
    const params = { actorId, subjectId };

    return openSession<Follows>(this.driver, async (session: Session) => {
      const result = await session.executeWrite((tx) =>
        tx.run<QueryResults.Follow>(query, params)
      );
      const records = result.records.map((record) => record.toObject());
      return this.mapToFollowsRelationship(records[0]);
    });
  }
}
