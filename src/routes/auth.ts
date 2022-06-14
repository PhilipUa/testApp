import { Router } from 'express';

import { validateBody } from '../middlewares/validate';
import { authLoginValidation } from '../validations/auth.validation';

import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', validateBody(authLoginValidation), login);

export { router };
