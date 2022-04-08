import Post from '../../models/post';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const getPostByRandom = async (ctx, next) => {
  try {
    const totalCount = await Post.count();
    const random = Math.floor(Math.random() * totalCount);
    const post = await Post.aggregate([{ $sample: { size: 1 } }]);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const search = async (ctx) => {
  const { title } = ctx.query;

  try {
    const post = await Post.find({ title: title });
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const write = async (ctx) => {
  const {
    title,
    material,
    category,
    seasoning,
    content,
    thumbnail,
    tag,
  } = ctx.request.body;
  const post = new Post({
    title,
    material,
    category,
    seasoning,
    content,
    thumbnail,
    author: ctx.state.user,
    tag,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async (ctx) => {
  try {
    const posts = await Post.find().sort({ _id: 1 });
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const listByCategory = async (ctx) => {
  const { category } = ctx.params;
  let categoryName = null;

  switch (category) {
    case "korean":
      categoryName = "한식";
      break;
    case "western":
      categoryName = "양식";
      break;
    case "chinese":
      categoryName = "중식";
      break;
    case "japanese":
      categoryName = "일식";
      break;
    case "snack":
      categoryName = "분식";
      break;
    case "etc":
      categoryName = "기타";
      break;
    default:
      categoryName = null;
      break;
  }

  try {
    const posts = await Post.find({ "category": categoryName }).sort({ _id: 1 });
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const count = async (ctx) => {
  try {
    const count = await Post.count();
    ctx.body = count;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const writeComment = async (ctx) => {
  const { id } = ctx.params;
  const data = ctx.request.body;
  try {
    const post = await Post.findByIdAndUpdate(id, {
      $push: {
        comment: data,
      },
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
