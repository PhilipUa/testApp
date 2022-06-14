import _ from 'lodash';
import { Prisma as PrismaOrm } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import prisma from '../helpers/prisma';

import { ArticleDto } from '../models';
import {
  errorResponse,
  notFoundResponse,
  successResponseWithData,
  validationErrorWithData,
} from '../helpers/api-response.helper';
import { ArticleFilter } from '../services/filters/article.filter';

export const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    const article = req.body;
    const { slug, title, publishedAt = null } = article;
    const newArticle = await prisma.article.create({
      data: { slug, title, publishedAt },
    });
    return successResponseWithData<ArticleDto>(res, newArticle);
  } catch (error) {
    if (error instanceof PrismaOrm.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return validationErrorWithData(res, 'Article already exists.');
      }
    }
    return errorResponse(res);
  }
};

export const remove: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArticle = await prisma.article.delete({
      where: { id },
    });
    return successResponseWithData<ArticleDto>(res, deletedArticle);
  } catch (error) {
    return errorResponse(res);
  }
};

export const getOne: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findFirst({
      where: { slug },
    });
    if (!article) {
      return notFoundResponse(res);
    }
    return successResponseWithData<ArticleDto>(res, article);
  } catch (error) {
    return errorResponse(res);
  }
};

export const getAll: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const { filters, pagination, orderBy } = new ArticleFilter(query);
    if (req.user) {
      _.set(filters, 'where.private', true);
    }
    console.log({ ...pagination, ...filters, orderBy });
    const articles = await prisma.article.findMany({
      ...pagination,
      ...filters,
      orderBy,
    });
    return successResponseWithData<ArticleDto[]>(res, articles);
  } catch (error) {
    return errorResponse(res);
  }
};
