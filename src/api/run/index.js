import Router from 'koa-router';
import * as runCtrl from './run.ctrl';

const run = new Router();

run.get('/', runCtrl.list);
run.get('/edit', runCtrl.listBySort);
run.post('/edit/:id', runCtrl.update);

export default run;
