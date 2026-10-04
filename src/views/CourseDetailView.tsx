import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Lock, CheckCircle2, Clock, Calendar, Video, Award, 
  ArrowLeft, Star, Users, ShieldCheck, QrCode, FileText, 
  ExternalLink, Sparkles, MessageCircle, Download, X, CreditCard, Send, User
} from 'lucide-react';
import { 
  coursesData, Lesson, Course, sampleCertificates, 
  getCoursesFromStorage, addEnrollmentToStorage, getUnlockedCourses, paymentConfig,
  StudentEnrollment, getLoggedInStudent, isCourseUnlockedForCurrentUser, getEnrollmentsFromStorage
} from '../data/coursesData';
import { StudentLoginModal } from '../components/StudentLoginModal';
import { CourseExamModal } from '../components/CourseExamModal';
import { generateCertificatePdf, downloadPdfBlob } from '../lib/certificateGenerator';
import { cn } from '../lib/utils';

export function CourseDetailView() {
  const { courseId } = useParams<{ courseId: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [unlockedCourseIds, setUnlockedCourseIds] = useState<string[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentEnrollment | null>(null);
  
  // Modals state
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showExamModal, setShowExamModal] = useState<boolean>(false);
  const [downloadingCert, setDownloadingCert] = useState<boolean>(false);

  // Enrollment form state
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  useEffect(() => {
    const list = getCoursesFromStorage();
    setCourses(list);
    const found = list.find(c => c.id === courseId) || null;
    setCourse(found);
    if (found) {
      document.title = `${found.title} | ASAI InfoTech Academy`;
    }
    if (found?.modules[0]?.lessons[0]) {
      setActiveLesson(found.modules[0].lessons[0]);
    }
    const syncAuth = () => {
      setUnlockedCourseIds(getUnlockedCourses());
      setCurrentStudent(getLoggedInStudent());
    };
    syncAuth();
    window.addEventListener('asai-student-auth-change', syncAuth);
    return () => window.removeEventListener('asai-student-auth-change', syncAuth);
  }, [courseId]);

  useEffect(() => {
    if (currentStudent) {
      if (!studentName) setStudentName(currentStudent.studentName);
      if (!studentEmail && currentStudent.email) setStudentEmail(currentStudent.email);
      if (!studentPhone && currentStudent.phone) setStudentPhone(currentStudent.phone);
      if (!collegeName && currentStudent.collegeOrCompany) setCollegeName(currentStudent.collegeOrCompany);
      if (!studentPassword && currentStudent.password) setStudentPassword(currentStudent.password);
    }
  }, [currentStudent]);

  if (!course) {
    return (
      <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Course Not Found</h2>
        <p className="text-gray-600 mb-6 text-sm">The requested course could not be located in our academy catalog.</p>
        <Link to="/courses" className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>
      </div>
    );
  }

  const isCourseUnlocked = isCourseUnlockedForCurrentUser(course.id) || unlockedCourseIds.includes(course.id);
  const isCoursePending = !!(currentStudent && getEnrollmentsFromStorage().some(e => 
    (e.courseId === course.id) && 
    (e.status === 'PENDING_APPROVAL') &&
    ((currentStudent.email && e.email === currentStudent.email) || (currentStudent.phone && e.phone === currentStudent.phone) || e.id === currentStudent.id)
  ));

  const handleLessonClick = (lesson: Lesson) => {
    // If lesson is preview OR course is unlocked for user
    if (lesson.isPreview || isCourseUnlocked) {
      setActiveLesson(lesson);
      setShowLockedModal(false);
      const playerEl = document.getElementById('video-player-section');
      if (playerEl) playerEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setShowLockedModal(true);
    }
  };

  const handleDownloadSampleCert = async () => {
    try {
      setDownloadingCert(true);
      const sample = sampleCertificates['ASAI-2026-PY-1082'];
      const pdfBytes = await generateCertificatePdf(sample);
      downloadPdfBlob(pdfBytes, `ASAI_INFOTECH_CERTIFICATE_${sample.certificateId}.pdf`);
    } catch (err) {
      console.error('Failed to generate sample cert:', err);
      alert('Could not generate sample certificate. Please try again.');
    } finally {
      setDownloadingCert(false);
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !utrNumber) return;

    addEnrollmentToStorage({
      studentName,
      email: studentEmail,
      phone: studentPhone,
      collegeOrCompany: collegeName || 'Student',
      courseId: course.id,
      courseTitle: course.title,
      amount: course.price,
      utrOrReference: utrNumber,
      username: studentEmail || studentPhone,
      password: studentPassword || 'password123'
    });

    setEnrollSubmitted(true);
    setTimeout(() => {
      setEnrollSubmitted(false);
      setShowEnrollModal(false);
      setShowLockedModal(false);
    }, 4000);
  };

  const whatsappEnrollUrl = `https://wa.me/916382907182?text=${encodeURIComponent(
    `Hello Asai Infotech! I want to enroll in "${course.title}" (${course.price} Live Evening 5-6 PM Batch). Please assist me with joining.`
  )}`;

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-5">
        <Link 
          to="/courses" 
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Courses</span>
        </Link>
      </div>

      {/* Main Course Header & Video Player Section */}
      <section id="video-player-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left 2 Cols: Video Player & Overview */}
          <div className="lg:col-span-2 space-y-6">

            {/* Student Access Status Banner */}
            {isCourseUnlocked ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-emerald-900 text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Full Access Unlocked!</strong> {currentStudent ? `Logged in as ${currentStudent.studentName}. All curriculum videos are unlocked.` : 'All course lessons are unlocked and ready to watch.'}
                  </span>
                </div>
                {currentStudent && (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900 shrink-0"
                  >
                    My Courses Hub
                  </button>
                )}
              </div>
            ) : isCoursePending ? (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-950 text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Enrollment Under Review!</strong> Your payment reference is awaiting Admin verification. Once approved, this course will automatically unlock.
                  </span>
                </div>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 shrink-0"
                >
                  My Portal
                </button>
              </div>
            ) : currentStudent ? (
              <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-3 text-indigo-950 text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span>You are logged in as <strong>{currentStudent.studentName}</strong>. Want to learn this course too?</span>
                </div>
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="px-3 py-1 rounded-lg bg-primary text-white text-[11px] font-bold shadow-2xs hover:bg-primary/95 transition-all shrink-0"
                >
                  Enroll for {course.price}
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between gap-3 text-indigo-950 text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0" />
                  <span>Already enrolled? Log in with your password to unlock all modules.</span>
                </div>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-3 py-1 rounded-lg bg-primary text-white text-[11px] font-bold shadow-2xs hover:bg-primary/95 transition-all shrink-0"
                >
                  Student Login
                </button>
              </div>
            )}
            
            {/* Embedded YouTube / Preview Container */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-gray-800 shadow-xl">
              {(activeLesson?.isPreview || isCourseUnlocked) && activeLesson?.youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeId}?autoplay=0&rel=0`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-slate-900">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-3">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-1.5">Members Only Module</h3>
                  <p className="text-xs text-gray-400 max-w-md mb-5 leading-relaxed">
                    This video is part of the full curriculum. Join our daily 5:00 PM - 6:00 PM Live Evening Batch or pay via GPay/UPI to unlock all lessons.
                  </p>
                  <button
                    onClick={() => setShowEnrollModal(true)}
                    className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Enroll Now ({course.price} via GPay/UPI)</span>
                  </button>
                </div>
              )}

              {/* Free Preview Tag Overlay */}
              {activeLesson?.isPreview && !isCourseUnlocked && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-emerald-600/95 text-white text-[11px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md">
                  <Play className="w-3 h-3 fill-white" />
                  <span>Free Preview Lesson</span>
                </div>
              )}
            </div>

            {/* Currently Playing Lesson Info */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Now Viewing: {activeLesson?.title}
                </span>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeLesson?.duration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeLesson?.description || course.description}
              </p>
            </div>

            {/* Course Title & Details */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                  {course.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-semibold">
                  {course.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {course.rating} ({course.reviewsCount} Reviews)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Course Exam & Assessment Callout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-indigo-50 to-emerald-50 border border-emerald-200 mb-6 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">ISO 9001:2015 Certification Exam Portal</h4>
                    <p className="text-[11px] text-gray-600">Answer 5 practical questions (70%+ to pass) to unlock your verified credential &amp; download PDF.</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowExamModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Exam & Get Certified</span>
                </button>
              </div>

              {/* What You Will Learn */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">
                  Key Curriculum Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Included */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Skills & Tools Covered:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.skills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Live Batch Card & Curriculum Sidebar */}
          <div className="space-y-6">
            
            {/* Live Evening Batch Box */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl border border-indigo-500/30">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Interactive Batch</span>
              </div>

              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-3xl font-extrabold text-white">{course.price}</span>
                <span className="text-xs text-gray-400 line-through">{course.originalPrice}</span>
                <span className="text-[10px] text-emerald-400 font-bold ml-auto uppercase tracking-wider">Special Offer</span>
              </div>
              <div className="text-xs text-gray-300 mb-5 leading-relaxed">
                Full Curriculum + Daily Live Classes (5-6 PM) + Verifiable ISO 9001:2015 QR Certificate
              </div>

              {/* Batch Info Points */}
              <div className="space-y-2.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs mb-5">
                <div className="flex items-center gap-2 text-gray-200">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Timing:</strong> {course.liveBatch.timing}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Days:</strong> {course.liveBatch.days}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Video className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Platform:</strong> Google Meet / Zoom</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span><strong>Certificate:</strong> ISO 9001:2015 QR Certified</span>
                </div>
              </div>

              {/* Enroll Button Triggering GPay/UPI Modal */}
              <button
                onClick={() => setShowEnrollModal(true)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 text-xs mb-2.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Enroll Now ({course.price} via GPay/UPI)</span>
              </button>

              <a
                href={whatsappEnrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-center text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp Support</span>
              </a>
            </div>

            {/* Curriculum Accordion */}
            <div className="rounded-3xl bg-white border border-gray-200 p-5 shadow-xs">
              <h3 className="text-base font-bold text-gray-900 mb-0.5">
                Course Curriculum
              </h3>
              <p className="text-[11px] text-gray-400 mb-3">
                Click lesson to play or unlock
              </p>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {course.modules.map((module) => (
                  <div key={module.id} className="border border-gray-100 rounded-xl p-2.5 bg-gray-50/60">
                    <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      {module.title}
                    </div>

                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isCurrent = activeLesson?.id === lesson.id;
                        const canPlay = lesson.isPreview || isCourseUnlocked;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            className={cn(
                              "w-full text-left p-2 rounded-lg text-xs flex items-center justify-between gap-2 transition-all",
                              isCurrent 
                                ? "bg-primary text-white font-semibold shadow-xs" 
                                : "hover:bg-white text-gray-700 font-medium"
                            )}
                          >
                            <div className="flex items-center gap-1.5 overflow-hidden">
                              {canPlay ? (
                                <Play className={cn(
                                  "w-3 h-3 flex-shrink-0",
                                  isCurrent ? "fill-white text-white" : "fill-emerald-600 text-emerald-600"
                                )} />
                              ) : (
                                <Lock className={cn(
                                  "w-3 h-3 flex-shrink-0",
                                  isCurrent ? "text-white" : "text-gray-400"
                                )} />
                              )}
                              <span className="truncate text-[11px]">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              {canPlay ? (
                                <span className={cn(
                                  "px-1.5 py-0.2 rounded text-[9px] font-bold uppercase",
                                  isCurrent ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
                                )}>
                                  {lesson.isPreview ? 'Free' : 'Unlocked'}
                                </span>
                              ) : (
                                <span className={cn(
                                  "px-1.5 py-0.2 rounded text-[9px] font-semibold",
                                  isCurrent ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                                )}>
                                  Locked
                                </span>
                              )}
                              <span className="text-[10px] opacity-70">{lesson.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ISO 9001:2015 Sample Certificate Card */}
            <div className="p-5 rounded-3xl bg-amber-50/60 border border-amber-200 text-center">
              <Award className="w-7 h-7 text-amber-600 mx-auto mb-1.5" />
              <h4 className="text-xs font-bold text-gray-900 mb-0.5">
                ISO 9001:2015 Verified Certificate
              </h4>
              <p className="text-[11px] text-gray-600 mb-3">
                Students receive tamper-proof QR code credentials recognized by recruiters.
              </p>
              <button
                onClick={handleDownloadSampleCert}
                disabled={downloadingCert}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingCert ? 'Generating...' : 'Download Sample PDF'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Enrollment & GPay / UPI Modal */}
      <AnimatePresence>
        {showEnrollModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowEnrollModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-primary mx-auto flex items-center justify-center mb-2">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Enroll in {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Fee: <strong className="text-emerald-600 text-sm">{course.price}</strong> • Live Batch: 5:00 PM - 6:00 PM IST
                </p>
              </div>

              {enrollSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-emerald-950 mb-1">
                    Enrollment Submitted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Our admin team is verifying your payment reference (UTR). Your live batch credentials and course access will be activated shortly.
                  </p>
                </div>
              ) : (
                <>
                  {/* Payment Info Card */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 mb-5 text-xs">
                    <div className="font-bold text-gray-800 uppercase tracking-wider text-[10px] mb-2">
                      Scan or Transfer via GPay / PhonePe / UPI:
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <div className="p-2 rounded-lg bg-white border border-gray-200">
                        <div className="text-[10px] text-gray-400 font-sans">UPI ID</div>
                        <div className="font-bold text-gray-900">{paymentConfig.upiId}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-gray-200">
                        <div className="text-[10px] text-gray-400 font-sans">GPay / PhonePe</div>
                        <div className="font-bold text-gray-900">{paymentConfig.gpayPhone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Enrollment Form */}
                  <form onSubmit={handleEnrollSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-gray-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Sanjay Kumar"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase text-gray-600 mb-1">
                          WhatsApp Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="+91 98401 23456"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-gray-600 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="sanjay@example.com"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-gray-600 mb-1">
                        College / University / Company
                      </label>
                      <input
                        type="text"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. SRM IST / B.Tech IT Final Year"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase text-gray-600 mb-1">
                          Payment UTR / Reference ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="e.g. 428910284719 (From GPay)"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-mono font-bold text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block font-bold uppercase text-gray-600 mb-1">
                          Create Login Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          placeholder="Create your portal password"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Enrollment & Request Unlock</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Locked Content Info Prompt */}
      <AnimatePresence>
        {showLockedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3">
                <Lock className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1.5">
                🔒 Members Only Video Module
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-5">
                {isCoursePending 
                  ? 'Your payment reference for this course has been submitted and is awaiting Admin verification. All modules will unlock automatically once approved.' 
                  : 'The first lesson is free for everyone. To access this lesson, live project source code, and daily 5:00 PM - 6:00 PM IST interactive classes, enroll now!'}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                {!isCoursePending && (
                  <button
                    onClick={() => {
                      setShowLockedModal(false);
                      setShowEnrollModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Enroll for {course.price}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowLockedModal(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all whitespace-nowrap"
                >
                  {currentStudent ? 'My Courses Hub' : 'Student Login'}
                </button>
                <button
                  onClick={() => setShowLockedModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Student Portal Login Modal */}
      <StudentLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Course Certification Exam Modal */}
      {course && (
        <CourseExamModal
          isOpen={showExamModal}
          onClose={() => setShowExamModal(false)}
          courseId={course.id}
          courseTitle={course.title}
        />
      )}
    </div>
  );
}
