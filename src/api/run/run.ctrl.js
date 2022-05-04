import Run from '../../models/run';

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

  try {
    const data = await Run.findByIdAndUpdate(id, ctx.request.body, {
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