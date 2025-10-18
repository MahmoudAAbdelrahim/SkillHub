import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Course from '../../../models/Course';

export async function POST(req: Request) {
  await connectDB();
  const { userId } = await req.json();

  // تأكد من وجود حجز سابق
  const existingBooking = await Course.findOne({ userId });
  if (existingBooking) return NextResponse.json(existingBooking);

  // إنشاء حجز جديد
  const count = await Course.countDocuments();
  const newBooking = await Course.create({
    userId,
    courseNumber: count + 1,
  });

  return NextResponse.json(newBooking);
}
