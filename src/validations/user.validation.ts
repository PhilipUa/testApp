import { object, string } from 'yup';

export const userCreateValidation = object({
  password: string().required().max(20),
  username: string().required().max(20),
});
