import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const inquiry = await Inquiry.create(data);
    
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
