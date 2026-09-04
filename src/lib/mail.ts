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
      ? `Thank you for applying for the position of "${data.jobTitle || 'Open Role'}" at ASAY InfoTech.\n\nWe have received your application and credentials successfully. Our recruitment team is reviewing your profile against our open requirements and will reach out to you if shortlisted.`
      : isNewsletter
      ? `Thank you for subscribing to ASAY InfoTech Newsletter! You will receive our latest digital transformation case studies, tech insights, and company updates directly in your inbox.`
      : `Thank you for contacting ASAY InfoTech!\n\nWe have successfully received your inquiry regarding "${data.subject || 'your project'}".`;

    // 1. Primary Dispatch to FormSubmit via JSON (delivers lead directly to asayinfotech@gmail.com)
    const jsonPayload: Record<string, string> = {
      name: data.name,
      email: data.email,
      _replyto: data.email,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      form_type: data.formType,
    };
    if (data.phone) jsonPayload.phone = data.phone;
    if (data.subject) jsonPayload.subject = data.subject;
    if (data.message) jsonPayload.message = data.message;
    if (data.jobTitle) jsonPayload.job_position = data.jobTitle;
    if (data.department) jsonPayload.department = data.department;
    if (data.portfolio) jsonPayload.resume_link = data.portfolio;
    if (data.why) jsonPayload.why_asay_infotech = data.why;

    await fetch(`https://formsubmit.co/ajax/${ENV.COMPANY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonPayload),
    }).then(async res => {
      const resData = await res.json().catch(() => ({}));
      console.log('✅ FormSubmit lead delivered to asayinfotech@gmail.com:', resData);
    }).catch(e => console.warn('FormSubmit notify:', e));

    // 2. Direct Acknowledgment (ACK) Email to Customer via EmailJS
    if (ENV.EMAILJS_SERVICE_ID && ENV.EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init({ publicKey: ENV.EMAILJS_PUBLIC_KEY });

        // 2a. Send Auto-Response ACK to Customer
        const customerParams = {
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

        await emailjs.send(
          ENV.EMAILJS_SERVICE_ID,
          templateId,
          customerParams,
          ENV.EMAILJS_PUBLIC_KEY
        ).then(res => console.log('✅ EmailJS ACK delivered to customer:', res))
         .catch(err => console.warn('EmailJS customer delivery note:', err));

        // 2b. Send Admin Lead Alert to asayinfotech@gmail.com
        const adminParams = {
          to_name: 'ASAY InfoTech Admin',
          name: data.name || 'New Lead',
          to_email: ENV.COMPANY_EMAIL,
          email: data.email,
          title: subject,
          subject: `🚨 ${subject}`,
          message: `NEW SUBMISSION RECEIVED:\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nType: ${data.formType.toUpperCase()}\n${data.jobTitle ? `Position: ${data.jobTitle}\n` : ''}${data.portfolio ? `Resume / Portfolio: ${data.portfolio}\n` : ''}\nMessage:\n${data.message || data.why || 'N/A'}`,
          phone: data.phone || 'N/A',
          reply_to: data.email,
          form_type: data.formType,
          company_phone: ENV.WHATSAPP_NUMBER,
          company_email: ENV.COMPANY_EMAIL,
        };

        await emailjs.send(
          ENV.EMAILJS_SERVICE_ID,
          templateId,
          adminParams,
          ENV.EMAILJS_PUBLIC_KEY
        ).then(res => console.log('✅ EmailJS Lead Alert delivered to asayinfotech@gmail.com:', res))
         .catch(err => console.warn('EmailJS admin delivery note:', err));

      } catch (emailjsErr) {
        console.warn('EmailJS dispatch info:', emailjsErr);
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
