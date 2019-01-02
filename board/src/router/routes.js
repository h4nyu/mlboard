import Error404 from '@/pages/Error404';


const main = [
  // routes
];

const error = [
  {
    path: '*',
    name: 'error',
    component: Error404
  }
];

export default [].concat(main, error);

