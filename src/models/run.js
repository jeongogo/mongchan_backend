import mongoose from 'mongoose';

const { Schema } = mongoose;

const RunSchema = new Schema({
  name: String,
  data: [Number]
});

const Run = mongoose.model('Run', RunSchema);
export default Run;
