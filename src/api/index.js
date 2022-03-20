import Router from 'koa-router';
import posts from './posts';
import auth from './auth';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

export default api;
