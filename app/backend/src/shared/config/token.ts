import 'dotenv/config';
import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_OPTIONS: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

const JWT_SECRET = process.env.JWT_SECRET as string;

interface IPayload extends JwtPayload {
  username: string;
}

export const createToken = (payload: IPayload ): string => {
  return sign(payload, JWT_SECRET, JWT_OPTIONS);
};
export const verifyToken = (token: string): IPayload => {
  return verify(token, JWT_SECRET) as IPayload;
};

