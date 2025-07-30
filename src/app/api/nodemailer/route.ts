import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
            { error: 'API key is invalid or not configured' },
            { status: 401 }
        );
    }

    try {
        const { name, email, message } = await request.json();
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const { error } = await resend.emails.send({
            from: 'FunRoad <onboarding@resend.dev>',
            to: ['handikaalexandriadiaz@gmail.com'],
            subject: `New Message from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}