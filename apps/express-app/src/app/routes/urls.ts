import * as express from 'express';
import { getUrlById, saveUrl } from '../controllers';

const urlRouter = express.Router();

urlRouter.post('/api/short', saveUrl);

urlRouter.get('/:urlId', getUrlById);

export default urlRouter;
