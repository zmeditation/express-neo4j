import { config } from "dotenv";

config();

export interface Config {
  port: number;
  neo4jUri: string;
  neo4jUsername: string;
  neo4jPassword: string;
  neo4jInstanceName: string;
}

export const createConfig = (): Config => {
  const port = parseInt(process.env.PORT as string, 10) || 8000;
  const neo4jUri = process.env.NEO4J_URI as string;
  const neo4jUsername = process.env.NEO4J_USERNAME as string;
  const neo4jPassword = process.env.NEO4J_PASSWORD as string;
  const neo4jInstanceName = process.env.AURA_INSTANCE_NAME as string;

  return {
    port,
    neo4jUri,
    neo4jUsername,
    neo4jPassword,
    neo4jInstanceName,
  };
};
