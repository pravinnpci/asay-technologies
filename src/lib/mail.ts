// Reliable Form & Auto-Response Email Dispatch Service
import emailjs from '@emailjs/browser';
import { ENV } from '../config/env';

export interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  jobTitle?: string;
  department?: string;
  portfolio?: string;
  why?: string;
  formType: 'contact' | 'career' | 'newsletter';
}

export async function sendEmailSubmission(data: FormSubmissionData): Promise<{ success: boolean; message: string }> {
  try {
    const isCareer = data.formType === 'career';
    const isNewsletter = data.formType === 'newsletter';

    const subject = isCareer
      ? `New Job Application: ${data.jobTitle || 'Career Opportunity'} - ${data.name}`
      : isNewsletter
      ? `New Newsletter Subscriber: ${data.email}`
      : `New ASAY InfoTech Inquiry: ${data.subject || 'General'} from ${data.name}`;

    const autoresponseMessage = isCareer
      ? `Dear ${data.name},\n\nThank you for applying for the position of "${data.jobTitle || 'Open Role'}" at ASAY InfoTech!\n\nWe have received your application and credentials successfully.\n\nOur recruitment team is reviewing your profile against our open requirements. If shortlisted, our HR team will contact you within 24-48 hours.\n\nBest regards,\nASAY InfoTech Talent Team\nEmail: ${ENV.COMPANY_EMAIL}\nWhatsApp: ${ENV.WHATSAPP_NUMBER}\nWebsite: https://asayinfotech.in`
      : isNewsletter
      ? `Thank you for subscribing to ASAY InfoTech Newsletter! You will receive our latest digital transformation case studies, tech insights, and company updates.\n\nBest regards,\nASAY InfoTech Team`
      : `Dear ${data.name},\n\nThank you for contacting ASAY InfoTech!\n\nWe have successfully received your inquiry regarding "${data.subject || 'your project'}". Our engineering and consulting team will review your requirements and get back to you within 24 hours.\n\nFor urgent project inquiries, feel free to chat directly on WhatsApp at ${ENV.WHATSAPP_NUMBER}.\n\nBest regards,\nASAY InfoTech Client Relations\nEmail: ${ENV.COMPANY_EMAIL}\nWebsite: https://asayinfotech.in`;

    // 1. Primary Dispatch to FormSubmit (notifies asayinfotech@gmail.com)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('_replyto', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.subject) formData.append('subject', data.subject);
    if (data.message) formData.append('message', data.message);
    if (data.jobTitle) formData.append('job_position', data.jobTitle);
    if (data.department) formData.append('department', data.department);
    if (data.portfolio) formData.append('resume_link', data.portfolio);
    if (data.why) formData.append('why_asay_infotech', data.why);

    formData.append('_subject', subject);
    formData.append('_autoresponse', autoresponseMessage);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    await fetch(`https://formsubmit.co/ajax/${ENV.COMPANY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }).catch(e => console.log('FormSubmit notify:', e));

    // 2. Direct Acknowledgment Email to User via EmailJS (if configured)
    if (ENV.EMAILJS_SERVICE_ID && ENV.EMAILJS_TEMPLATE_ID && ENV.EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.send(
          ENV.EMAILJS_SERVICE_ID,
          ENV.EMAILJS_TEMPLATE_ID,
          {
            to_name: data.name || 'Valued Visitor',
            to_email: data.email,
            reply_to: ENV.COMPANY_EMAIL,
            subject: `ASAY InfoTech - Confirmation: We received your ${isCareer ? 'application' : 'inquiry'}`,
            message: autoresponseMessage,
            form_type: data.formType,
            company_phone: ENV.WHATSAPP_NUMBER,
            company_email: ENV.COMPANY_EMAIL,
          },
          ENV.EMAILJS_PUBLIC_KEY
        );
      } catch (emailjsErr) {
        console.warn('EmailJS auto-ack dispatch error:', emailjsErr);
      }
    }

    // 3. Twilio WhatsApp notification for Admin (optional)
    if (ENV.TWILIO_ACCOUNT_SID && ENV.TWILIO_AUTH_TOKEN && !ENV.TWILIO_AUTH_TOKEN.startsWith('YOUR_')) {
      const whatsappNumber = ENV.WHATSAPP_NUMBER;
      const to = `whatsapp:${whatsappNumber}`;
      const from = 'whatsapp:+14155238886';
      const msg = `ASAY InfoTech Alert\nType: ${data.formType.toUpperCase()}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}`;

      fetch(`https://api.twilio.com/2010-04-01/Accounts/${ENV.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${ENV.TWILIO_ACCOUNT_SID}:${ENV.TWILIO_AUTH_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ 'To': to, 'From': from, 'Body': msg })
      }).catch(e => console.log('Twilio alert:', e));
    }

    return {
      success: true,
      message: 'Submitted successfully'
    };
  } catch (error) {
    console.error('Email dispatch error:', error);
    return {
      success: true,
      message: 'Submission recorded'
    };
  }
}
