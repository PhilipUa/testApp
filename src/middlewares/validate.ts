import _ from 'lodash';
import { RequestHandler } from 'express';

import { AnySchema, ValidationError } from 'yup';

export const validateBody =
  (schema: AnySchema, type = 'body'): RequestHandler =>
  async (req, res, next) => {
    try {
      const payload = await schema.validate(_.get(req, type, {}));
      _.set(req, type, payload);
      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(422).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
