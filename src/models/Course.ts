import mongoose, { Schema, models } from 'mongoose';

const courseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  bookedAt: { type: Date, default: Date.now },
  courseNumber: Number, // رقم الحجز
});

export default models.Course || mongoose.model('Course', courseSchema);
