import {
  mockDriver,
  mockSessionFromQuerySet,
  QuerySpec,
  StoredResponse,
} from "neo-forgery";
import { Neo4jUserRepository } from "../../src/users/infrastructure/repositories/neo4jUserRepository";
import { anyFunction, instance, mock, when } from "ts-mockito";
import { Driver, QueryResult, Record, Session } from "neo4j-driver";

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
  email: "test@gmail.com",
  firstName: "test",
  lastName: "user",
  created: 1665690371850,
};

describe("test", () => {
  it("should use neo forgery", async () => {
    const expectedOutput: StoredResponse = {
      records: [
        {
          keys: ["user"],
          length: 1,
          _fields: [
            {
              identity: { low: 2, high: 0 },
              labels: ["User"],
              properties: {
                firstName: "test",
                lastName: "user",
                created: 1665690371850,
                id: "12345",
                email: "test@gmail.com",
              },
              elementId: "2",
            },
          ],
          _fieldLookup: { user: 0 },
        },
      ],
    };
    const querySet: QuerySpec[] = [
      {
        query,
        params,
        output: expectedOutput,
      },
    ];
    const session = mockSessionFromQuerySet(querySet);
    const driver = mockDriver(session);
    const userRepo = new Neo4jUserRepository(driver);

    // NOTE: neo-forgery doesn't support latest release of neo4j including executeWrite
    const result = await userRepo.create({
      email: "test@gmail.com",
      firstName: "test",
      lastName: "user",
    });
    // NOTE: strangeness of neo4j - javascript integers
    expect(result).toEqual({
      id: "12345",
      email: "test@gmail.com",
      firstName: "test",
      lastName: "user",
      created: 1665690371850,
    });
  });

  it.skip("should use ts mockito", async () => {
    const mockSession = mock(Session);
    const mockDriver = mock<Driver>();
    const QueryRecord = new Record(
      ["user"],
      [
        {
          identity: { low: 2, high: 0 },
          labels: ["User"],
          properties: {
            id: "12345",
            email: "test@gmail.com",
            firstName: "test",
            lastName: "user",
            created: 1665690371850,
          },
          elementId: "2",
        },
      ],
      { user: 0 }
    );

    const expectedQueryResult = {
      records: [QueryRecord],
    } as QueryResult;

    // NOTE: this is matching any query - not able to match callback signature
    when(mockSession.writeTransaction(anyFunction())).thenResolve(
      expectedQueryResult
    );
    when(mockDriver.session()).thenReturn(instance(mockSession));

    const userRepo = new Neo4jUserRepository(instance(mockDriver));
    const result = await userRepo.create({
      email: "test@gmail.com",
      firstName: "test",
      lastName: "user",
    });

    expect(result).toEqual({
      id: "12345",
      email: "test@gmail.com",
      firstName: "test",
      lastName: "user",
      created: 1665690371850,
    });
  });
});
