import passport from 'passport';

// Core
import { Router } from 'express';

// Controllers
import {
  create,
  remove,
  getOne,
  getAll,
} from '../controllers/article.controller';

// Middlewares
import { validateBody } from '../middlewares/validate';

// Validations
import { articleCreateValidation } from '../validations/article.validation';

const router = Router();

router.post(
  '/',
  validateBody(articleCreateValidation),
  passport.authenticate('jwt', { session: false }),
  create
);
router.get('/', getAll);
router.delete('/:id', passport.authenticate('jwt', { session: false }), remove);
router.get('/:slug', getOne);

export { router };
