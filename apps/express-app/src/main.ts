import * as express from 'express';
import connectDB from './app/database';
import urlRouter from './app/routes/urls';

const app = express();

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  connectDB();
});
server.on('error', console.error);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', urlRouter);
