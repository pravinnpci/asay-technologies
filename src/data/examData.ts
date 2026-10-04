import { registerNewCertificate, VerifiedCertificate } from './coursesData';

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseExam {
  courseId: string;
  courseTitle: string;
  durationMinutes: number;
  passingPercentage: number;
  questions: ExamQuestion[];
}

export interface ExamResult {
  studentName: string;
  studentEmail?: string;
  courseId: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  grade: string;
  submittedAt: string;
  certificateId?: string;
}

export const courseExams: Record<string, CourseExam> = {
  'python-automation': {
    courseId: 'python-automation',
    courseTitle: 'Python Full-Stack & Cloud Automation Masterclass',
    durationMinutes: 15,
    passingPercentage: 70,
    questions: [
      {
        id: 'py-q1',
        question: 'Which FastAPI decorator is used to define an asynchronous HTTP POST endpoint?',
        options: ['@app.route("/", methods=["POST"])', '@app.post("/")', '@app.endpoint("POST", "/")', '@app.send_post("/")'],
        correctIndex: 1,
        explanation: 'In FastAPI, endpoints are created using method-specific decorators like @app.post("/"), @app.get("/"), etc.'
      },
      {
        id: 'py-q2',
        question: 'What is the primary benefit of Python List Comprehensions over traditional for-loops?',
        options: ['They always use zero memory', 'More concise, expressive syntax with C-level iteration performance', 'They automatically run in multiple CPU threads', 'They convert lists to immutable tuples'],
        correctIndex: 1,
        explanation: 'List comprehensions are idiomatic, concise, and run with optimized C-loop bytecodes in CPython.'
      },
      {
        id: 'py-q3',
        question: 'In Selenium test automation, which explicit wait class is recommended to wait for element visibility?',
        options: ['Thread.sleep()', 'WebDriverWait combined with expected_conditions', 'time.sleep(10)', 'window.setInterval()'],
        correctIndex: 1,
        explanation: 'WebDriverWait paired with expected_conditions provides robust, dynamic waits without flaky hardcoded sleeps.'
      },
      {
        id: 'py-q4',
        question: 'Which tool is best suited for scheduled automated Python tasks running in Linux / Docker?',
        options: ['Cron / APScheduler', 'Microsoft Word', 'Windows Notepad', 'Manual terminal typing'],
        correctIndex: 0,
        explanation: 'Linux Crontab and Python APScheduler are standard tools for executing periodic background automation jobs.'
      },
      {
        id: 'py-q5',
        question: 'What command compiles Python source dependencies from a standard lock file?',
        options: ['pip install -r requirements.txt', 'python --install-all', 'npm start dependencies', 'pip build setup.exe'],
        correctIndex: 0,
        explanation: 'pip install -r requirements.txt is the universal command to install dependencies specified in requirements files.'
      }
    ]
  },
  'java-enterprise': {
    courseId: 'java-enterprise',
    courseTitle: 'Java Full-Stack & Spring Boot Microservices Masterclass',
    durationMinutes: 15,
    passingPercentage: 70,
    questions: [
      {
        id: 'jv-q1',
        question: 'What does the @RestController annotation signify in Spring Boot 3?',
        options: ['It disables REST endpoints', 'Combines @Controller and @ResponseBody to automatically serialize JSON responses', 'Forces SOAP XML responses', 'Creates a Swing GUI window'],
        correctIndex: 1,
        explanation: '@RestController is a convenience annotation that bundles @Controller and @ResponseBody together.'
      },
      {
        id: 'jv-q2',
        question: 'Which Spring Data JPA interface provides built-in pagination, sorting, and CRUD methods?',
        options: ['JpaRepository', 'ThreadRepository', 'FileSystemRepository', 'NativeQueryInterface'],
        correctIndex: 0,
        explanation: 'JpaRepository extends PagingAndSortingRepository and CrudRepository to provide complete database abstractions.'
      },
      {
        id: 'jv-q3',
        question: 'In Java 21, what major feature facilitates lightweight high-throughput concurrency?',
        options: ['Virtual Threads (Project Loom)', 'Applets', 'Flash Player', 'Raw Pointer Arithmetic'],
        correctIndex: 0,
        explanation: 'Virtual Threads in Java 21 enable massive concurrency without the OS thread overhead.'
      },
      {
        id: 'jv-q4',
        question: 'How do Spring Boot Microservices discover each other in a cloud cluster?',
        options: ['Hardcoded IP text files', 'Service Registry like Eureka, Consul, or Kubernetes DNS', 'Manual phone calls', 'USB flash drives'],
        correctIndex: 1,
        explanation: 'Eureka, Consul, and Kubernetes Service DNS provide dynamic service discovery and load balancing.'
      },
      {
        id: 'jv-q5',
        question: 'Which Maven command packages a Spring Boot application into an executable JAR?',
        options: ['mvn clean package', 'mvn delete-all', 'javac *.java -jar', 'npm run build'],
        correctIndex: 0,
        explanation: 'mvn clean package compiles code and builds the runnable fat JAR using the spring-boot-maven-plugin.'
      }
    ]
  },
  'devops-kubernetes': {
    courseId: 'devops-kubernetes',
    courseTitle: 'Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines',
    durationMinutes: 15,
    passingPercentage: 70,
    questions: [
      {
        id: 'do-q1',
        question: 'Why are Docker Multi-Stage builds considered a best practice for production images?',
        options: ['They make images 10x larger', 'They separate build dependencies from the final minimal runtime image', 'They only run on Windows', 'They disable caching'],
        correctIndex: 1,
        explanation: 'Multi-stage builds leave behind compilers, SDKs, and build artifacts, resulting in lean, secure images.'
      },
      {
        id: 'do-q2',
        question: 'In Kubernetes, what controller manages stateless scalable Pod replicas and rolling updates?',
        options: ['StatefulSet', 'Deployment', 'ConfigMap', 'DaemonJob'],
        correctIndex: 1,
        explanation: 'Kubernetes Deployments manage ReplicaSets to ensure declarative Pod scaling and zero-downtime rolling upgrades.'
      },
      {
        id: 'do-q3',
        question: 'What is Helm in the Kubernetes ecosystem?',
        options: ['A database engine', 'A package manager and templating engine for Kubernetes manifests', 'An alternative Linux kernel', 'A hardware router'],
        correctIndex: 1,
        explanation: 'Helm is the de-facto package manager for K8s that packages complex configurations into reusable Charts.'
      },
      {
        id: 'do-q4',
        question: 'What GitOps tool automatically syncs Kubernetes cluster state with a Git repository?',
        options: ['ArgoCD or Flux', 'MS Paint', 'Photoshop', 'VLC Player'],
        correctIndex: 0,
        explanation: 'ArgoCD and Flux continuously monitor Git repositories and synchronize changes to Kubernetes clusters.'
      },
      {
        id: 'do-q5',
        question: 'Which file defines automated CI/CD workflows in GitHub Actions?',
        options: ['package.json', '.github/workflows/*.yml', 'pom.xml', 'docker-compose.env'],
        correctIndex: 1,
        explanation: 'GitHub Actions parses YAML workflow definitions inside the .github/workflows directory.'
      }
    ]
  }
};

