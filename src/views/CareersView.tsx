import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Globe, Shield, X, Upload, Send, CheckCircle, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

const jobs = [
  { 
    title: 'Senior React Developer', 
    type: 'Full-time', 
    location: 'Chennai (Guduvanchery)', 
    dept: 'Engineering', 
    exp: '3-5 Years', 
    degree: 'B.E / B.Tech / MCA',
    experience: 'Strong knowledge of React.js, TypeScript, and state management. Experience with Tailwind CSS and responsive design is required.'
  },
  { 
    title: 'Cloud Infrastructure Architect', 
    type: 'Full-time', 
    location: 'Chennai (Guduvanchery)', 
    dept: 'Operations', 
    exp: '5+ Years', 
    degree: 'B.E / B.Tech / MCA',
    experience: 'Deep expertise in AWS, Kubernetes, and Terraform. Experience in managing CI/CD pipelines and infrastructure as code.'
  },
  { 
    title: 'Product UI/UX Designer', 
    type: 'Full-time', 
    location: 'Chennai (Guduvanchery)', 
    dept: 'Design', 
    exp: '2-4 Years', 
    degree: 'Any Degree / Design Specialization',
    experience: 'Proficiency in Figma and user-centric design principles. Portfolio showcasing clean, modern web and mobile interfaces.'
  },
  { 
    title: 'Technical Sales Lead', 
    type: 'Full-time', 
    location: 'Chennai (Guduvanchery)', 
    dept: 'Sales', 
    exp: '4+ Years', 
    degree: 'MBA / Any Graduation',
    experience: 'Experience in B2B IT service sales. Ability to effectively communicate technical concepts to non-technical stakeholders.'
  },
];

export function CareersView() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};

    // Validation logic
    if (!formData.get('name')) newErrors.name = 'Full name is required';
    if (!formData.get('email')) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.get('email') as string)) newErrors.email = 'Please enter a valid email';
    if (!formData.get('phone')) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.get('phone') as string)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.get('portfolio')) newErrors.portfolio = 'Portfolio/Resume link is required';
    if (!formData.get('why')) newErrors.why = 'Please tell us why you want to join';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Keep WhatsApp notification
      const accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
      const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
      const whatsappNumber = import.meta.env.VITE_WEBSITE_WHATSAPP_NUMBER;
      const to = `whatsapp:${whatsappNumber}`;
      const from = 'whatsapp:+14155238886';

      if (authToken?.startsWith('AC')) {
        console.error('Twilio Configuration Error: Your Auth Token looks like an Account SID.');
      }

      const messageBody = `ASAY Technologies - New Career Application\n\nJob: ${selectedJob?.title}\nName: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}\nPortfolio: ${formData.get('portfolio')}\nWhy: ${formData.get('why')}`;

      const params: Record<string, string> = {
        'To': to,
        'From': from,
        'Body': messageBody
      };

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(params)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Twilio API Error');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedJob(null);
      }, 3000);
    } catch (error) {
      const err = error as any;
      console.error('Career Application Failed:', {
        message: err?.message || 'Unknown error',
        hint: err?.hint,
        details: err?.details
      });
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Culture Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-secondary mb-6"
          >
            Join the <span className="text-gradient">Core Team</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            Work on the most innovative projects in the industry while being part of a team that values creativity, growth, and ownership.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Heart, label: 'Inclusive Culture' },
              { icon: Zap, label: 'Fast Growth' },
              { icon: Globe, label: 'Remote First' },
              { icon: Shield, label: 'Top Benefits' }
            ].map((benefit) => (
              <div key={benefit.label} className="glass px-6 py-3 rounded-full flex items-center gap-3 border-primary/20">
                <benefit.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-secondary">{benefit.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-secondary mb-12">Current Openings</h2>
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-10 rounded-[2.5rem] border-white/40 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-primary/5 hover:border-primary/20 transition-all hover:scale-[1.01]"
            >
              <div className="space-y-4 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">{job.dept}</span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    {job.type}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary">{job.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl group-hover:text-gray-600 transition-colors">
                  {job.experience}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-gray-500 text-sm font-bold">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-primary" />
                    {job.exp} Exp.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    {job.degree}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="w-full md:w-auto px-10 py-5 bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all group-hover:gap-4 shadow-xl active:scale-95"
              >
                Apply Now <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Perks Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center lg:text-left">
            <div className="col-span-full text-center mb-12">
               <h2 className="text-3xl font-bold text-secondary">Why Asay Tech?</h2>
            </div>
            {[
                { title: 'Global Impact', desc: 'Work on products used by millions across the globe.', icon: Globe },
                { title: 'Continuous Growth', desc: 'Annual budget for learning, certifications, and conferences.', icon: Zap },
                { title: 'Great Benefits', desc: 'Health insurance, flexible PTO, and top-tier equipment.', icon: Heart }
            ].map((perk, i) => (
                <div key={i} className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto lg:mx-0">
                        <perk.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary">{perk.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{perk.desc}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="glass rounded-[2rem] w-full max-w-sm shadow-2xl relative z-10 overflow-hidden border-white/60"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors z-20"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-secondary">Application Sent!</h2>
                    <p className="text-gray-500">Our hiring team will review your profile and get back to you within 3-5 business days.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                        {selectedJob.dept}
                      </span>
                      <h2 className="text-2xl font-black text-secondary tracking-tighter leading-none mb-2">Apply for {selectedJob.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs font-bold">
                         <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" /> {selectedJob.location}</span>
                         <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> {selectedJob.type}</span>
                         <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-primary" /> {selectedJob.exp} Exp.</span>
                         <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4 text-primary" /> {selectedJob.degree}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-secondary uppercase tracking-widest pl-2">Full Name</label>
                          <input 
                            name="name" 
                            type="text" 
                            className={cn(
                              "w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all font-bold text-sm",
                              errors.name ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-primary"
                            )} 
                            placeholder="John Doe" 
                          />
                          {errors.name && <p className="text-[10px] text-red-500 font-bold pl-2">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-secondary uppercase tracking-widest pl-2">Email Address</label>
                          <input 
                            name="email" 
                            type="email" 
                            className={cn(
                              "w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all font-bold text-sm",
                              errors.email ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-primary"
                            )} 
                            placeholder="john@example.com" 
                          />
                          {errors.email && <p className="text-[10px] text-red-500 font-bold pl-2">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary uppercase tracking-widest pl-2">Phone Number</label>
                        <input name="phone" type="tel" className={cn("w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all font-bold text-sm", errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-primary")} placeholder="+91 98765 43210" />
                        {errors.phone && <p className="text-[10px] text-red-500 font-bold pl-2">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary uppercase tracking-widest pl-2">Resume / Portfolio Link</label>
                        <input name="portfolio" type="url" className={cn("w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all font-bold text-sm", errors.portfolio ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-primary")} placeholder="https://linkedin.com/in/..." />
                        {errors.portfolio && <p className="text-[10px] text-red-500 font-bold pl-2">{errors.portfolio}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-secondary uppercase tracking-widest pl-2">Why Asay Technologies?</label>
                        <textarea name="why" rows={3} className={cn("w-full px-4 py-3 rounded-xl bg-gray-50 border outline-none transition-all font-bold text-sm resize-none", errors.why ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-primary")} placeholder="Tell us briefly about your passion..." />
                        {errors.why && <p className="text-[10px] text-red-500 font-bold pl-2">{errors.why}</p>}
                      </div>

                      <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-xl shadow-primary/20 hover:bg-accent transition-all flex items-center justify-center gap-3 active:scale-95">
                         SUBMIT APPLICATION <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
