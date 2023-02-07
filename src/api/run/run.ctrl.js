import Run from '../../models/run';
import Team from '../../models/team';

export const list = async (ctx) => {
  try {
    const data = await Run.find().sort({name: -1});
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const listBySort = async (ctx) => {
  try {
    const data = await Run.find().sort({name: 1});
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  const keyName = 'week' + ctx.request.body.week;
  
  try {
    const data = await Run.findByIdAndUpdate(id, { [keyName]: ctx.request.body.data }, {
      new: true,
    }).exec();
    if (!data) {
      ctx.status = 404;
      return;
    }
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getTeam = async (ctx) => {
  try {
    const data = await Team.findOne();
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const updateTeam = async (ctx) => {
  const id = "63e19e998c1174fad9716ef6";
  const keyName = 'week' + ctx.request.body.week;
  
  try {
    const data = await Team.findByIdAndUpdate(id, { [keyName]: ctx.request.body.data }, {
      new: true,
    }).exec();
    if (!data) {
      ctx.status = 404;
      return;
    }
    ctx.body = data;
  } catch (e) {
    ctx.throw(500, e);
  }
};