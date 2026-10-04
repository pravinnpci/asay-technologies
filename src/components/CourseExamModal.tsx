import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Award, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  RotateCcw, Download, QrCode, ShieldCheck, Sparkles, Clock, HelpCircle, Check
} from 'lucide-react';
import { CourseExam, ExamResult, getExamForCourse, submitExamAndIssueCertificate } from '../data/examData';
import { VerifiedCertificate, getLoggedInStudent } from '../data/coursesData';
import { generateCertificatePdf, downloadPdfBlob } from '../lib/certificateGenerator';
import { Link } from 'react-router-dom';

interface CourseExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
}

export function CourseExamModal({ isOpen, onClose, courseId, courseTitle }: CourseExamModalProps) {
  const [exam, setExam] = useState<CourseExam | null>(null);
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [issuedCert, setIssuedCert] = useState<VerifiedCertificate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (isOpen && courseId) {
      const examData = getExamForCourse(courseId, courseTitle);
      setExam(examData);
      setAnswers({});
      setCurrentQIndex(0);
      setIsSubmitted(false);
      setResult(null);
      setIssuedCert(null);
      setShowReview(false);

      const loggedIn = getLoggedInStudent();
      if (loggedIn) {
        setStudentName(loggedIn.studentName);
      }
    }
  }, [isOpen, courseId, courseTitle]);

  if (!isOpen || !exam) return null;

  const totalQuestions = exam.questions.length;
  const currentQuestion = exam.questions[currentQIndex];
  const answeredCount = Object.keys(answers).length;

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQIndex]: optionIndex }));
  };

  const handleSubmitExam = () => {
    if (!studentName.trim()) {
      alert('Please enter your full name for the certificate.');
      return;
    }

    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const { result: res, certificate } = submitExamAndIssueCertificate(
      studentName.trim(),
      courseId,
      courseTitle,
      correctCount,
      totalQuestions
    );

    setResult(res);
    if (certificate) {
      setIssuedCert(certificate);
    }
    setIsSubmitted(true);
  };

  const handleDownloadPdf = async () => {
    if (!issuedCert) return;
    try {
      setIsDownloading(true);
      const pdfBytes = await generateCertificatePdf(issuedCert);
      downloadPdfBlob(pdfBytes, `ASAI_INFOTECH_CERTIFICATE_${issuedCert.certificateId}.pdf`);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setResult(null);
    setIssuedCert(null);
    setShowReview(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>ISO 9001:2015 Certification Exam</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              {courseTitle}
            </h2>
          </div>
        </div>

        {!isSubmitted ? (
          /* Active Examination Interface */
          <div>
            {/* Student Name Input */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Candidate Full Name (As it should appear on ISO Certificate) *
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Sivabarathi M or Arun Prakash"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 bg-white focus:outline-none focus:border-primary"
              />
            </div>

            {/* Progress Bar & Counter */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                <span>Question {currentQIndex + 1} of {totalQuestions}</span>
                <span>{answeredCount} of {totalQuestions} answered ({Math.round((answeredCount / totalQuestions) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                Question {currentQIndex + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mt-2.5 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 mt-5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = answers[currentQIndex] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-primary text-white border-primary shadow-xs' 
                          : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {currentQIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQIndex(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Generate Certificate</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Result & Certificate Screen */
          <div className="text-center space-y-6 pt-2">
            {result?.passed ? (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Exam Passed & Certified!</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900">
                  Congratulations, {result.studentName}!
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  You have successfully passed the ISO 9001:2015 certification assessment with a score of <strong>{result.score}/{result.totalQuestions} ({result.percentage}%)</strong> and achieved <strong>{result.grade}</strong>!
                </p>

                {/* Generated Certificate Card */}
                {issuedCert && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-indigo-50 to-emerald-50 border border-emerald-200 text-left">
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-200/60 mb-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase text-gray-400">Official Certificate ID</div>
                        <div className="text-sm font-mono font-black text-indigo-900">{issuedCert.certificateId}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900 text-xs font-bold">
                        {issuedCert.grade}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isDownloading ? 'Generating PDF...' : 'Download ISO Certificate (PDF)'}</span>
                      </button>

                      <Link
                        to={`/verify-certificate?cert_id=${issuedCert.certificateId}`}
                        onClick={onClose}
                        className="py-2.5 px-4 rounded-xl bg-white text-gray-800 hover:bg-gray-50 border border-gray-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <QrCode className="w-4 h-4 text-primary" />
                        <span>Verify Online</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">
                  Assessment Incomplete
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  You scored <strong>{result?.score}/{result?.totalQuestions} ({result?.percentage}%)</strong>. Passing requirement is <strong>70%</strong>. You can retake the assessment anytime!
                </p>
                <button
                  onClick={handleRetake}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            )}

            {/* Answer Explanations Toggle */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowReview(!showReview)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 mx-auto"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showReview ? 'Hide Answer Key' : 'Review Questions & Explanations'}</span>
              </button>

              {showReview && (
                <div className="mt-4 space-y-3 text-left max-h-60 overflow-y-auto pr-1">
                  {exam.questions.map((q, idx) => {
                    const userAns = answers[idx];
                    const isCorrect = userAns === q.correctIndex;
                    return (
                      <div key={q.id} className={`p-3 rounded-xl border text-xs ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'}`}>
                        <div className="font-bold text-gray-900 mb-1">
                          {idx + 1}. {q.question}
                        </div>
                        <div className="text-[11px] text-gray-600 mb-1">
                          Your answer: <span className="font-semibold">{userAns !== undefined ? q.options[userAns] : 'Not answered'}</span>
                        </div>
                        <div className="text-[11px] text-emerald-800 font-bold mb-1">
                          Correct: {q.options[q.correctIndex]}
                        </div>
                        <p className="text-[10px] text-gray-500 italic">
                          💡 {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
