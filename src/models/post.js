import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostsSchema = new Schema({
  title: String,
  material_main: String,
  material_sub: String,
  category: String,
  seasoning: String,
  content: String,
  thumbnail: String,
  tag: [],
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [],
});

const Posts = mongoose.model('Posts', PostsSchema);
export default Posts;
