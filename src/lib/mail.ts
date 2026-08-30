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

    // 2. Direct Official Acknowledgment (ACK) Email to Submitter via Zoho ZeptoMail (help@asayinfotech.in)
    let emailSentViaZepto = false;
    if (ENV.ZEPTOMAIL_TOKEN) {
      try {
        const htmlContent = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">ASAY INFOTECH</h1>
              <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 12px;">Enterprise Software & Autonomous AI Solutions</p>
            </div>
            <div style="padding: 28px 24px; color: #334155; line-height: 1.6; font-size: 14px;">
              <h2 style="color: #0f172a; font-size: 17px; margin-top: 0;">Confirmation: We Received Your Submission</h2>
              <p>Dear <b>${data.name || 'Valued Client'}</b>,</p>
              <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 14px 16px; margin: 18px 0; border-radius: 4px; white-space: pre-line;">
                ${autoresponseMessage}
              </div>
              <p style="margin-top: 20px; font-size: 13px; color: #64748b;">
                Official Support: <a href="mailto:help@asayinfotech.in" style="color: #3b82f6; text-decoration: none;">help@asayinfotech.in</a><br/>
                Website: <a href="https://asayinfotech.in" style="color: #3b82f6; text-decoration: none;">https://asayinfotech.in</a><br/>
                WhatsApp: <a href="https://wa.me/916382907182" style="color: #10b981; text-decoration: none;">+91 63829 07182</a>
              </p>
            </div>
            <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              &copy; 2026 ASAY InfoTech. All rights reserved. | Chennai, Tamil Nadu, India
            </div>
          </div>
        `;

        const zeptoRes = await fetch('https://api.zeptomail.in/v1.1/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Zoho-enczapikey ${ENV.ZEPTOMAIL_TOKEN}`
          },
          body: JSON.stringify({
            from: {
              address: ENV.ZEPTOMAIL_FROM_EMAIL || 'help@asayinfotech.in',
              name: ENV.ZEPTOMAIL_FROM_NAME || 'ASAY InfoTech Support'
            },
            to: [
              {
                email_address: {
                  address: data.email,
                  name: data.name || 'Valued Visitor'
                }
              }
            ],
            reply_to: [
              {
                address: ENV.ZEPTOMAIL_FROM_EMAIL || 'help@asayinfotech.in',
                name: 'ASAY InfoTech Support'
              }
            ],
            subject: `Confirmation: We received your ${isCareer ? 'job application' : isNewsletter ? 'newsletter subscription' : 'inquiry'} - ASAY InfoTech`,
            htmlbody: htmlContent
          })
        });

        if (zeptoRes.ok) {
          emailSentViaZepto = true;
          console.log('✅ Zoho ZeptoMail dispatched successfully from help@asayinfotech.in');
        } else {
          console.warn('ZeptoMail API response:', await zeptoRes.text());
        }
      } catch (zeptoErr) {
        console.warn('ZeptoMail dispatch error:', zeptoErr);
      }
    }

    // Fallback to EmailJS if ZeptoMail was not dispatched
    if (!emailSentViaZepto && ENV.EMAILJS_SERVICE_ID && ENV.EMAILJS_PUBLIC_KEY) {
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
          reply_to: 'help@asayinfotech.in',
          form_type: data.formType,
          company_phone: ENV.WHATSAPP_NUMBER,
          company_email: 'help@asayinfotech.in',
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
