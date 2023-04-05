import express from 'express';
import neo4j from 'neo4j-driver';
import { movies } from '@neo4j-crud/graph';

const app = express();
const port = 3000;

app.get('/movies', async (req, res) => {
  const auth = neo4j.auth.basic('', '');
  const config = { disableLosslessIntegers: true };
  const session = neo4j.driver('bolt://localhost:7687', auth, config).session();
  const records = await movies(session).getAll();
  await session.close();
  res.send(records);
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
