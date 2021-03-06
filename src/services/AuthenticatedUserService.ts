import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestTDO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticatedUserService {
  public async execute({ email, password }: RequestTDO): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordMatched = await compare(password, user.password as string);

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination.', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticatedUserService;
