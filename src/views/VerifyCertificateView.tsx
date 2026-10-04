import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ShieldCheck, QrCode, Search, Award, Download, CheckCircle2, 
  ExternalLink, ArrowLeft, AlertCircle, Building2, Calendar, Check
} from 'lucide-react';
import { sampleCertificates, VerifiedCertificate, getCertificatesRegistry } from '../data/coursesData';
import { generateCertificatePdf, downloadPdfBlob } from '../lib/certificateGenerator';
import QRCode from 'qrcode';

export function VerifyCertificateView() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const certIdFromQuery = queryParams.get('cert_id') || queryParams.get('id') || '';

  const [searchId, setSearchId] = useState<string>(certIdFromQuery || 'ASAI-2026-PY-1082');
  const [currentCert, setCurrentCert] = useState<VerifiedCertificate | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const performVerification = (idToVerify: string) => {
    const rawClean = (idToVerify || '').trim();
    if (!rawClean) {
      setCurrentCert(null);
      setNotFound(false);
      return;
    }

    const cleanId = rawClean.toUpperCase().replace(/\s+/g, '');
    const asaiNormalized = cleanId.replace(/^ASAY-/, 'ASAI-');
    const registry = getCertificatesRegistry();

    // 1. Direct match on normalized ID or raw clean ID
    if (registry[asaiNormalized]) {
      setCurrentCert(registry[asaiNormalized]);
      setNotFound(false);
      return;
    }
    if (registry[cleanId]) {
      setCurrentCert(registry[cleanId]);
      setNotFound(false);
      return;
    }

    // 2. Search by key endsWith or partial code (e.g. "PY-1082" or "1082")
    const matchKey = Object.keys(registry).find(key => {
      const upKey = key.toUpperCase();
      return upKey === asaiNormalized || 
             upKey.endsWith(cleanId) || 
             cleanId.endsWith(upKey.split('-').slice(-2).join('-')) ||
             (cleanId.length >= 4 && upKey.includes(cleanId));
    });
    if (matchKey && registry[matchKey]) {
      setCurrentCert(registry[matchKey]);
      setNotFound(false);
      return;
    }

    // 3. Search by Student Name (case-insensitive)
    const matchByName = Object.values(registry).find(cert => 
      cert.studentName.toLowerCase().includes(rawClean.toLowerCase())
    );
    if (matchByName) {
      setCurrentCert(matchByName);
      setNotFound(false);
      return;
    }

    setCurrentCert(null);
    setNotFound(true);
  };

  useEffect(() => {
    const qParams = new URLSearchParams(location.search);
    const qId = qParams.get('cert_id') || qParams.get('id');
    const toCheck = qId || searchId || 'ASAI-2026-PY-1082';
    if (qId) setSearchId(qId);
    performVerification(toCheck);
  }, [location.search]);

  useEffect(() => {
    if (currentCert) {
      document.title = `Verified: ${currentCert.studentName} (${currentCert.certificateId}) | ASAI InfoTech ISO Registry`;
      QRCode.toDataURL(currentCert.credentialUrl, { width: 150, margin: 1 })
        .then(url => setQrCodeDataUrl(url))
        .catch(err => console.error('QR code generation error:', err));
    } else {
      document.title = 'ISO 9001:2015 Online Certificate Verification | ASAI InfoTech';
    }
  }, [currentCert]);

  const handleDownload = async () => {
    if (!currentCert) return;
    try {
      setIsDownloading(true);
      const pdfBytes = await generateCertificatePdf(currentCert);
      downloadPdfBlob(pdfBytes, `ASAI_INFOTECH_CERTIFICATE_${currentCert.certificateId}.pdf`);
    } catch (err) {
      console.error('PDF Download failed:', err);
      alert('Failed to generate PDF certificate.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Navigation & Title */}
        <div className="mb-8">
          <Link to="/courses" className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-primary transition-colors mb-4 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tech Courses</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Credential Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-2">
            ISO 9001:2015 Certificate Online Verification
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Real-time verification registry for authentic ISO 9001:2015 credentials, course completions, and internship letters issued by ASAI InfoTech.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200 shadow-sm mb-10">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Enter Certificate ID or Scan QR:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. ASAI-2026-PY-1082"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold uppercase tracking-wider text-gray-900"
              />
            </div>
            <button
              onClick={() => performVerification(searchId)}
              className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Now</span>
            </button>
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-gray-400 font-semibold">Active Sample IDs:</span>
            {Object.keys(sampleCertificates).map((id) => (
              <button
                key={id}
                onClick={() => {
                  setSearchId(id);
                  performVerification(id);
                }}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[11px] font-bold transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result Card */}
        {currentCert && (
          <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 shadow-lg mb-10 relative overflow-hidden">
            {/* Top Verified Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Verification Status
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                    <span>100% Genuine & Authentic Credential</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-medium">Accreditation Framework</div>
                <div className="text-xs sm:text-sm font-extrabold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full mt-0.5 inline-block border border-indigo-100">
                  ISO 9001:2015 QMS Accredited
                </div>
              </div>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
              
              {/* Left 2 Cols: Details */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Candidate / Student Full Name</div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                    {currentCert.studentName}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">Course / Specialization Track</div>
                  <div className="text-lg sm:text-xl font-bold text-primary mt-1">
                    {currentCert.courseTitle}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-[11px] text-gray-400 font-semibold uppercase">Certificate ID</div>
                    <div className="text-sm sm:text-base font-extrabold text-gray-900 font-mono mt-0.5">
                      {currentCert.certificateId}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="text-[11px] text-gray-400 font-semibold uppercase">Performance Grade</div>
                    <div className="text-sm sm:text-base font-extrabold text-emerald-600 mt-0.5">
                      {currentCert.grade}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 col-span-2 sm:col-span-1">
                    <div className="text-[11px] text-gray-400 font-semibold uppercase">Date of Issue</div>
                    <div className="text-sm sm:text-base font-bold text-gray-800 mt-0.5">
                      {currentCert.issueDate}
                    </div>
                  </div>
                </div>

                {/* Skills Certified */}
                <div className="pt-2">
                  <div className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2.5">
                    Verified Competencies & Skills Certified
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentCert.skillsAcquired.map((skill, idx) => (
                      <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-100 shadow-2xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Internship Status */}
                {currentCert.internshipCompleted && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Includes 30-Day Practical Industry Internship Experience at ASAI InfoTech</span>
                  </div>
                )}

                {/* Authorized Signatory Block */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Authorized Signatory</div>
                    <div className="text-base font-serif italic font-bold text-indigo-950 mt-0.5">
                      Sivabarathi M
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Founder & Director, ASAI InfoTech
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-center">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cryptographically Signed</span>
                  </div>
                </div>
              </div>

              {/* Right 1 Col: Live QR Code & Download Box */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 text-center flex flex-col items-center">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                  Scannable Dynamic QR
                </div>

                {qrCodeDataUrl ? (
                  <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-sm mb-3">
                    <img src={qrCodeDataUrl} alt="Certificate Verification QR Code" className="w-36 h-36 mx-auto" />
                  </div>
                ) : (
                  <div className="w-36 h-36 bg-gray-200 animate-pulse rounded-2xl mb-3" />
                )}

                <div className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Scan with any smartphone or camera to verify this exact record online.
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
                </button>
              </div>
            </div>

            {/* Organization Footer Note */}
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                Issued by <strong>ASAI InfoTech Private Limited</strong> • Quality Management System ISO 9001:2015
              </div>
              <div className="text-primary font-semibold">
                Permanent Verification URL: {currentCert.credentialUrl}
              </div>
            </div>
          </div>
        )}

        {/* Not Found State */}
        {notFound && (
          <div className="p-8 sm:p-10 rounded-3xl bg-red-50 border border-red-200 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Certificate Record Not Found
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto mb-4 leading-relaxed">
              We could not find any active credential matching ID <strong className="text-red-700 font-mono">"{searchId}"</strong> in our official registry. Please verify the ID number or contact the administration.
            </p>
            <div className="text-xs text-gray-500">
              Need assistance? Contact verification desk at: <a href="mailto:asayinfotech@gmail.com" className="text-primary font-bold underline">asayinfotech@gmail.com</a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
