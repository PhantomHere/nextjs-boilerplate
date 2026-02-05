// app/api/send/route.ts - Disabled - using direct client-side Web3Forms
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Direct client-side submission used instead' }, { status: 410 });
}