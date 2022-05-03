import Router from 'koa-router';
import * as runCtrl from './run.ctrl';

const run = new Router();

run.get('/', runCtrl.list);

export default run;