// Fallback generator for other courses
export function getExamForCourse(courseId: string, courseTitle?: string): CourseExam {
  if (courseExams[courseId]) {
    return courseExams[courseId];
  }

  // Universal enterprise exam template
  return {
    courseId,
    courseTitle: courseTitle || 'Enterprise Technology Masterclass',
    durationMinutes: 15,
    passingPercentage: 70,
    questions: [
      {
        id: `${courseId}-q1`,
        question: `What is the primary architectural principle of modern ${courseTitle || 'software'} development?`,
        options: ['Monolithic tightly-coupled architecture', 'Modular, testable, and cloud-native decoupled design', 'Storing passwords in plain text', 'Avoiding version control'],
        correctIndex: 1,
        explanation: 'Decoupled, modular architectures enable high availability, clean testability, and fast deployment cycles.'
      },
      {
        id: `${courseId}-q2`,
        question: 'Which practice ensures code quality and early detection of bugs before production?',
        options: ['Continuous Integration (CI) with automated testing', 'Deploying on Friday midnight without tests', 'Disabling log outputs', 'Ignoring compiler warnings'],
        correctIndex: 0,
        explanation: 'Automated CI pipelines run linting, unit tests, and security scans on every pull request.'
      },
      {
        id: `${courseId}-q3`,
        question: 'How should enterprise secrets, API keys, and database passwords be managed?',
        options: ['Committed directly to public GitHub repos', 'Injected via Environment Variables or Secret Vaults (AWS Secrets Manager/Vault)', 'Hardcoded in client-side HTML', 'Emailed to all colleagues'],
        correctIndex: 1,
        explanation: 'Environment variables and dedicated key vaults safeguard credentials away from source code.'
      },
      {
        id: `${courseId}-q4`,
        question: 'What is the role of an ISO 9001:2015 Quality Management System (QMS) in software development?',
        options: ['Slowing down engineering teams', 'Ensuring consistent, verifiable quality standards, customer satisfaction, and continuous process improvement', 'Eliminating all code reviews', 'Mandating specific text editors'],
        correctIndex: 1,
        explanation: 'ISO 9001:2015 provides a globally recognized framework for operational rigor, quality delivery, and customer trust.'
      },
      {
        id: `${courseId}-q5`,
        question: 'What is the recommended approach for deploying applications with zero downtime?',
        options: ['Shutting down the server for 4 hours', 'Rolling updates, Blue-Green deployments, or Canary releases', 'Deleting the database before every update', 'Reinstalling the operating system manually'],
        correctIndex: 1,
        explanation: 'Rolling deployments and Blue-Green strategies allow seamless traffic routing without user service interruption.'
      }
    ]
  };
}

