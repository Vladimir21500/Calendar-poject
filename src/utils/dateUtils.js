import moment from 'moment';

const DAYS_IN_WEEK = 7;

export const getWeekStartDate = date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const getFormatedMonth = date => {
  const formatDate = moment(new Date(date)).format('LL').split(' ')[0];
  return formatDate;
};

export const generateWeekRange = startDate => {
  return Array(DAYS_IN_WEEK)
    .fill(null)
    .map((el, index) => {
      const base = new Date(startDate);
      return new Date(base.setDate(base.getDate() + index));
    });
};

export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));

  return withMinutes.getTime();
};

export const formatMins = mins => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
