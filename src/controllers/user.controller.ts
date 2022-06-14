import { Prisma as PrismaOrm } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import { hash } from 'bcrypt';
import prisma from '../helpers/prisma';

import { UserDto } from '../models';
import {
  errorResponse,
  successResponseWithData,
  validationErrorWithData,
} from '../helpers/api-response.helper';

export const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    user.password = await hash(user.password, 10);
    const { password, username } = user;
    console.log(password, user);
    const newUser = await prisma.user.create({
      data: { password, username },
    });
    return successResponseWithData<UserDto>(res, newUser);
  } catch (error) {
    if (error instanceof PrismaOrm.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return validationErrorWithData(res, 'Account already exists.');
      }
    }
    return errorResponse(res);
  }
};


