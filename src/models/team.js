import mongoose from 'mongoose';

const { Schema } = mongoose;

const TeamSchema = new Schema({
  data: [Number],
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;
