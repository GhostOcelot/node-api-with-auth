import * as Express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../mongoConfig';
import { RefreshToken } from '../mongoConfig';

const signUp = async (req: Express.Request, res: Express.Response) => {
  const { email, password } = req.body;
  const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } =
    process.env;

  try {
    if (!(email && password)) throw new Error('Both email and password are required.');

    const user = await User.findOne({ email });
    if (user) throw new Error('this email is already registered');

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const token = jwt.sign({ email }, JWT_ACCESS_TOKEN_SECRET!, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign({ email }, JWT_REFRESH_TOKEN_SECRET!);

    await User.create({ email, password: hashedPassword });
    await RefreshToken.create({ refreshToken });

    res.send({ token, refreshToken });
  } catch (err: any) {
    res.status(403).send({ error: err.message });
  }
};

const login = async (req: Express.Request, res: Express.Response) => {
  const { email, password } = req.body;
  const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } =
    process.env;

  try {
    if (!(email && password)) {
      throw new Error('Both email and password are required.');
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("email doesn't exist");

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ email }, JWT_ACCESS_TOKEN_SECRET!, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
      });
      const refreshToken = jwt.sign({ email }, JWT_REFRESH_TOKEN_SECRET!);

      await RefreshToken.create({ refreshToken });

      res.send({ token, refreshToken });
    } else {
      throw new Error('incorrect password');
    }
  } catch (err: any) {
    res.status(401).send(err.message);
  }
};

const refreshToken = async (req: Express.Request, res: Express.Response) => {
  const { refreshToken } = req.body;
  const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRE_TIME } =
    process.env;

  try {
    if (!refreshToken) {
      throw new Error('no refresh token');
    }

    const isRefreshOnWhiteList = await RefreshToken.findOne({ refreshToken });

    if (!isRefreshOnWhiteList) {
      throw new Error('user unauthorized');
    }
    const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET!);

    if (decoded) {
      const token = jwt.sign({ email: decoded.email }, JWT_ACCESS_TOKEN_SECRET!, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME,
      });
      res.send({ token });
    }
  } catch (err: any) {
    res.status(401).send({ error: err.message });
  }
  // }
};

const logout = async (req: Express.Request, res: Express.Response) => {
  try {
    const { refreshToken } = req.body;
    const deleteData = await RefreshToken.deleteOne({ refreshToken });
    if (deleteData.deletedCount === 0) {
      throw new Error('no user to log out');
    }
    res.send({ msg: 'user logged out' });
  } catch (err: any) {
    res.status(401).send({ error: err.message });
  }
};

export default { signUp, login, refreshToken, logout };
