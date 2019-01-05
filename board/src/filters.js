import moment from 'moment';

export default {
  humanDatetime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
}
