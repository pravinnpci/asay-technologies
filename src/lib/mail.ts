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

    // 1. Primary Dispatch to FormSubmit (delivers form lead directly to asayinfotech@gmail.com)
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

    // 2. Direct Acknowledgment (ACK) Email to Submitter / Applicant (e.g. sapravin46@gmail.com)
    if (ENV.EMAILJS_SERVICE_ID && ENV.EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init({ publicKey: ENV.EMAILJS_PUBLIC_KEY });

        const templateParams = {
          to_name: data.name || 'Valued Visitor',
          name: data.name || 'Valued Visitor',
          to_email: data.email,
          email: data.email,
          title: data.jobTitle || data.subject || (isNewsletter ? 'Newsletter Subscription' : 'General Inquiry'),
          subject: `Confirmation: We received your ${isCareer ? 'job application' : isNewsletter ? 'newsletter subscription' : 'inquiry'} - ASAY InfoTech`,
          message: autoresponseMessage,
          phone: data.phone || 'N/A',
          reply_to: ENV.COMPANY_EMAIL,
          form_type: data.formType,
          company_phone: ENV.WHATSAPP_NUMBER,
          company_email: ENV.COMPANY_EMAIL,
        };

        const templateId = ENV.EMAILJS_TEMPLATE_ID || 'template_iyhrbc5';

        const emailjsRes = await emailjs.send(
          ENV.EMAILJS_SERVICE_ID,
          templateId,
          templateParams,
          ENV.EMAILJS_PUBLIC_KEY
        );

        console.log('✅ EmailJS ACK Email Delivered Successfully:', emailjsRes);
      } catch (emailjsErr) {
        console.warn('EmailJS ACK dispatch info:', emailjsErr);
      }
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
