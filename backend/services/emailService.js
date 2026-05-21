const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class EmailService {
  /**
   * Initialise Nodemailer transporter
   */
  static getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT) || 2525,
      auth: {
        user: process.env.SMTP_USER || 'your_smtp_username',
        pass: process.env.SMTP_PASS || 'your_smtp_password'
      }
    });
  }

  /**
   * Send generic HTML email
   */
  static async sendMail(to, subject, htmlContent) {
    try {
      const transporter = this.getTransporter();
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'VendorHub'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@vendorhub.com'}>`,
        to,
        subject,
        html: htmlContent
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info(`Email successfully dispatched to ${to}. MessageId: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`Nodemailer dispatcher failed: ${error.message}`);
      // Do not crash the API server on email send failure, allow fallback
      return null;
    }
  }

  /**
   * Dispatches Reset Password email
   */
  static async sendPasswordResetEmail(email, name, resetUrl) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #3b82f6;">Reset Your VendorHub Password</h2>
        <p>Hi ${name},</p>
        <p>You requested a password reset for your VendorHub account. Click the button below to choose a new password. This reset link is active for 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If the button doesn't work, copy and paste this link in your browser:</p>
        <p style="word-break: break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #718096;">If you did not request this, please ignore this email. Your password will remain secure.</p>
      </div>
    `;
    return await this.sendMail(email, 'VendorHub Password Reset Request', html);
  }

  /**
   * Dispatches Email Verification code
   */
  static async sendVerificationEmail(email, name, verificationUrl) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #10b981;">Verify Your VendorHub Account</h2>
        <p>Hi ${name},</p>
        <p>Welcome to VendorHub! Click the button below to verify your email address and activate your merchant builder dashboard.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Email Address</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #718096;">If you did not sign up for an account, you can safely ignore this email.</p>
      </div>
    `;
    return await this.sendMail(email, 'Verify Your VendorHub Account', html);
  }
}

module.exports = EmailService;
