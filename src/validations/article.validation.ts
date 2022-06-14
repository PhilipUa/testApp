import { object, string, date, boolean } from 'yup';
import { parseDateString } from '../helpers/date.hepler';

export const articleCreateValidation = object({
  title: string().required().max(20),
  slug: string().required().min(3),
  publishedAt: date().transform(parseDateString),
  private: boolean(),
});
