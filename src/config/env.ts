// Application Environment Configuration
// All sensitive keys, email endpoints, and contact numbers are loaded via environment variables

export const ENV = {
  // Official Company Email
  COMPANY_EMAIL: import.meta.env.VITE_COMPANY_EMAIL || 'asayinfotech@gmail.com',

  // Primary WhatsApp Contact
  WHATSAPP_NUMBER: import.meta.env.VITE_WEBSITE_WHATSAPP_NUMBER || '+916382907182',

  // Form Submission Endpoint (FormSubmit.co - Free & Unlimited)
  FORMSUBMIT_ENDPOINT: `https://formsubmit.co/ajax/${import.meta.env.VITE_COMPANY_EMAIL || 'asayinfotech@gmail.com'}`,

  // EmailJS Configuration (Optional - for direct ACK emails to submitter)
  EMAILJS_SERVICE_ID: (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim(),
  EMAILJS_TEMPLATE_ID: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim(),
  EMAILJS_PUBLIC_KEY: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim(),

  // Gemini AI Key (if configured)
  GEMINI_API_KEY: (import.meta.env.VITE_GEMINI_API_KEY || '').trim(),

  // Twilio Configuration (optional)
  TWILIO_ACCOUNT_SID: (import.meta.env.VITE_TWILIO_ACCOUNT_SID || '').trim(),
  TWILIO_AUTH_TOKEN: (import.meta.env.VITE_TWILIO_AUTH_TOKEN || '').trim(),
  TWILIO_CONTENT_SID: (import.meta.env.VITE_TWILIO_CONTENT_SID || '').trim(),

  // Environment Mode
  IS_PROD: import.meta.env.PROD,
};
