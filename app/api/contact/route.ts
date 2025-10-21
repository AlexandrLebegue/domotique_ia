import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Here you would typically send an email using a service like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // For now, we'll just log it
    
    console.log('📧 Contact Form Submission:');
    console.log('From:', name, `<${email}>`);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // TODO: Implement actual email sending
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'contact@domotique-ia.fr',
    //   to: 'alexandre@example.com',
    //   subject: `[Contact Blog] ${subject}`,
    //   text: `De: ${name} (${email})\n\n${message}`,
    // });

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.',
        success: false
      },
      { status: 500 }
    );
  }
}