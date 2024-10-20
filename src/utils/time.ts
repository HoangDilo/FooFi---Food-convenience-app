import {sessions, sessionTime} from '@/constants/time.constant';
import moment from 'moment';

export const getDaySession = () => {
  const now = moment().format('YYYY-MM-DDTHH:mm:ss');
  const currentDate = moment(now).format('YYYY-MM-DD');
  const currentDateYesterday = moment(now)
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const currentDateTomorrow = moment(now).add(1, 'days').format('YYYY-MM-DD');
  let isBeforeMidNight: boolean;
  const currentHours = moment(now).hours();
  if (currentHours >= 23) {
    isBeforeMidNight = true;
  } else if (currentHours >= 0 && currentHours < 4) {
    isBeforeMidNight = false;
  }

  let result = '';
  sessions.forEach(item => {
    const startTime =
      (item === 'night' && !isBeforeMidNight
        ? currentDateYesterday
        : currentDate) +
      'T' +
      sessionTime[`${item}StartHour` as keyof typeof sessionTime];
    const endTime =
      (item === 'night' && isBeforeMidNight
        ? currentDateTomorrow
        : currentDate) +
      'T' +
      sessionTime[`${item}EndHour` as keyof typeof sessionTime];
    const start = moment(startTime);
    const end = moment(endTime);

    if (moment(now).isBetween(start, end)) {
      result = item;
    }
  });
  return result;
};

export const getPostMinDiff = (time: string) => {
  const current = moment();
  const timeMoment = moment(time).format();
  return current.diff(timeMoment, 'minutes');
};

export const formatPostTime = (time: string) => {
  return moment(time).format('DD-MM-YYYY');
};
