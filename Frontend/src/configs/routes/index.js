import mainRouter from './mainRouter';
import userRouter from './userRouter';

const publicRouter = [
  mainRouter,
];
const privateRouter = [userRouter];
export { publicRouter, privateRouter };