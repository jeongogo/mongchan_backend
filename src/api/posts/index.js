import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const athletes = new Router();

athletes.get('/search', postsCtrl.search);
athletes.get('/', postsCtrl.list);
athletes.get('/random', postsCtrl.getPostByRandom, postsCtrl.read);
athletes.get('/category/:category', postsCtrl.listByCategory);
athletes.post('/', /*checkLoggedIn,*/ postsCtrl.write);
athletes.get('/detail/:id', postsCtrl.getPostById, postsCtrl.read);
athletes.delete(
  '/:id',
  /*checkLoggedIn,*/
  postsCtrl.getPostById,
  postsCtrl.remove,
);
athletes.patch(
  '/:id',
  /*checkLoggedIn,*/
  postsCtrl.getPostById,
  postsCtrl.update,
);

athletes.post('/:id', postsCtrl.writeComment);

export default athletes;
