import { Request, RequestHandler, Response } from 'express';

import { compare } from 'bcrypt';

import { decode, sign } from 'jsonwebtoken';

import prisma from '../helpers/prisma';

import { AuthLoginResponseDto } from '../models';

import {
  errorResponse,
  successResponseWithData,
  unauthorizedResponse,
} from '../helpers/api-response.helper';

const MSG_INVALID_CREDENTIALS =
  'You have entered an invalid username or password';

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return unauthorizedResponse(res, MSG_INVALID_CREDENTIALS);
    }
    const hasMatch = await compare(password, user.password);
    if (!hasMatch) {
      return unauthorizedResponse(res, MSG_INVALID_CREDENTIALS);
    }
    const userData = {
      username: user.username,
    };
    const jwtPayload = userData;
    const jwtData = {
      expiresIn: process.env.JWT_TIMEOUT,
    };
    const secret = process.env.JWT_SECRET as string;
    const token = sign(jwtPayload, secret, jwtData);
    const { exp } = decode(token) as {
      exp: number;
    };
    const expirationEpochSeconds = exp * 1000;
    return successResponseWithData<AuthLoginResponseDto>(res, {
      token,
      expirationEpochSeconds,
    });
  } catch (err) {
    return errorResponse(res);
  }
};
