import mainRouter from './mainRouter';
import userRouter from './userRouter';
import adminRouter from './adminRouter';

const publicRouter = [mainRouter];
const privateRouter = [userRouter,adminRouter];
export { publicRouter, privateRouter };