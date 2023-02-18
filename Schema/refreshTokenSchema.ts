import * as mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

export default RefreshTokenSchema;
