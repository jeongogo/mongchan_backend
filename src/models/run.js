import mongoose from 'mongoose';

const { Schema } = mongoose;

const RunSchema = new Schema({
  name: String,
  week1: {
    data: [Number]
  },
  week2: {
    data: [Number]
  },
  week3: {
    data: [Number]
  },  
});

const Run = mongoose.model('Run', RunSchema);
export default Run;
