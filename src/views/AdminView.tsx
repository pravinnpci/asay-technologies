import React, { useState, useEffect } from 'react';
import { 
  Settings, Video, Users, Award, QrCode, CheckCircle2, 
  Clock, Plus, Trash2, Edit3, Save, Download, ExternalLink, 
  Search, ShieldCheck, Lock, Unlock, AlertCircle, Copy, Check, X, UploadCloud, RefreshCw, BookOpen, User
} from 'lucide-react';
import { 
  coursesData, Course, Lesson, Module, 
  StudentEnrollment, getEnrollmentsFromStorage, updateEnrollmentStatus,
  updateEnrollment, deleteEnrollmentFromStorage, addEnrollmentDirect,
  VerifiedCertificate, getCertificatesRegistry, registerNewCertificate,
  updateCertificate, deleteCertificate, GRADE_OPTIONS,
  adminAssignCoursesToStudent, getUserUnlockedCourses,
  getCoursesFromStorage, saveCourseToStorage, saveAllCourses, paymentConfig,
  importFullStateJson, resetToDefaultData, studentLogin
} from '../data/coursesData';
import { CourseExamModal } from '../components/CourseExamModal';
import { getExamResultsHistory, courseExams, ExamResult, getExamForCourse } from '../data/examData';
import { StudentLoginModal } from '../components/StudentLoginModal';
import { generateCertificatePdf, downloadPdfBlob } from '../lib/certificateGenerator';
import { cn } from '../lib/utils';

