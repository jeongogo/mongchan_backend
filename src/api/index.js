import Router from 'koa-router';
import auth from './auth';
import posts from './posts';
import run from './run';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());
api.use('/run', run.routes());

export default api;
