import mongoose from 'mongoose';

const HealthCheckSchema = new mongoose.Schema(
  {
    event: String,
  },
  {
    collection: 'HealthCheck',
    minimize: false,
  }
);
export default mongoose.model('HealthCheck', HealthCheckSchema);
