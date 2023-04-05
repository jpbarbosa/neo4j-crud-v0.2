declare global {
  namespace Express {
    interface Request {
      neo4jSession?: import('neo4j-driver').Session;
    }
  }
}

export {};
