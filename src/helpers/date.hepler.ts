import { parse, isDate } from 'date-fns';

export function parseDateString(value: string, originalValue: string) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());
  return parsedDate;
}
