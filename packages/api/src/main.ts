import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './routes';
import { errorHandler, neo4jSession } from './middleware';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(neo4jSession);
app.use(routers);
app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
