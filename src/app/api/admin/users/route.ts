import { connectDB } from '@/lib/db';
import User from '../../../../models/User';
import Course from '../../../../models/Course';

export async function GET() {
  await connectDB();
  const users = await User.find();
  const courses = await Course.find().populate('userId');
  return Response.json({ users, courses });
}
