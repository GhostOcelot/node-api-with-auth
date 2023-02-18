import * as mongoose from 'mongoose';
import TekkenSchema from './Schema/tekkenSchema';
import PostSchema from './Schema/postSchema';
import UserSchema from './Schema/userSchema';
import RefreshTokenSchema from './Schema/refreshTokenSchema';

export const Tekken = mongoose.model('Tekken', TekkenSchema);
export const Post = mongoose.model('Post', PostSchema);
export const User = mongoose.model('User', UserSchema);
export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

const main = async () => {
  const { MONGO_DB_URL } = process.env;
  await mongoose.connect(MONGO_DB_URL!);
  console.log('connected to db');
};

export default main;
