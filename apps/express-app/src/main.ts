import * as express from 'express';
import connectDB from './app/database';
import urlRouter from './app/routes/urls';
import cors = require('cors');
import * as morgan from 'morgan';
import healthRouter from './app/routes/health';

const app = express();

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  connectDB();
});
server.on('error', console.error);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
  })
);

app.use('/', urlRouter);
app.use('/api', healthRouter);
app.use(morgan('tiny'));
