import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostsSchema = new Schema({
  title: String,
  material: String,
  category: String,
  seasoning: String,
  content: String,
  thumbnail: String,
  author_id: String,
  likes: Number,
  tag: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [],
});

const Posts = mongoose.model('Posts', PostsSchema);
export default Posts;
