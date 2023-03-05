import * as Express from 'express';
import mongoose from 'mongoose';

export const pagination = async (
  req: Express.Request,
  collection: mongoose.Model<any>,
  queryParam: Record<any, any>,
) => {
  const limit = req.query.limit as string;
  const page = req.query.page as string;
  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);

  const count = await collection.find(queryParam).count();

  const offset = (parsedPage - 1) * parsedLimit;
  const lastPage = Math.ceil(count / parsedLimit);

  const data = await collection.find(queryParam).limit(parsedLimit).skip(offset);

  return { data, lastPage };
};
