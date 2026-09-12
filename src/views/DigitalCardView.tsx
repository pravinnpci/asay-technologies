import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, Mail, Globe, MapPin, Download, Share2, MessageSquare, 
  Check, Building2, ShieldCheck,
  ShoppingBag, Code, ArrowUpRight
} from 'lucide-react';

export function DigitalCardView() {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Business Card Data
  const cardData = {
    name: 'Sivabarathi M',
    title: 'Founder & Managing Director',
    company: 'ASAY INFOTECH',
    tagline: 'Enterprise Software & E-Commerce Solutions',
    phone: '+916382907182',
    displayPhone: '+91 6382907182',
    email: 'asayinfotech@gmail.com',
    website: 'https://asayinfotech.in',
    displayWebsite: 'asayinfotech.in',
    address: 'First Floor, No 3/31 Jawahar Ayya Nagar, Aadhanoor Road, Madambakkam Po, Guduvanchery 603202',
    mapUrl: 'https://maps.google.com/?q=12.86002,80.050441',
    whatsapp: 'https://wa.me/916382907182?text=Hello%20Sivabarathi,%20I%20got%20your%20contact%20via%20ASAY%20InfoTech%20Smart%20Card.'
  };

  // Generate vCard (.vcf) download for 1-click Contact Saving
  const handleSaveContact = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:M;Sivabarathi;;;',
      'FN:Sivabarathi M',
      'ORG:ASAY INFOTECH',
      'TITLE:Founder & Managing Director',
      'TEL;TYPE=CELL,VOICE:+916382907182',
      'EMAIL;TYPE=WORK,INTERNET:asayinfotech@gmail.com',
      'URL:https://asayinfotech.in',
      'ADR;TYPE=WORK:;;First Floor\\, No 3/31 Jawahar Ayya Nagar\\, Aadhanoor Road;Guduvanchery;Tamil Nadu;603202;India',
      'NOTE:Enterprise Software Engineering, Autonomous AI Agents & E-Commerce Global Export',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sivabarathi_ASAY_INFOTECH.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.company} - ${cardData.name}`,
          text: `Connect with ${cardData.name} (${cardData.company}) - Enterprise IT & E-Commerce.`,
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 py-28 selection:bg-cyan-500/30">
      <div className="w-full max-w-md">
        
        {/* Main Smart Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] border border-slate-700/50 shadow-2xl overflow-hidden shadow-cyan-950/40"
        >
          {/* Top Decorative Gradient Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white to-transparent" />
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white/90 flex items-center gap-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Smart NFC Card
            </div>
          </div>

          {/* Profile Details & Avatar */}
          <div className="px-6 pt-0 pb-8 relative -mt-16 text-center">
            {/* Logo / Profile Avatar */}
            <div className="relative inline-block mb-3">
              <div className="w-28 h-28 rounded-3xl bg-slate-950 p-1.5 ring-4 ring-slate-900 shadow-2xl mx-auto overflow-hidden">
                <img 
                  src="/ASAY INFO Tech logo.png" 
                  alt="ASAY InfoTech" 
                  className="w-full h-full object-contain rounded-2xl bg-slate-900 p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-lg border-2 border-slate-900">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight">{cardData.name}</h1>
            <p className="text-cyan-400 font-medium text-sm mt-0.5">{cardData.title}</p>
            <div className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full mt-2 border border-slate-700/60 font-medium">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{cardData.company}</span>
            </div>

            {/* Save to Phone Button (Primary Action) */}
            <div className="mt-6">
              <button
                onClick={handleSaveContact}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-slate-950 font-bold rounded-2xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950" />
                    <span>Contact Card Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-slate-950" />
                    <span>Save Contact to Phone</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Action Circular Buttons */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <a
                href={`tel:${cardData.phone}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">Call</span>
              </a>

              <a
                href={cardData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-1 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">WhatsApp</span>
              </a>

              <a
                href={`mailto:${cardData.email}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">Email</span>
              </a>

              <button
                onClick={handleShare}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/40 text-slate-200 transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                </div>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
                  {copied ? 'Copied!' : 'Share'}
                </span>
              </button>
            </div>

            {/* Company Info & Offerings */}
            <div className="mt-6 text-left space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Company Details
              </h3>

              {/* Website */}
              <a
                href={cardData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-slate-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Official Website</p>
                    <p className="text-sm font-semibold text-white">{cardData.displayWebsite}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              {/* Office Address & Map */}
              <a
                href={cardData.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 text-slate-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Office Location</p>
                    <p className="text-xs font-medium text-slate-200 line-clamp-2 leading-relaxed">
                      Jawahar Ayya Nagar, Guduvanchery, Chennai 603202
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              </a>
            </div>

            {/* Core Capabilities */}
            <div className="mt-6 text-left space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Core Domains
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                  <Code className="w-5 h-5 text-cyan-400 mb-1" />
                  <p className="text-xs font-bold text-white">IT & AI Services</p>
                  <p className="text-[10px] text-slate-400">Web Apps, SaaS & Autonomous AI</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/30 border border-slate-700/30">
                  <ShoppingBag className="w-5 h-5 text-teal-400 mb-1" />
                  <p className="text-xs font-bold text-white">E-Commerce</p>
                  <p className="text-[10px] text-slate-400">Global Selling & Online Retail</p>
                </div>
              </div>
            </div>

            {/* Footer Brand */}
            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-500">
                Powered by <span className="font-semibold text-slate-400">ASAY INFOTECH</span> Smart Card Architecture
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
