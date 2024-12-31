import * as express from 'express';
import { healthCheck } from '../controllers/health-check.controller';

const healthRouter = express.Router();

healthRouter.get('/health', healthCheck);

export default healthRouter;
