// Core
import { Router } from 'express';

// Controllers
import { create } from '../controllers/user.controller';

// Middlewares
import { validateBody } from '../middlewares/validate';

// Validations
import { userCreateValidation } from '../validations/user.validation';

const router = Router();

router.post('/create', validateBody(userCreateValidation), create);

export { router };
