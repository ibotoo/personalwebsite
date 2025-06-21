import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.TO_EMAIL as string;
const FROM_EMAIL = process.env.FROM_EMAIL as string;

if (!process.env.RESEND_API_KEY) {
  console.log('RESEND_API_KEY is not set. Email functionality will be disabled.');
}
if (!TO_EMAIL || !FROM_EMAIL) {
  console.log('TO_EMAIL or FROM_EMAIL environment variables are not set.');
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  service?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Debug bilgisi
  console.log('Contact API çağrıldı:', {
    method: req.method,
    hasResendKey: !!process.env.RESEND_API_KEY,
    toEmail: !!TO_EMAIL,
    fromEmail: !!FROM_EMAIL,
    timestamp: new Date().toISOString()
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message, phone, company, service }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Eksik bilgiler. Lütfen tüm gerekli alanları doldurun.',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Geçersiz e-posta formatı. Lütfen doğru bir e-posta adresi girin.' });
    }

    // Geçici çözüm: API key yoksa bile başarılı response dön
    if (!process.env.RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
      console.error('Email service is not configured. Check environment variables.');
      console.error('Missing variables:', {
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        TO_EMAIL: !!TO_EMAIL,
        FROM_EMAIL: !!FROM_EMAIL
      });

      // Form verilerini console'a logla (geliştirme için)
      console.log('Form submission (email service unavailable):', {
        name, email, subject, message, phone, company, service,
        timestamp: new Date().toISOString()
      });

      // Kullanıcıya başarılı mesaj göster ama gerçekte email gönderilmedi
      return res.status(200).json({
        message: 'Mesajınız alındı! Ancak e-posta servisi şu anda aktif değil. Lütfen doğrudan mail@ibrahimsancar.com adresine yazın.',
        warning: 'Email service not configured'
      });
    }

    // Create structured email content
    const notificationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
          Yeni İletişim Formu Mesajı
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">İletişim Bilgileri</h3>
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ''}
          ${service ? `<p><strong>İlgilenilen Hizmet:</strong> ${service}</p>` : ''}
        </div>

        <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h3 style="color: #334155; margin-top: 0;">Konu: ${subject}</h3>
          <div style="line-height: 1.6; color: #475569;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #0ea5e9; color: white; border-radius: 8px; text-align: center;">
          <p style="margin: 0;">
            <strong>İbrahim Can Sancar</strong><br>
            <a href="https://ibrahimsancar.com" style="color: white;">ibrahimsancar.com</a>
          </p>
        </div>

        <div style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
          Bu mesaj ibrahimsancar.com iletişim formu üzerinden gönderilmiştir.<br>
          Gönderim tarihi: ${new Date().toLocaleString('tr-TR')}
        </div>
      </div>
    `;

    // Auto-reply email to sender
    const autoReplyEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
          Merhaba ${name}!
        </h2>
        
        <p style="font-size: 16px; line-height: 1.6; color: #334155;">
          Mesajınız başarıyla alınmıştır. En kısa sürede size dönüş yapacağım.
        </p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #334155; margin-top: 0;">Gönderdiğiniz Mesaj:</h3>
          <p><strong>Konu:</strong> ${subject}</p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0ea5e9;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div style="background: #0ea5e9; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <h3 style="margin-top: 0;">İbrahim Can Sancar</h3>
          <p style="margin: 5px 0;">Girişimci & Sosyal Medya Uzmanı</p>
          <div style="margin-top: 15px;">
            <a href="https://ibrahimsancar.com" style="color: white; text-decoration: none; margin: 0 10px;">🌐 Website</a>
            <a href="https://instagram.com/ibrahimsancar0" style="color: white; text-decoration: none; margin: 0 10px;">📱 Instagram</a>
            <a href="https://x.com/ibrahimsancar0" style="color: white; text-decoration: none; margin: 0 10px;">🐦 X</a>
          </div>
        </div>

        <div style="margin-top: 20px; font-size: 12px; color: #64748b; text-align: center;">
          Bu otomatik bir yanıttır. Lütfen bu mesaja cevap vermeyin.<br>
          Acil durumlar için: ${TO_EMAIL}
        </div>
      </div>
    `;

    // Log the contact form submission for debugging
    console.log('Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject,
      company,
      service,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    });

    // Send emails using Resend
    const [notificationResponse, autoReplyResponse] = await Promise.allSettled([
      // Send notification email to me
      resend.emails.send({
        from: `İletişim Formu <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        replyTo: email,
        subject: `Yeni Mesaj: ${subject}`,
        html: notificationEmailHtml,
      }),
      // Send auto-reply to the user
      resend.emails.send({
        from: `İbrahim Can Sancar <${FROM_EMAIL}>`,
        to: email,
        subject: 'Mesajınız Alındı',
        html: autoReplyEmailHtml,
      }),
    ]);

    if (notificationResponse.status === 'rejected') {
      console.error('Failed to send notification email:', notificationResponse.reason);
      // We can still try to return success to the user if auto-reply worked
    }

    if (autoReplyResponse.status === 'rejected') {
      console.error('Failed to send auto-reply email:', autoReplyResponse.reason);
    }

    // If the main notification email fails, we should probably return an error
    if (notificationResponse.status === 'rejected') {
      return res.status(500).json({ error: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.' });
    }

    return res.status(200).json({ message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.' });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return res.status(500).json({ error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.' });
  }
} 