import Error404 from '@/pages/Error404';
import TracePage from '@/pages/TracePage';


const main = [
  {
    path: '/',
    name: 'TracePage',
    component: TracePage
  },
];

const error = [
  {
    path: '*',
    name: 'Error404',
    component: Error404
  }
];

export default [].concat(main, error);

