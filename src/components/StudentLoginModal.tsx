import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, User, Lock, CheckCircle2, AlertCircle, LogOut, 
  BookOpen, ArrowRight, ShieldCheck, KeyRound, Sparkles, Clock, Play
} from 'lucide-react';
import { 
  getLoggedInStudent, studentLogin, studentLogout, StudentEnrollment,
  getStudentAllCourses, StudentCourseStatus
} from '../data/coursesData';
import { Link } from 'react-router-dom';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (student: StudentEnrollment) => void;
}

export function StudentLoginModal({ isOpen, onClose, onLoginSuccess }: StudentLoginModalProps) {
  const [student, setStudent] = useState<StudentEnrollment | null>(null);
  const [coursesList, setCoursesList] = useState<StudentCourseStatus[]>([]);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'my-courses' | 'all-courses'>('my-courses');

  const refreshStudentState = () => {
    const current = getLoggedInStudent();
    setStudent(current);
    if (current) {
      setCoursesList(getStudentAllCourses(current));
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshStudentState();
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) return;

    const res = studentLogin(identifier, password);
    if (res.success && res.student) {
      setStudent(res.student);
      setCoursesList(getStudentAllCourses(res.student));
      setSuccessMsg(`Welcome back, ${res.student.studentName}!`);
      if (onLoginSuccess) onLoginSuccess(res.student);
      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setIdentifier(demoEmail);
    setPassword(demoPass);
    const res = studentLogin(demoEmail, demoPass);
    if (res.success && res.student) {
      setStudent(res.student);
      setCoursesList(getStudentAllCourses(res.student));
      setSuccessMsg(`Welcome back, ${res.student.studentName}!`);
      if (onLoginSuccess) onLoginSuccess(res.student);
      setTimeout(() => {
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleLogout = () => {
    studentLogout();
    setStudent(null);
    setCoursesList([]);
    setSuccessMsg('You have been logged out.');
  };

  if (!isOpen) return null;

  const unlockedCourses = coursesList.filter(c => c.isUnlocked);
  const pendingCourses = coursesList.filter(c => c.isPending);
  const availableCourses = coursesList.filter(c => !c.isUnlocked && !c.isPending);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative w-full ${student ? 'max-w-2xl' : 'max-w-md'} rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {student ? (
          /* Multi-Course Student Dashboard */
          <div className="space-y-5 pt-1">
            {/* Header Profile Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-indigo-50/50 to-blue-50/50 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/25">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-gray-900">{student.studentName}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Student
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{student.email} • {student.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="px-3 py-1 rounded-xl bg-white/80 border border-indigo-200 text-indigo-900 text-xs font-bold shadow-2xs">
                  🎓 {unlockedCourses.length} Unlocked
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 hover:text-red-700 text-gray-700 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-gray-200 shadow-2xs"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('my-courses')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'my-courses'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  My Enrolled Courses ({unlockedCourses.length + pendingCourses.length})
                </button>
                <button
                  onClick={() => setActiveTab('all-courses')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'all-courses'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Explore More Courses ({availableCourses.length})
                </button>
              </div>
            </div>

            {/* TAB 1: My Enrolled Courses */}
            {activeTab === 'my-courses' && (
              <div className="space-y-3">
                {unlockedCourses.length === 0 && pendingCourses.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl text-xs text-gray-500">
                    <p className="mb-3">You don't have any active enrolled courses yet.</p>
                    <button
                      onClick={() => setActiveTab('all-courses')}
                      className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
                    >
                      Browse Courses to Enroll
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Unlocked Courses */}
                    {unlockedCourses.map((c) => (
                      <div 
                        key={c.courseId}
                        className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Unlocked & Active</span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              {c.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{c.courseTitle}</h4>
                        </div>

                        <Link
                          to={`/courses/${c.courseId}`}
                          onClick={onClose}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Watch Course Videos</span>
                        </Link>
                      </div>
                    ))}

                    {/* Pending Courses */}
                    {pendingCourses.map((c) => (
                      <div 
                        key={c.courseId}
                        className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold uppercase flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending Admin Unlock</span>
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              {c.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{c.courseTitle}</h4>
                          <p className="text-[11px] text-amber-800 mt-0.5">
                            Payment UTR submitted. Admin will verify and activate your video access shortly.
                          </p>
                        </div>

                        <Link
                          to={`/courses/${c.courseId}`}
                          onClick={onClose}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 font-semibold text-xs transition-all flex items-center justify-center gap-1 shrink-0"
                        >
                          <span>View Course</span>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* TAB 2: Explore Other Courses */}
            {activeTab === 'all-courses' && (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {availableCourses.map((c) => (
                  <div 
                    key={c.courseId}
                    className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 hover:border-primary/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase text-gray-400">{c.category}</div>
                      <h4 className="text-xs font-bold text-gray-900">{c.courseTitle}</h4>
                    </div>

                    <Link
                      to={`/courses/${c.courseId}`}
                      onClick={onClose}
                      className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shrink-0 flex items-center gap-1 shadow-2xs"
                    >
                      <span>Enroll ({c.price})</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Student Portal Login</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your registered Email or Mobile number and Password to unlock your courses.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Email Address or Mobile Number *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. sanjay.k@gmail.com or 9840123456"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                  Student Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Log In to Student Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
              <span>Not enrolled yet? </span>
              <Link 
                to="/courses" 
                onClick={onClose}
                className="text-primary font-bold hover:underline"
              >
                Browse 10 Tech Courses & Enroll
              </Link>
            </div>

            {/* Quick Demo Test Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-2 text-center">
                Quick Test Student Accounts (1-Click Login)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('sanjay.k@gmail.com', 'password123')}
                  className="p-2.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/90 text-indigo-900 border border-indigo-200/80 text-left transition-all text-xs cursor-pointer shadow-2xs"
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Sanjay K</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-indigo-200/60 rounded font-mono font-bold">1 Course</span>
                  </div>
                  <div className="text-[10px] text-indigo-700/80 truncate">Python Automation (Unlocked)</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('kavitha.b@gmail.com', 'password123')}
                  className="p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200/80 text-left transition-all text-xs cursor-pointer shadow-2xs"
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Kavitha B</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-emerald-200/60 rounded font-mono font-bold">Multi (2)</span>
                  </div>
                  <div className="text-[10px] text-emerald-700/80 truncate">DevOps + Python (Unlocked)</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
