import { object, string } from 'yup';

export const authLoginValidation = object({
  username: string().required(),
  password: string().required().max(20),
});
