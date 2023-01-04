import dotenv from "dotenv";

export interface Config {
  neo4jUri: string;
  neo4jUsername: string;
  neo4jPassword: string;
  neo4jInstanceName: string;
}

export const createConfig = (): Config => {
  const neo4jUri = process.env.NEO4J_URI as string;
  const neo4jUsername = process.env.NEO4J_USERNAME as string;
  const neo4jPassword = process.env.NEO4J_PASSWORD as string;
  const neo4jInstanceName = process.env.AURA_INSTANCE_NAME as string;

  const config: Config = {
    neo4jUri,
    neo4jUsername,
    neo4jPassword,
    neo4jInstanceName,
  };
  // validate config
  return config;
};
