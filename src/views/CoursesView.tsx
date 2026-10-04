import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, Clock, Award, CheckCircle2, Star, Play, 
  Users, Sparkles, ArrowRight, ShieldCheck, QrCode, Video, 
  Calendar, Laptop, ChevronRight, HelpCircle, User, Settings, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Course, getCoursesFromStorage, getLoggedInStudent, 
  isCourseUnlockedForCurrentUser, StudentEnrollment 
} from '../data/coursesData';
import { StudentLoginModal } from '../components/StudentLoginModal';
import { cn } from '../lib/utils';

export function CoursesView() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [studentUser, setStudentUser] = useState<StudentEnrollment | null>(null);

  useEffect(() => {
    setCourses(getCoursesFromStorage());
    setStudentUser(getLoggedInStudent());
    const syncAuth = () => setStudentUser(getLoggedInStudent());
    window.addEventListener('asai-student-auth-change', syncAuth);
    return () => window.removeEventListener('asai-student-auth-change', syncAuth);
  }, []);

  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const faqs = [
    {
      q: 'How are the courses delivered?',
      a: 'The first lesson (Module 1.1) of every course is completely free to preview on YouTube and on our platform. The full masterclass, including live coding assignments, capstone projects, and real-time mentor doubt clearing, runs daily from 5:00 PM to 6:00 PM IST via interactive Google Meet / Zoom. Full HD recordings and GitHub repositories are provided.'
    },
    {
      q: 'What is the credibility of the ISO 9001:2015 Certification?',
      a: 'Asai Infotech is an ISO 9001:2015 Quality Management Certified Technology Organization. Every issued certificate features a tamper-proof dynamic QR code. Recruiters, HRs, and universities can scan it to immediately verify the student credentials, grades, and internship verification directly on our official registry.'
    },
    {
      q: 'Is this suitable for College Students & Freshers?',
      a: 'Yes, absolutely. Our curriculum is tailored for college students needing final-year capstone project guidance, 30-day internship letters, and industry-grade practical skills to crack product and MNC campus placement interviews.'
    },
    {
      q: 'Can I clarify doubts during the Daily Live 5-6 PM Batch?',
      a: 'Yes! The evening batch is 100% interactive. You can share your screen, get your code debugged in real-time by senior engineers, and collaborate inside our dedicated WhatsApp tech group.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-14">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-5">
            <Award className="w-4 h-4 text-primary" />
            <span>ISO 9001:2015 Quality Certified Tech Academy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            Real-World IT Skills with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-indigo-600 to-secondary bg-clip-text text-transparent">
              Live Mentorship & Verifiable QR Certificate
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-7 max-w-2xl mx-auto">
            Master Python, Java, Kubernetes, Cloud DevOps, and QA Automation. Watch the first video for free, then join our daily 5:00 PM - 6:00 PM IST interactive live batch to earn your industry-recognized credentials.
          </p>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200/90 shadow-xs max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">1st Lesson</div>
              <div className="text-[11px] text-gray-500 font-medium">Free on YouTube</div>
            </div>
            <div className="text-center border-l border-gray-200">
              <div className="text-xl sm:text-2xl font-bold text-primary">5 - 6 PM</div>
              <div className="text-[11px] text-gray-500 font-medium">Daily Live Batch</div>
            </div>
            <div className="text-center border-l border-gray-200">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">ISO 9001</div>
              <div className="text-[11px] text-gray-500 font-medium">Verified QR Credential</div>
            </div>
            <div className="text-center border-l border-gray-200">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">Dual Cert</div>
              <div className="text-[11px] text-gray-500 font-medium">Course + Internship</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="#courses-list" 
              className="px-5 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Course Catalog</span>
            </a>
            <button
              onClick={() => setShowLoginModal(true)}
              className={cn(
                "px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer",
                studentUser 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
              )}
            >
              <User className="w-4 h-4" />
              <span>{studentUser ? `My Courses (${studentUser.studentName.split(' ')[0]})` : 'Student Portal Login'}</span>
            </button>
            <Link 
              to="/verify-certificate" 
              className="px-5 py-3 rounded-xl bg-white text-gray-800 text-xs sm:text-sm font-semibold border border-gray-300 hover:border-primary/50 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-2xs"
            >
              <QrCode className="w-4 h-4 text-primary" />
              <span>Verify Certificate</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Evening Batch Special Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-9 border border-indigo-500/30 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Interactive Evening Batch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Daily Evening 5:00 PM - 6:00 PM IST Live Classes
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Designed specifically for college students and working professionals after academic and office hours. Real-time screen sharing, interactive live coding, code reviews, and capstone project guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center w-full sm:w-auto">
                <div className="text-[10px] text-gray-300 uppercase font-semibold">Delivery Mode</div>
                <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5 mt-0.5">
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Meet / Zoom</span>
                </div>
              </div>
              <a 
                href="https://wa.me/916382907182?text=Hi%20Asai%20Infotech,%20I%20am%20interested%20in%20the%20Daily%205-6%20PM%20Live%20Batch." 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs text-center shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book Live Demo Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section id="courses-list" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Industry-Driven Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Curriculum engineered to match modern technology job descriptions in high-growth enterprises.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 border border-gray-200 self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                  selectedCategory === cat 
                    ? "bg-white text-primary shadow-xs" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-white border border-gray-200 hover:border-primary/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden p-6 sm:p-7"
            >
              <div>
                {/* Header Badge & Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {course.category}
                  </span>
                  {course.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
                  {course.tagline}
                </p>

                {/* Live Batch Info Box */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 mb-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-950 mb-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Live Batch: {course.liveBatch.timing}</span>
                  </div>
                  <div className="text-[11px] text-indigo-700/80">
                    {course.liveBatch.mode}
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Features Highlights */}
                <div className="space-y-1.5 mb-5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span><strong>1st Lesson Free:</strong> YouTube & Web Free Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span><strong>ISO 9001:2015:</strong> Verifiable QR Code Credential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span><strong>Dual Credential:</strong> Course Completion + 30-Day Internship Letter</span>
                  </div>
                </div>
              </div>

                {/* Card Footer: Price & CTA */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-gray-900">{course.price}</span>
                      <span className="text-xs text-gray-400 line-through">{course.originalPrice}</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      {isCourseUnlockedForCurrentUser(course.id) ? (
                        <span className="text-emerald-700 font-bold">✓ Unlocked for your account</span>
                      ) : (
                        <span>Live Mentorship Included</span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm",
                      isCourseUnlockedForCurrentUser(course.id)
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                        : "bg-primary hover:bg-primary/95 text-white shadow-primary/20"
                    )}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isCourseUnlockedForCurrentUser(course.id) ? 'Watch Course Videos' : 'Watch Free Preview'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      {/* ISO 9001:2015 Verification Highlight */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="rounded-3xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine & Employer Verifiable</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                ISO 9001:2015 Dynamic QR Code Certification
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5">
                Every certificate issued by Asai Infotech contains a tamper-proof dynamic QR code. Recruiters, HR departments, and institutions can scan the code to instantly verify student grades and capstone project performance on our official registry.
              </p>

              <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Global Industry Standard:</strong> ISO 9001:2015 Quality Management Accredited Training.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Dual Credential:</strong> Both Course Completion and 30-Day Internship Experience Letters included.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Instant PDF Download:</strong> High-resolution digital certificates downloadable anytime.</span>
                </div>
              </div>

              <Link
                to="/verify-certificate"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-all text-xs"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Try Verification Demo (Scan Sample QR)</span>
              </Link>
            </div>

            {/* Certificate Preview Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/40 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-900">
                    ASAI INFOTECH ACADEMY
                  </div>
                  <div className="text-xs font-semibold text-gray-500">
                    ISO 9001:2015 Certified Technology Credential
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200/90 mb-4">
                <div className="text-[10px] text-gray-400 uppercase font-semibold">Awarded To</div>
                <div className="text-base font-extrabold text-gray-900">KARTHIK SUBRAMANIAN</div>
                <div className="text-xs text-primary font-semibold mt-0.5">
                  Python Full-Stack & Cloud Automation Masterclass
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">ID: ASAI-2026-PY-1082</div>
                  <div className="text-emerald-600 font-semibold text-[11px]">Status: VERIFIED & ACTIVE</div>
                </div>
                <div className="p-1.5 bg-white rounded-lg border border-gray-200">
                  <QrCode className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Answers to common queries regarding courses, certifications, and live batches.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4.5 text-left font-bold text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 text-gray-400 transition-transform duration-200",
                  openFaq === idx && "rotate-90 text-primary"
                )} />
              </button>
              {openFaq === idx && (
                <div className="p-4.5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Student Login Modal */}
      <StudentLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
