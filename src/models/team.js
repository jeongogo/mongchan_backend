import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeamSchema = new Schema({
  week1: [Number],
  week2: [Number],
  week3: [Number],
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;