const EXAM_RESULTS_STORAGE_KEY = 'asai_exam_results_history';

export function getExamResultsHistory(): ExamResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(EXAM_RESULTS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return [
    {
      studentName: 'Karthik Subramanian',
      courseId: 'python-automation',
      courseTitle: 'Python Full-Stack & Cloud Automation Masterclass',
      score: 5,
      totalQuestions: 5,
      percentage: 100,
      passed: true,
      grade: 'A+ (Distinction)',
      submittedAt: 'Oct 01, 2026',
      certificateId: 'ASAI-2026-PY-1082'
    },
    {
      studentName: 'Priya Dharshini',
      courseId: 'java-enterprise',
      courseTitle: 'Java Full-Stack & Spring Boot Microservices Masterclass',
      score: 4,
      totalQuestions: 5,
      percentage: 80,
      passed: true,
      grade: 'A (Excellence)',
      submittedAt: 'Sep 28, 2026',
      certificateId: 'ASAI-2026-JV-2041'
    }
  ];
}

export function submitExamAndIssueCertificate(
  studentName: string,
  courseId: string,
  courseTitle: string,
  score: number,
  totalQuestions: number
): { result: ExamResult; certificate?: VerifiedCertificate } {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;
  
  let grade = 'B (Satisfactory)';
  if (percentage >= 95) grade = 'A+ (Distinction)';
  else if (percentage >= 85) grade = 'A (Excellence)';
  else if (percentage >= 75) grade = 'A- (Very Good)';
  else if (percentage >= 70) grade = 'B+ (Good)';

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const courseCode = courseId.slice(0, 3).toUpperCase();
  const certId = `ASAI-2026-${courseCode}-${randomSuffix}`;

  let certificate: VerifiedCertificate | undefined;

  if (passed) {
    certificate = {
      certificateId: certId,
      studentName: studentName.trim(),
      courseTitle,
      issueDate: dateStr,
      grade,
      status: 'VERIFIED_ACTIVE',
      credentialUrl: `https://asayinfotech.in/verify?cert_id=${certId}`,
      skillsAcquired: [
        'Hands-on Architecture',
        'ISO 9001:2015 Evaluated Assessment',
        'Practical Capstone Implementation',
        'Industry Readiness Certification'
      ],
      internshipCompleted: true
    };

    registerNewCertificate(certificate);
  }

  const result: ExamResult = {
    studentName,
    courseId,
    courseTitle,
    score,
    totalQuestions,
    percentage,
    passed,
    grade,
    submittedAt: dateStr,
    certificateId: passed ? certId : undefined
  };

  if (typeof window !== 'undefined') {
    const history = getExamResultsHistory();
    history.unshift(result);
    localStorage.setItem(EXAM_RESULTS_STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new CustomEvent('asai-exam-submitted', { detail: result }));
  }

  return { result, certificate };
}
