import { addDays, addMonths, addYears, format,  formatDistanceToNow } from 'date-fns';
import moment from 'moment';

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy  p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return moment(date).format('h:mm A')
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fAddMonths(date, months) {
  return addMonths(new Date(date), months);
}

export function fAddYears(date, years) {
  return addYears(new Date(date), years);
}
