import * as Express from 'express';
import * as jwt from 'jsonwebtoken';

const verifyJWTToken = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  const { JWT_ACCESS_TOKEN_SECRET } = process.env;

  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) {
      throw new Error('user unauthorized');
    } else {
      jwt.verify(token, JWT_ACCESS_TOKEN_SECRET!);
    }
    next();
  } catch (err: any) {
    res.status(403).send({ error: err.message });
  }
};

export default { verifyJWTToken };
