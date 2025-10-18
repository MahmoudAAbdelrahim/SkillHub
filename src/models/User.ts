import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
});

export default models.User || mongoose.model('User', userSchema);
