import { NextResponse } from 'next/server';

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const otp = generateOtp();

    // For now, we will just log the OTP to the console.
    // In a real application, you would use a service like Twilio to send the OTP via SMS.
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    // We should store the OTP and its expiry time to verify it later.
    // For this example, we'll just return it in the response for simplicity.
    return NextResponse.json({ message: 'OTP sent successfully', otp });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
