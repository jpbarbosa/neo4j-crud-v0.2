import dotenv from 'dotenv';

dotenv.config();

const { NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD, NEO4J_DATABASE } =
  process.env;

export const config = {
  neo4j: {
    url: NEO4J_URL,
    username: NEO4J_USERNAME,
    password: NEO4J_PASSWORD,
    database: NEO4J_DATABASE,
  },
};
