import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    message:
      'Denne API-ruten er en plassholder for fremtidig OpenAI-integrasjon. Bytt ut mock-analysen ved behov.'
  });
}
