import { Request, Response, NextFunction } from 'express';
import neo4j from 'neo4j-driver';
import { config } from '../config';

export const neo4jSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { url, username, password, database } = config.neo4j;
  const auth = neo4j.auth.basic(username, password);
  const driver = neo4j.driver(url, auth, {
    disableLosslessIntegers: true,
  });
  const session = driver.session({
    database,
  });
  req.neo4jSession = session;
  res.on('finish', () => {
    session.close();
  });
  next();
};
