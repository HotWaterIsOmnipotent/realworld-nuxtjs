import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('date', (value, format = 'YY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})