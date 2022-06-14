import { Router } from 'express';
import { router as authRouter } from './auth';
import { router as userRouter } from './user';
import { router as articleRouter } from './article';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);

export { router };
