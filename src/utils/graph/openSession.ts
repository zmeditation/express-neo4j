import { Driver, Session } from "neo4j-driver";

export const openSession = async <T>(
  driver: Driver,
  callback: (session: Session) => Promise<T>
) => {
  const session = driver.session();
  try {
    const res = await callback(session);
    return res;
  } finally {
    await session.close();
  }
};
