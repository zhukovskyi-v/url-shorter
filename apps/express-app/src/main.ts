import * as express from 'express';
import connectDB from './app/database';
import urlRouter from './app/routes/urls';
import cors = require('cors');
import * as morgan from 'morgan';

const app = express();

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  connectDB();
});
server.on('error', console.error);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', urlRouter);
app.use(morgan('tiny'));
