import * as express from 'express';

import HealthCheck from '../models/helth-check.schema';

export const healthCheck = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const healthCheckData = await HealthCheck.findOneAndUpdate(
      { event: 'check' },
      { event: 'check' },
      {
        new: true,
        upsert: true,
      }
    );
    console.log(healthCheckData);
    const isUp: boolean = healthCheckData !== undefined;
    if (isUp) {
      res.status(200).json({ status: 'ok', data: healthCheckData }).end();
    } else {
      res.status(502).end();
    }
  } catch (error) {
    res.status(502).end();
  }
};
