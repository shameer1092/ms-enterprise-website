import nodemailer from 'nodemailer';
import { getSettings } from './db';
import { InquiryItem } from '@/types';

export async function sendInquiryNotification(inquiry: InquiryItem): Promise<boolean> {
  const settings = getSettings();
  const smtp = settings.smtpConfig;

  // If SMTP is enabled and configured, deliver actual email
  if (smtp?.enabled && smtp.host && smtp.user && smtp.pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port || 587,
        secure: smtp.secure || false,
        auth: {
          user: smtp.user,
          pass: smtp.pass,
        },
      });

      const subject = `[MS Enterprise Inquiry] New Message from ${inquiry.name}`;
      const textContent = `
New inquiry received on MS Enterprise Website:

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'Not provided'}
Service: ${inquiry.service || 'General'}
Budget: ${inquiry.budget || 'Not specified'}
Timeline: ${inquiry.timeline || 'Not specified'}

Message:
${inquiry.message}

Received: ${new Date(inquiry.createdAt).toLocaleString()}
      `;

      await transporter.sendMail({
        from: `"${settings.companyName}" <${smtp.fromEmail || smtp.user}>`,
        to: settings.email,
        replyTo: inquiry.email,
        subject,
        text: textContent,
      });

      console.log(`[Email] Successfully delivered inquiry notification for ${inquiry.email}`);
      return true;
    } catch (error) {
      console.error('[Email] Failed to send email via SMTP, inquiry safely recorded in admin panel:', error);
      return false;
    }
  }

  // Fallback: SMTP not configured or disabled, inquiry safely recorded in DB
  console.log(`[Email Notice] SMTP not configured. Inquiry from ${inquiry.name} (${inquiry.email}) safely recorded in database and admin inbox.`);
  return true;
}
