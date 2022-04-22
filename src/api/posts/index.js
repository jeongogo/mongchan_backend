import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import multer from '@koa/multer';
import path from 'path';

const posts = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../../mongchan_frontend/public/upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
})

const upload = multer({ storage: storage });

posts.get('/', postsCtrl.list);
posts.get('/random', postsCtrl.getPostByRandom, postsCtrl.read);
posts.get('/search', postsCtrl.search);
posts.get('/category/:category', postsCtrl.listByCategory);
posts.post('/', checkLoggedIn, postsCtrl.write);
posts.post('/upload', upload.single('file'), postsCtrl.imageUpload);
posts.get('/detail/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete('/:id', postsCtrl.getPostById, postsCtrl.remove);
posts.patch('/:id', checkLoggedIn, postsCtrl.getPostById, postsCtrl.update);
posts.post('/:id', checkLoggedIn, postsCtrl.writeComment);

export default posts;
