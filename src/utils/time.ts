import {morningEndHour, sessions, sessionTime} from '@/constants/time.constant';
import moment from 'moment';

export const getDaySession = () => {
  const now = moment().format('YYYY-MM-DDTHH:mm:ss');
  const currentDate = moment(now).format('YYYY-MM-DD');
  const currentTomorrow = moment(now).add(1, 'days').format('YYYY-MM-DD');
  let result = '';
  sessions.forEach(item => {
    const startTime =
      currentDate +
      'T' +
      sessionTime[`${item}StartHour` as keyof typeof sessionTime];
    const endTime =
      (item === 'night' ? currentTomorrow : currentDate) +
      'T' +
      sessionTime[`${item}EndHour` as keyof typeof sessionTime];
    console.log(startTime, endTime);

    const start = moment(startTime);
    const end = moment(endTime);
    if (moment(now).isBetween(start, end)) {
      result = item;
    }
  });
  return result;
};
