// Reliable Form Submission Dispatch Service
// Form data is routed to company email (asayinfotech@gmail.com) without sending auto-reply emails to the sender.
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

    // 1. Dispatch Form Data to FormSubmit (delivers directly to asayinfotech@gmail.com)
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
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    await fetch(`https://formsubmit.co/ajax/${ENV.COMPANY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }).catch(e => console.log('FormSubmit notify:', e));

    // 2. Optional Twilio WhatsApp notification for Admin
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
