import neo4j, { Driver } from "neo4j-driver";
import { Config } from "../config";

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
export const createDriver = async (config: Config): Promise<Driver> => {
  const driver = neo4j.driver(
    config.neo4jUri,
    neo4j.auth.basic(config.neo4jUsername, config.neo4jPassword)
  );
  await driver.getServerInfo();
  return driver;
};
