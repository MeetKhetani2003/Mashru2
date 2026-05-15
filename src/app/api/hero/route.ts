import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import HeroSlide from '@/models/HeroSlide';

export async function GET() {
  try {
    await connectDB();
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(slides);
  } catch (error: any) {
    console.error('Hero API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