export function AdminView() {
  const [activeTab, setActiveTab] = useState<'courses' | 'enrollments' | 'certificates' | 'exams' | 'export'>('courses');
  const [previewStudentModal, setPreviewStudentModal] = useState(false);
  const [examTestModal, setExamTestModal] = useState<{ open: boolean; courseId: string; courseTitle: string }>({
    open: false,
    courseId: 'python-automation',
    courseTitle: 'Python Full-Stack & Cloud Automation Masterclass'
  });
  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => getExamResultsHistory());
  
  // Courses state
  const [courses, setCourses] = useState<Course[]>(() => getCoursesFromStorage());
  const [selectedCourseId, setSelectedCourseId] = useState<string>('python-automation');
  const [savingSuccess, setSavingSuccess] = useState<string>('');

  // Enrollments state
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>(() => getEnrollmentsFromStorage());
  const [enrollmentSearch, setEnrollmentSearch] = useState('');
  const [editingEnrollment, setEditingEnrollment] = useState<StudentEnrollment | null>(null);
  const [showAddEnrollmentModal, setShowAddEnrollmentModal] = useState(false);
  const [courseAssigningStudent, setCourseAssigningStudent] = useState<StudentEnrollment | null>(null);
  const [selectedCourseIdsForStudent, setSelectedCourseIdsForStudent] = useState<string[]>([]);
  const [manualSelectedCourses, setManualSelectedCourses] = useState<string[]>(['python-automation']);
  const [newEnrForm, setNewEnrForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    collegeOrCompany: '',
    courseId: 'python-automation',
    amount: '₹1,999',
    utrOrReference: '',
    password: 'password123',
    status: 'APPROVED_UNLOCKED' as 'PENDING_APPROVAL' | 'APPROVED_UNLOCKED'
  });

  // Certificates state
  const [certificates, setCertificates] = useState<Record<string, VerifiedCertificate>>(() => getCertificatesRegistry());
  const [certSearch, setCertSearch] = useState('');
  const [newCertName, setNewCertName] = useState('');
  const [newCertCourse, setNewCertCourse] = useState('Python Full-Stack & Cloud Automation Masterclass');
  const [newCertGrade, setNewCertGrade] = useState('A+ (Distinction)');
  const [newCertId, setNewCertId] = useState(`ASAI-${new Date().getFullYear()}-PY-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newCertSkills, setNewCertSkills] = useState('Python 3.12, FastAPI, Automation Scripting, Docker, Cloud CI/CD');
  const [certSuccessMsg, setCertSuccessMsg] = useState('');
  const [editingCert, setEditingCert] = useState<VerifiedCertificate | null>(null);
  const [editingCertSkills, setEditingCertSkills] = useState('');

  // Git state import/export
  const [copiedJson, setCopiedJson] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatusMsg, setImportStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const loadedCourses = getCoursesFromStorage();
    setCourses(loadedCourses);
    if (loadedCourses.length > 0 && !loadedCourses.find(c => c.id === selectedCourseId)) {
      setSelectedCourseId(loadedCourses[0].id);
    }
    setEnrollments(getEnrollmentsFromStorage());
    setCertificates(getCertificatesRegistry());
    setExamHistory(getExamResultsHistory());
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0] || coursesData[0];

  // Helper to extract clean YouTube ID from full URL or ID
  const cleanYoutubeId = (urlOrId: string) => {
    if (!urlOrId) return '';
    const trimmed = urlOrId.trim();
    if (trimmed.includes('youtube.com/watch?v=')) {
      return trimmed.split('v=')[1]?.split('&')[0] || trimmed;
    }
    if (trimmed.includes('youtu.be/')) {
      return trimmed.split('youtu.be/')[1]?.split('?')[0] || trimmed;
    }
    return trimmed;
  };

  // ---------------- COURSES HANDLERS ----------------
  const handleUpdateCourseMeta = (field: keyof Course, value: any) => {
    if (!selectedCourse) return;
    const updatedCourse = { ...selectedCourse, [field]: value };
    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('Course details updated successfully!');
  };

  const handleLessonUpdate = (moduleId: string, lessonId: string, field: keyof Lesson, value: any) => {
    if (!selectedCourse) return;
    const updatedCourse = { ...selectedCourse };
    const mod = updatedCourse.modules.find(m => m.id === moduleId);
    if (!mod) return;
    const les = mod.lessons.find(l => l.id === lessonId);
    if (!les) return;

    if (field === 'youtubeId') {
      les.youtubeId = cleanYoutubeId(value);
    } else {
      (les as any)[field] = value;
    }

    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('Lesson updated successfully!');
  };

  const handleAddLesson = (moduleId: string) => {
    if (!selectedCourse) return;
    const updatedCourse = { ...selectedCourse };
    const mod = updatedCourse.modules.find(m => m.id === moduleId);
    if (!mod) return;

    const newLes: Lesson = {
      id: `les-${Date.now()}`,
      title: `Lesson ${mod.lessons.length + 1}: New Topic`,
      duration: '30 mins',
      youtubeId: '',
      isPreview: false,
      description: 'Hands-on practical session covering key principles and implementation.'
    };
    mod.lessons.push(newLes);
    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('New lesson added!');
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (!selectedCourse) return;
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const updatedCourse = { ...selectedCourse };
    const mod = updatedCourse.modules.find(m => m.id === moduleId);
    if (!mod) return;
    mod.lessons = mod.lessons.filter(l => l.id !== lessonId);
    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('Lesson removed!');
  };

  const handleAddModule = () => {
    if (!selectedCourse) return;
    const updatedCourse = { ...selectedCourse };
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: `Module ${updatedCourse.modules.length + 1}: Advanced Topics`,
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          title: `Lesson 1: Introduction`,
          duration: '30 mins',
          isPreview: false,
          description: 'Module overview and concepts.'
        }
      ]
    };
    updatedCourse.modules.push(newMod);
    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('New module created!');
  };

  const handleDeleteModule = (moduleId: string) => {
    if (!selectedCourse) return;
    if (!window.confirm('Are you sure you want to delete this module and its lessons?')) return;
    const updatedCourse = { ...selectedCourse };
    updatedCourse.modules = updatedCourse.modules.filter(m => m.id !== moduleId);
    saveCourseToStorage(updatedCourse);
    setCourses(getCoursesFromStorage());
    showSaveIndicator('Module deleted!');
  };

  const showSaveIndicator = (msg: string) => {
    setSavingSuccess(msg);
    setTimeout(() => setSavingSuccess(''), 3000);
  };

  // ---------------- ENROLLMENTS HANDLERS ----------------
  const handleApproveEnrollment = (enrId: string) => {
    updateEnrollmentStatus(enrId, 'APPROVED_UNLOCKED');
    setEnrollments(getEnrollmentsFromStorage());
  };

  const handleSetPendingEnrollment = (enrId: string) => {
    updateEnrollmentStatus(enrId, 'PENDING_APPROVAL');
    setEnrollments(getEnrollmentsFromStorage());
  };

  const handleDeleteEnrollment = (enrId: string) => {
    if (!window.confirm('Are you sure you want to delete this enrollment record?')) return;
    deleteEnrollmentFromStorage(enrId);
    setEnrollments(getEnrollmentsFromStorage());
  };

  const handleSaveEditedEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEnrollment) return;
    updateEnrollment(editingEnrollment);
    setEnrollments(getEnrollmentsFromStorage());
    setEditingEnrollment(null);
  };

  const handleOpenAssignModal = (enr: StudentEnrollment) => {
    setCourseAssigningStudent(enr);
    const unlocked = getUserUnlockedCourses(enr);
    setSelectedCourseIdsForStudent(unlocked);
  };

  const handleToggleCourseForStudent = (courseId: string) => {
    if (selectedCourseIdsForStudent.includes(courseId)) {
      setSelectedCourseIdsForStudent(selectedCourseIdsForStudent.filter(id => id !== courseId));
    } else {
      setSelectedCourseIdsForStudent([...selectedCourseIdsForStudent, courseId]);
    }
  };

  const handleSaveAssignedCourses = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseAssigningStudent) return;
    adminAssignCoursesToStudent(courseAssigningStudent.id, selectedCourseIdsForStudent);
    setEnrollments(getEnrollmentsFromStorage());
    setCourseAssigningStudent(null);
  };

  const handleAddManualEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    const courseObj = courses.find(c => c.id === newEnrForm.courseId);
    const assigned = manualSelectedCourses.length > 0 ? manualSelectedCourses : [newEnrForm.courseId];
    const newRecord: StudentEnrollment = {
      id: `ENR-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newEnrForm.studentName,
      email: newEnrForm.email,
      phone: newEnrForm.phone,
      collegeOrCompany: newEnrForm.collegeOrCompany || 'Direct Student',
      courseId: newEnrForm.courseId,
      courseTitle: courseObj ? courseObj.title : 'IT Masterclass',
      amount: newEnrForm.amount,
      utrOrReference: newEnrForm.utrOrReference || 'DIRECT_CASH_OR_ADMIN',
      enrolledAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: newEnrForm.status,
      username: newEnrForm.email || newEnrForm.phone,
      password: newEnrForm.password || 'password123',
      unlockedCourses: newEnrForm.status === 'APPROVED_UNLOCKED' ? assigned : []
    };
    addEnrollmentDirect(newRecord);
    setEnrollments(getEnrollmentsFromStorage());
    setShowAddEnrollmentModal(false);
    setManualSelectedCourses(['python-automation']);
    setNewEnrForm({
      studentName: '',
      email: '',
      phone: '',
      collegeOrCompany: '',
      courseId: 'python-automation',
      amount: '₹1,999',
      utrOrReference: '',
      password: 'password123',
      status: 'APPROVED_UNLOCKED'
    });
  };

  const handlePreviewAsStudent = (enr: StudentEnrollment) => {
    studentLogin(enr.email || enr.phone || enr.username || '', enr.password || 'password123');
    setPreviewStudentModal(true);
  };

  // ---------------- CERTIFICATES HANDLERS ----------------
  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertId.trim()) return;

    const skillsArray = newCertSkills.split(',').map(s => s.trim()).filter(Boolean);
    const certObj: VerifiedCertificate = {
      certificateId: newCertId.trim().toUpperCase(),
      studentName: newCertName.trim(),
      courseTitle: newCertCourse,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      grade: newCertGrade,
      status: 'VERIFIED_ACTIVE',
      credentialUrl: `https://asayinfotech.in/verify?cert_id=${newCertId.trim().toUpperCase()}`,
      skillsAcquired: skillsArray,
      internshipCompleted: true
    };

    registerNewCertificate(certObj);
    setCertificates(getCertificatesRegistry());
    setCertSuccessMsg(`Certificate ${certObj.certificateId} registered successfully!`);
    
    // Reset form with new random ID
    setNewCertName('');
    setNewCertId(`ASAI-${new Date().getFullYear()}-PY-${Math.floor(1000 + Math.random() * 9000)}`);
    setTimeout(() => setCertSuccessMsg(''), 4000);
  };

  const handleStartEditCert = (cert: VerifiedCertificate) => {
    setEditingCert({ ...cert });
    setEditingCertSkills(cert.skillsAcquired.join(', '));
  };

  const handleSaveEditedCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    const updated: VerifiedCertificate = {
      ...editingCert,
      skillsAcquired: editingCertSkills.split(',').map(s => s.trim()).filter(Boolean)
    };

    updateCertificate(updated);
    setCertificates(getCertificatesRegistry());
    setEditingCert(null);
  };

  const handleDeleteCert = (certId: string) => {
    if (!window.confirm(`Are you sure you want to delete certificate ${certId}? This will remove it from online verification.`)) return;
    deleteCertificate(certId);
    setCertificates(getCertificatesRegistry());
  };

  const handleDownloadCertPdf = async (cert: VerifiedCertificate) => {
    try {
      const pdfBytes = await generateCertificatePdf(cert);
      downloadPdfBlob(pdfBytes, `ASAI_INFOTECH_CERTIFICATE_${cert.certificateId}.pdf`);
    } catch (err) {
      alert('Failed to generate PDF certificate.');
    }
  };

  // ---------------- GIT STATE EXPORT / IMPORT ----------------
  const getFullGitJson = () => {
    return JSON.stringify({
      courses: getCoursesFromStorage(),
      certificates: getCertificatesRegistry(),
      enrollments: getEnrollmentsFromStorage(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const copyGitJson = () => {
    navigator.clipboard.writeText(getFullGitJson());
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
  };

  const downloadGitJsonFile = () => {
    const jsonStr = getFullGitJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asai-academy-state-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) {
      setImportStatusMsg({ type: 'error', text: 'Please paste valid JSON state before importing.' });
      return;
    }
    const res = importFullStateJson(importJsonText.trim());
    if (res.success) {
      setImportStatusMsg({ type: 'success', text: res.message });
      refreshAllData();
      setImportJsonText('');
    } else {
      setImportStatusMsg({ type: 'error', text: res.message });
    }
    setTimeout(() => setImportStatusMsg(null), 5000);
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset all courses, certificates, and enrollments to original factory defaults? This clears local browser modifications.')) return;
    resetToDefaultData();
    refreshAllData();
    alert('Reset to defaults complete!');
  };

  // Filtered lists with bulletproof null checks
  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];
  const filteredEnrollments = safeEnrollments.filter(e => {
    if (!e) return false;
    const q = (enrollmentSearch || '').trim().toLowerCase();
    if (!q) return true;
    const name = (e.studentName || '').toLowerCase();
    const email = (e.email || '').toLowerCase();
    const phone = (e.phone || '').toLowerCase();
    const utr = (e.utrOrReference || '').toLowerCase();
    const course = (e.courseTitle || '').toLowerCase();
    const college = (e.collegeOrCompany || '').toLowerCase();
    return name.includes(q) || email.includes(q) || phone.includes(q) || utr.includes(q) || course.includes(q) || college.includes(q);
  });

  const certArray: VerifiedCertificate[] = (certificates && typeof certificates === 'object') 
    ? (Object.values(certificates) as VerifiedCertificate[]) 
    : [];
  const filteredCerts: VerifiedCertificate[] = certArray.filter(c => {
    if (!c) return false;
    const q = (certSearch || '').trim().toLowerCase();
    if (!q) return true;
    const name = (c.studentName || '').toLowerCase();
    const id = (c.certificateId || '').toLowerCase();
    const course = (c.courseTitle || '').toLowerCase();
    return name.includes(q) || id.includes(q) || course.includes(q);
  });

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Academy Management & Certification Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Asai Infotech Academy Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
              Full real-time in-place editing for courses, video lessons, student admissions, and tamper-proof ISO 9001:2015 QR certificates.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={copyGitJson}
              className="px-4 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-black font-semibold text-xs transition-all flex items-center gap-2 shadow-sm"
              title="Copy all state as JSON for Git"
            >
              {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedJson ? 'Copied State JSON!' : 'Export State JSON'}</span>
            </button>
            <button
              onClick={downloadGitJsonFile}
              className="p-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:text-primary hover:border-primary transition-all shadow-sm"
              title="Download JSON File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-gray-100 border border-gray-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === 'courses' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Video className="w-4 h-4" />
            <span>Courses & Videos ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === 'enrollments' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Users className="w-4 h-4" />
            <span>Student Admissions ({enrollments.filter(e => e.status === 'PENDING_APPROVAL').length} Pending)</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === 'certificates' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Award className="w-4 h-4" />
            <span>ISO 9001 Certificates ({Object.keys(certificates).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('exams')}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === 'exams' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Exams & Assessments (10)</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === 'export' ? "bg-white text-primary shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Download className="w-4 h-4" />
            <span>Git Backup & State Sync</span>
          </button>
        </div>

        {/* ==================== TAB 1: COURSES MANAGEMENT ==================== */}
        {activeTab === 'courses' && selectedCourse && (
          <div className="space-y-6">
            
            {/* Course Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {(courses && courses.length > 0 ? courses : coursesData).map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap",
                    selectedCourseId === c.id 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                  )}
                >
                  {c.category || 'Course'}: {(c.title || c.id || 'Course').split('&')[0]}
                </button>
              ))}
            </div>

            {savingSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{savingSuccess}</span>
              </div>
            )}

            {/* Course Edit Header Card */}
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
              
              <div className="border-b border-gray-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {selectedCourse.category}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-2">{selectedCourse.title}</h2>
                  </div>
                  <a
                    href={`/courses/${selectedCourse.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Public Page</span>
                  </a>
                </div>

                {/* Course Metadata In-Place Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Course Title
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.title}
                      onChange={(e) => handleUpdateCourseMeta('title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Category Tag
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.category}
                      onChange={(e) => handleUpdateCourseMeta('category', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Fee Price (e.g. ₹1,999)
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.price}
                      onChange={(e) => handleUpdateCourseMeta('price', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                      Original Price (e.g. ₹5,999)
                    </label>
                    <input
                      type="text"
                      value={selectedCourse.originalPrice}
                      onChange={(e) => handleUpdateCourseMeta('originalPrice', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={selectedCourse.tagline}
                    onChange={(e) => handleUpdateCourseMeta('tagline', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Modules & Lessons Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">
                    Syllabus Modules & Video Lessons ({(selectedCourse?.modules || []).length} Modules)
                  </h3>
                  <button
                    onClick={handleAddModule}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Module</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {(selectedCourse?.modules || []).map((module, mIdx) => (
                    <div key={module.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                      
                      {/* Module Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Module {mIdx + 1} Title
                          </label>
                          <input
                            type="text"
                            value={module.title}
                            onChange={(e) => {
                              const updated = { ...selectedCourse };
                              const mod = updated.modules.find(m => m.id === module.id);
                              if (mod) mod.title = e.target.value;
                              saveCourseToStorage(updated);
                              setCourses(getCoursesFromStorage());
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center pt-2 sm:pt-4">
                          <button
                            onClick={() => handleAddLesson(module.id)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Lesson</span>
                          </button>
                          <button
                            onClick={() => handleDeleteModule(module.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs transition-colors"
                            title="Delete Module"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Lessons Grid/List */}
                      <div className="space-y-3">
                        {(module.lessons || []).map((lesson) => (
                          <div 
                            key={lesson.id} 
                            className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                          >
                            {/* Lesson Title */}
                            <div className="md:col-span-5">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => handleLessonUpdate(module.id, lesson.id, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                              />
                            </div>

                            {/* YouTube URL / ID */}
                            <div className="md:col-span-3">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                                YouTube ID / URL
                              </label>
                              <input
                                type="text"
                                value={lesson.youtubeId || ''}
                                placeholder="e.g. kqtD5dpn9C8 or full URL"
                                onChange={(e) => handleLessonUpdate(module.id, lesson.id, 'youtubeId', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-mono text-gray-800 focus:outline-none focus:border-primary"
                              />
                            </div>

                            {/* Free Preview vs Locked & Duration */}
                            <div className="md:col-span-3 flex items-center justify-between gap-2 pt-2 md:pt-4">
                              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={lesson.isPreview}
                                  onChange={(e) => handleLessonUpdate(module.id, lesson.id, 'isPreview', e.target.checked)}
                                  className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-gray-300"
                                />
                                <span className={cn(
                                  "text-xs font-bold",
                                  lesson.isPreview ? "text-emerald-600" : "text-gray-500"
                                )}>
                                  {lesson.isPreview ? 'Free Preview' : '🔒 Locked'}
                                </span>
                              </label>

                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => handleLessonUpdate(module.id, lesson.id, 'duration', e.target.value)}
                                className="w-16 px-2 py-1 rounded-lg border border-gray-200 text-center text-[11px] font-semibold text-gray-600"
                                title="Duration"
                              />
                            </div>

                            {/* Delete Lesson Button */}
                            <div className="md:col-span-1 flex justify-end pt-2 md:pt-4">
                              <button
                                onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete Lesson"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB 2: STUDENT ENROLLMENTS ==================== */}
        {activeTab === 'enrollments' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Student Admissions & Enrollment Unlocking</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Verify student UPI reference IDs (GPay/PhonePe) and click "Approve & Unlock" to grant full course access.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddEnrollmentModal(true)}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Manual Student</span>
                  </button>
                </div>
              </div>

              {/* Search bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={enrollmentSearch}
                    onChange={(e) => setEnrollmentSearch(e.target.value)}
                    placeholder="Search by student name, phone, email, UTR reference..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {filteredEnrollments.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-sm">
                  No enrollments match your query.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-3">Student Name</th>
                        <th className="py-3 px-3">Enrolled Course</th>
                        <th className="py-3 px-3">Contact</th>
                        <th className="py-3 px-3">Payment (UTR)</th>
                        <th className="py-3 px-3">Active Courses Access</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {filteredEnrollments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-gray-50/50">
                          <td className="py-3 px-3 font-bold text-gray-900">
                            <div>{enr.studentName || 'Student'}</div>
                            <div className="text-[10px] text-gray-400 font-normal">{enr.collegeOrCompany || '-'}</div>
                          </td>
                          <td className="py-3 px-3 text-primary font-semibold">
                            {(enr.courseTitle || enr.courseId || 'General Course').split('&')[0]}
                          </td>
                          <td className="py-3 px-3 text-gray-600">
                            <div className="font-semibold text-gray-900">{enr.phone || '-'}</div>
                            <div className="text-[10px] text-gray-400">{enr.email || '-'}</div>
                            <div className="mt-1 flex items-center gap-1 text-[10px] font-mono bg-indigo-50/80 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100/60 w-fit">
                              <span className="font-bold text-gray-500">Pass:</span> {enr.password || 'password123'}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-gray-800 font-bold">
                            <div>{enr.amount || '-'}</div>
                            <div className="text-[10px] text-indigo-700">{enr.utrOrReference || '-'}</div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {(getUserUnlockedCourses(enr) || []).length === 0 ? (
                                <span className="text-[10px] text-gray-400 italic">None unlocked</span>
                              ) : (
                                (getUserUnlockedCourses(enr) || []).map(cid => {
                                  const cObj = courses.find(c => c && c.id === cid);
                                  return (
                                    <span key={cid} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                                      {cObj ? cObj.category : cid}
                                    </span>
                                  );
                                })
                              )}
                            </div>
                            <button
                              onClick={() => handleOpenAssignModal(enr)}
                              className="mt-1 text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                              title="Assign or enable courses for this student"
                            >
                              <BookOpen className="w-3 h-3" />
                              <span>Assign / Edit</span>
                            </button>
                          </td>
                          <td className="py-3 px-3 text-gray-500">{enr.enrolledAt}</td>
                          <td className="py-3 px-3">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                              enr.status === 'APPROVED_UNLOCKED' 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-amber-100 text-amber-800"
                            )}>
                              {enr.status === 'APPROVED_UNLOCKED' ? 'Active / Unlocked' : 'Pending Approval'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {enr.status === 'PENDING_APPROVAL' ? (
                                <button
                                  onClick={() => handleApproveEnrollment(enr.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
                                  title="Approve & Unlock"
                                >
                                  <Unlock className="w-3 h-3" />
                                  <span>Unlock</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleSetPendingEnrollment(enr.id)}
                                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-xs transition-colors flex items-center gap-1"
                                  title="Set Pending"
                                >
                                  <Lock className="w-3 h-3" />
                                  <span>Lock</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleOpenAssignModal(enr)}
                                className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                                title="Assign / Enable Courses"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handlePreviewAsStudent(enr)}
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                title="Preview Student Portal (Inspect what student sees)"
                              >
                                <User className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setEditingEnrollment({ ...enr })}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                title="Edit Enrollment Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteEnrollment(enr.id)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                title="Delete Enrollment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ISSUED ISO CERTIFICATES ==================== */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form to issue a new certificate */}
            <div className="lg:col-span-1 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm h-fit">
              <h2 className="text-lg font-bold text-gray-900 mb-1">Issue New ISO 9001 Certificate</h2>
              <p className="text-xs text-gray-500 mb-5">
                Generates a verifiable tamper-proof credential with permanent QR code and instant PDF download.
              </p>

              {certSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{certSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleCreateCertificate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    placeholder="e.g. Arun Prakash R"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Select Course *
                  </label>
                  <select
                    value={newCertCourse}
                    onChange={(e) => setNewCertCourse(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                      Certificate ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCertId}
                      onChange={(e) => setNewCertId(e.target.value.toUpperCase())}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono font-bold uppercase text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                      Grade / Performance
                    </label>
                    <select
                      value={newCertGrade}
                      onChange={(e) => setNewCertGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 bg-white focus:outline-none focus:border-primary"
                    >
                      {GRADE_OPTIONS.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Skills Certified (Comma Separated)
                  </label>
                  <textarea
                    rows={2}
                    value={newCertSkills}
                    onChange={(e) => setNewCertSkills(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Generate QR & Register Certificate</span>
                </button>
              </form>
            </div>

            {/* Issued Certificates List with in-place edit */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Registered Certificates Registry</h2>
                  <p className="text-xs text-gray-500">
                    Live verifiable records on asayinfotech.in/verify
                  </p>
                </div>
                <span className="text-xs font-bold text-gray-400">
                  {filteredCerts.length} Certificates
                </span>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder="Search certificates by student name or Certificate ID..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredCerts.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs">
                    No certificates found.
                  </div>
                ) : (
                  filteredCerts.map((cert: VerifiedCertificate) => (
                    <div 
                      key={cert.certificateId}
                      className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-primary/40 shadow-xs hover:shadow-sm transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-black text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                              {cert.certificateId}
                            </span>
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase",
                              cert.status === 'VERIFIED_ACTIVE' ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                            )}>
                              {cert.status || 'VERIFIED_ACTIVE'}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                              Grade: {cert.grade || 'A+ (Distinction)'}
                            </span>
                          </div>

                          <h4 className="text-base font-black text-gray-900">{cert.studentName || 'Certified Student'}</h4>
                          <div className="text-xs font-bold text-primary mt-0.5">{cert.courseTitle || 'Executive Tech Program'}</div>
                          
                          <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-3">
                            <span>Issued: <strong>{cert.issueDate || 'Recent'}</strong></span>
                            <span>•</span>
                            <span>Signatory: <strong>Sivabarathi M</strong> (Founder & Director)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                          <button
                            onClick={() => handleStartEditCert(cert)}
                            className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-primary hover:text-primary text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                            title="Edit Certificate Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <a
                            href={`/verify?cert_id=${cert.certificateId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-primary hover:text-primary text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                            title="Verify live link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </a>

                          <button
                            onClick={() => handleDownloadCertPdf(cert)}
                            className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                            title="Download ISO 9001:2015 PDF"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-400" />
                            <span>PDF</span>
                          </button>

                          <button
                            onClick={() => handleDeleteCert(cert.certificateId)}
                            className="p-1.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Certificate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Prominent Certified Skills Badges */}
                      {Array.isArray(cert.skillsAcquired) && cert.skillsAcquired.length > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1.5">
                            Verified Skills Certified:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(cert.skillsAcquired || []).map((skill, sIdx) => (
                              <span 
                                key={sIdx} 
                                className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-100 text-[11px] font-semibold"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB: COURSE EXAMS & ASSESSMENTS ==================== */}
        {activeTab === 'exams' && (
          <div className="space-y-8">
            {/* Header info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ISO 9001:2015 Automated Evaluation Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Course Certification Examination Portal
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-3xl leading-relaxed">
                Candidates must achieve at least 70% in their course assessment to automatically generate their tamper-proof ISO 9001:2015 certificate. As an administrator, you can test/preview the exam for any course and view candidate assessment scores.
              </p>
            </div>

            {/* Courses Exam Cards Grid */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Configured Course Assessments ({courses.length} Courses)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((c) => {
                  const examObj = getExamForCourse(c.id, c.title);
                  return (
                    <div 
                      key={c.id}
                      className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-primary/40 shadow-xs flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                            {c.category}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Passing: {examObj.passingPercentage}%
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{c.title}</h4>
                        <div className="text-[11px] text-gray-500 mb-4 flex items-center gap-3">
                          <span>⏱ {examObj.durationMinutes} Mins</span>
                          <span>📝 {examObj.questions.length} MCQ Questions</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setExamTestModal({ open: true, courseId: c.id, courseTitle: c.title })}
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-primary" />
                        <span>Test / Take Assessment</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Candidate Exam Submissions History */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Candidate Assessment Submissions ({examHistory.length} Recorded)
                  </h3>
                  <p className="text-xs text-gray-500">Live evaluation scores and generated certificate IDs.</p>
                </div>
                <button
                  onClick={() => setExamHistory(getExamResultsHistory())}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {examHistory.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl">
                  No exam submissions recorded yet. Take an assessment above to test!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-400 uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Candidate</th>
                        <th className="py-2.5 px-3">Course</th>
                        <th className="py-2.5 px-3">Score & %</th>
                        <th className="py-2.5 px-3">Grade</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Certificate ID</th>
                        <th className="py-2.5 px-3 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {examHistory.map((h, hIdx) => (
                        <tr key={hIdx} className="hover:bg-gray-50/50">
                          <td className="py-2.5 px-3 font-bold text-gray-900">{h.studentName}</td>
                          <td className="py-2.5 px-3 text-gray-600 truncate max-w-[200px]">{h.courseTitle}</td>
                          <td className="py-2.5 px-3">
                            <span className={cn(
                              "font-bold font-mono px-2 py-0.5 rounded",
                              h.passed ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                            )}>
                              {h.score}/{h.totalQuestions} ({h.percentage}%)
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-indigo-900">{h.grade}</td>
                          <td className="py-2.5 px-3 text-gray-400">{h.submittedAt}</td>
                          <td className="py-2.5 px-3 font-mono text-primary font-bold">{h.certificateId || 'N/A'}</td>
                          <td className="py-2.5 px-3 text-right">
                            {h.certificateId ? (
                              <a
                                href={`/verify-certificate?cert_id=${h.certificateId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                              >
                                <span>Verify</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-gray-400 italic">Failed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: GIT BACKUP & SETTINGS ==================== */}
        {activeTab === 'export' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Zero-Database Git State Persistence & Backup
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-3xl">
                As per your architectural design, Asai Infotech operates with zero external database dependencies. All modifications you make to courses, YouTube preview URLs, approved students, and ISO certificates are held locally in your browser. Copying or downloading this state JSON allows you to commit it directly into your GitHub repository or transfer it across devices without losing any data.
              </p>
            </div>

            {/* Payment Details Card */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <h3 className="text-sm font-bold text-indigo-950 mb-3">
                Active UPI & GPay Payment Coordinates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-gray-400 font-semibold uppercase text-[10px]">UPI VPA ID</div>
                  <div className="font-bold text-gray-900 font-mono mt-0.5">{paymentConfig.upiId}</div>
                </div>
                <div>
                  <div className="text-gray-400 font-semibold uppercase text-[10px]">GPay / PhonePe Mobile</div>
                  <div className="font-bold text-gray-900 font-mono mt-0.5">{paymentConfig.gpayPhone}</div>
                </div>
                <div>
                  <div className="text-gray-400 font-semibold uppercase text-[10px]">Beneficiary Account</div>
                  <div className="font-bold text-gray-900 mt-0.5">{paymentConfig.accountHolder}</div>
                </div>
              </div>
            </div>

            {/* Git JSON Dump Box */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Full Application State (JSON Backup for Git):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyGitJson}
                    className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-primary/95 transition-all shadow-sm"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied to Clipboard' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={downloadGitJsonFile}
                    className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-black transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                rows={10}
                value={getFullGitJson()}
                className="w-full p-4 rounded-2xl bg-gray-950 text-emerald-400 font-mono text-xs border border-gray-800 focus:outline-none"
              />
            </div>

            {/* Restore / Import Section */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-primary" />
                <span>Restore / Import State from Git</span>
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Paste JSON exported from another laptop or committed in Git to synchronize this browser.
              </p>

              {importStatusMsg && (
                <div className={cn(
                  "p-3 rounded-xl text-xs font-bold mb-3 flex items-center gap-2",
                  importStatusMsg.type === 'success' 
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                )}>
                  <AlertCircle className="w-4 h-4" />
                  <span>{importStatusMsg.text}</span>
                </div>
              )}

              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="Paste valid JSON state here..."
                className="w-full p-3 rounded-xl border border-gray-200 font-mono text-xs text-gray-800 bg-white focus:outline-none focus:border-primary mb-3"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleImportJson}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/95 flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Import & Synchronize State</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-red-100 hover:text-red-700 text-gray-700 text-xs font-semibold transition-all"
                >
                  Reset to Factory Defaults
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ==================== MODAL: EDIT CERTIFICATE ==================== */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Edit Certificate: <span className="font-mono text-primary">{editingCert.certificateId}</span>
              </h3>
              <button 
                onClick={() => setEditingCert(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedCert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.studentName}
                  onChange={(e) => setEditingCert({ ...editingCert, studentName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Course Title *
                </label>
                <select
                  value={editingCert.courseTitle}
                  onChange={(e) => setEditingCert({ ...editingCert, courseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Grade / Performance
                  </label>
                  <select
                    value={editingCert.grade}
                    onChange={(e) => setEditingCert({ ...editingCert, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 bg-white focus:outline-none focus:border-primary"
                  >
                    {GRADE_OPTIONS.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  >
                    <option value="VERIFIED_ACTIVE">VERIFIED_ACTIVE</option>
                    <option value="REVOKED">REVOKED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Issue Date
                </label>
                <input
                  type="text"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Skills (Comma Separated)
                </label>
                <textarea
                  rows={2}
                  value={editingCertSkills}
                  onChange={(e) => setEditingCertSkills(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: EDIT ENROLLMENT ==================== */}
      {editingEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Edit Enrollment: <span className="font-mono text-primary">{editingEnrollment.id}</span>
              </h3>
              <button 
                onClick={() => setEditingEnrollment(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedEnrollment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingEnrollment.studentName}
                  onChange={(e) => setEditingEnrollment({ ...editingEnrollment, studentName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEnrollment.phone}
                    onChange={(e) => setEditingEnrollment({ ...editingEnrollment, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingEnrollment.email}
                    onChange={(e) => setEditingEnrollment({ ...editingEnrollment, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  College / Company
                </label>
                <input
                  type="text"
                  value={editingEnrollment.collegeOrCompany}
                  onChange={(e) => setEditingEnrollment({ ...editingEnrollment, collegeOrCompany: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="text"
                    value={editingEnrollment.amount}
                    onChange={(e) => setEditingEnrollment({ ...editingEnrollment, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={editingEnrollment.status}
                    onChange={(e) => setEditingEnrollment({ ...editingEnrollment, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  >
                    <option value="APPROVED_UNLOCKED">APPROVED_UNLOCKED</option>
                    <option value="PENDING_APPROVAL">PENDING_APPROVAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Payment Reference (UTR / UPI)
                </label>
                <input
                  type="text"
                  value={editingEnrollment.utrOrReference}
                  onChange={(e) => setEditingEnrollment({ ...editingEnrollment, utrOrReference: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Student Login Password
                </label>
                <input
                  type="text"
                  value={editingEnrollment.password || ''}
                  onChange={(e) => setEditingEnrollment({ ...editingEnrollment, password: e.target.value })}
                  placeholder="Login password (e.g. password123)"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono font-semibold text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingEnrollment(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD MANUAL ENROLLMENT ==================== */}
      {showAddEnrollmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Add Manual Student Admission
              </h3>
              <button 
                onClick={() => setShowAddEnrollmentModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualEnrollment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEnrForm.studentName}
                  onChange={(e) => setNewEnrForm({ ...newEnrForm, studentName: e.target.value })}
                  placeholder="e.g. Meena Sundaram"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEnrForm.phone}
                    onChange={(e) => setNewEnrForm({ ...newEnrForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEnrForm.email}
                    onChange={(e) => setNewEnrForm({ ...newEnrForm, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Select Course *
                </label>
                <select
                  value={newEnrForm.courseId}
                  onChange={(e) => {
                    const c = courses.find(item => item.id === e.target.value);
                    setNewEnrForm({ 
                      ...newEnrForm, 
                      courseId: e.target.value,
                      amount: c ? c.price : newEnrForm.amount
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-primary"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ({c.price})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  College / Company
                </label>
                <input
                  type="text"
                  value={newEnrForm.collegeOrCompany}
                  onChange={(e) => setNewEnrForm({ ...newEnrForm, collegeOrCompany: e.target.value })}
                  placeholder="e.g. Final Year B.E CSE / Offline Walk-in"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="text"
                    value={newEnrForm.amount}
                    onChange={(e) => setNewEnrForm({ ...newEnrForm, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Admission Status
                  </label>
                  <select
                    value={newEnrForm.status}
                    onChange={(e) => setNewEnrForm({ ...newEnrForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                  >
                    <option value="APPROVED_UNLOCKED">APPROVED_UNLOCKED (Active)</option>
                    <option value="PENDING_APPROVAL">PENDING_APPROVAL (Pending)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Payment Ref / Note
                </label>
                <input
                  type="text"
                  value={newEnrForm.utrOrReference}
                  onChange={(e) => setNewEnrForm({ ...newEnrForm, utrOrReference: e.target.value })}
                  placeholder="e.g. Cash / Direct Bank Transfer"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Student Login Password
                </label>
                <input
                  type="text"
                  value={newEnrForm.password}
                  onChange={(e) => setNewEnrForm({ ...newEnrForm, password: e.target.value })}
                  placeholder="e.g. password123"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono font-semibold text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Courses to Unlock Immediately ({manualSelectedCourses.length} selected)
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200 max-h-36 overflow-y-auto">
                  {courses.map(c => {
                    const isSel = manualSelectedCourses.includes(c.id);
                    return (
                      <label key={c.id} className="flex items-center gap-2 text-[11px] p-1.5 rounded-lg hover:bg-white cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => {
                            if (isSel) setManualSelectedCourses(manualSelectedCourses.filter(id => id !== c.id));
                            else setManualSelectedCourses([...manualSelectedCourses, c.id]);
                          }}
                          className="w-3.5 h-3.5 rounded text-primary focus:ring-primary/20"
                        />
                        <span className="truncate font-medium text-gray-800">{c.category}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shadow-sm"
                >
                  Create & Enroll Student
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEnrollmentModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ASSIGN / ENABLE COURSES TO STUDENT ==================== */}
      {courseAssigningStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Assign Course Access: <span className="text-primary">{courseAssigningStudent.studentName}</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Select which tech courses this student can view and watch.
                </p>
              </div>
              <button 
                onClick={() => setCourseAssigningStudent(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAssignedCourses} className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-gray-600 border-b border-gray-100 pb-2">
                <span>Select Courses to Unlock:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseIdsForStudent(courses.map(c => c.id))}
                    className="text-[11px] text-primary hover:underline"
                  >
                    Select All
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCourseIdsForStudent([])}
                    className="text-[11px] text-gray-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {courses.map(course => {
                  const isChecked = selectedCourseIdsForStudent.includes(course.id);
                  return (
                    <label
                      key={course.id}
                      className={cn(
                        "p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all",
                        isChecked 
                          ? "bg-emerald-50/70 border-emerald-300 text-gray-900" 
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100/60"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCourseForStudent(course.id)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-gray-300"
                        />
                        <div>
                          <div className="font-bold text-xs">{course.title}</div>
                          <div className="text-[10px] text-gray-400">{course.category} • {course.price}</div>
                        </div>
                      </div>

                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                        isChecked ? "bg-emerald-200/60 text-emerald-900" : "bg-gray-200 text-gray-600"
                      )}>
                        {isChecked ? 'Unlocked' : 'Locked'}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/95 transition-all shadow-sm"
                >
                  Save & Apply Unlocks ({selectedCourseIdsForStudent.length} Courses)
                </button>
                <button
                  type="button"
                  onClick={() => setCourseAssigningStudent(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Portal Preview Modal for Admin */}
      <StudentLoginModal
        isOpen={previewStudentModal}
        onClose={() => setPreviewStudentModal(false)}
      />

      {/* Course Exam Test Modal for Admin */}
      <CourseExamModal
        isOpen={examTestModal.open}
        onClose={() => {
          setExamTestModal(prev => ({ ...prev, open: false }));
          setExamHistory(getExamResultsHistory());
          setCertificates(getCertificatesRegistry());
        }}
        courseId={examTestModal.courseId}
        courseTitle={examTestModal.courseTitle}
      />

    </div>
  );
}
