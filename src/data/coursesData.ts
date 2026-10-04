export interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeId?: string;
  isPreview: boolean; // true = Free Preview, false = Members Only
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: 'Python' | 'Java' | 'Web Development' | 'DevOps & Cloud' | 'Data & AI' | 'Testing & QA' | 'Cybersecurity' | string;
  tagline: string;
  description: string;
  level: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  studentsEnrolled: number;
  price: string;
  originalPrice: string;
  badge?: string;
  liveBatch: {
    timing: string;
    days: string;
    mode: string;
    nextBatchDate: string;
    mentor: string;
  };
  certification: {
    title: string;
    isoCode: string;
    features: string[];
  };
  skills: string[];
  modules: Module[];
  outcomes: string[];
}

export interface VerifiedCertificate {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  status: 'VERIFIED_ACTIVE' | 'REVOKED';
  credentialUrl: string;
  skillsAcquired: string[];
  internshipCompleted: boolean;
}

export interface StudentEnrollment {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  collegeOrCompany: string;
  courseId: string;
  courseTitle: string;
  amount: string;
  utrOrReference: string;
  enrolledAt: string;
  status: 'PENDING_APPROVAL' | 'APPROVED_UNLOCKED';
  username?: string;
  password?: string;
  unlockedCourses?: string[];
}

export interface StudentCourseStatus {
  courseId: string;
  courseTitle: string;
  category: string;
  price: string;
  isUnlocked: boolean;
  isPending: boolean;
  enrolledAt?: string;
  utrOrReference?: string;
}

export const paymentConfig = {
  upiId: 'asayinfotech@okaxis',
  gpayPhone: '+91 6382907182',
  accountHolder: 'ASAI INFOTECH PRIVATE LIMITED',
  bankName: 'Axis Bank / HDFC Bank',
  notes: 'Pay using Google Pay, PhonePe, Paytm or any UPI App to +91 6382907182 or asayinfotech@okaxis. Enter UTR / Transaction Reference ID.'
};

export const coursesData: Course[] = [
  // 1. Python Full-Stack & Automation
  {
    id: 'python-automation',
    title: 'Python Full-Stack & Cloud Automation Masterclass',
    category: 'Python',
    tagline: 'Zero to Job-Ready Python, Automation Scripting, Web Frameworks & AWS Cloud',
    description: 'Master practical Python programming with hands-on automation projects. Learn real-world scripting, FastAPI backend services, web scraping, and automated cloud workflows used by modern tech enterprises.',
    level: 'Beginner to Advanced',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.9,
    reviewsCount: 148,
    studentsEnrolled: 520,
    price: '₹1,999',
    originalPrice: '₹5,999',
    badge: 'Bestseller',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Live Doubt Clearing)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'Senior Software Engineer, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Quality Certified Python Automation Professional',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Experience',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Direct LinkedIn Credential Addition with Unique Certificate ID',
        'Hands-on Capstone Project Repository & Code Review'
      ]
    },
    skills: ['Python 3.12', 'Automation Scripts', 'FastAPI', 'Pandas & Automation', 'Selenium/Requests', 'Docker & AWS Basics'],
    modules: [
      {
        id: 'py-m1',
        title: 'Module 1: Python Fundamentals & Dev Environment Setup',
        lessons: [
          {
            id: 'py-l1',
            title: '1.1 Welcome & Introduction to Python & Real-world Automation (Free Preview)',
            duration: '22 mins',
            youtubeId: 'kqtD5dpn9C8',
            isPreview: true,
            description: 'Learn why Python is the #1 automation language and how top IT companies use it for infrastructure and backend engineering.'
          },
          {
            id: 'py-l2',
            title: '1.2 Variables, Data Types, Memory Layout & Dynamic Typing',
            duration: '28 mins',
            isPreview: false,
            description: 'Deep dive into Python primitive data types, type casting, and best practices.'
          },
          {
            id: 'py-l3',
            title: '1.3 Conditional Logic, Loops & Control Flow Optimization',
            duration: '35 mins',
            isPreview: false,
            description: 'If-else statements, while/for loops, break, continue, and list comprehensions.'
          }
        ]
      },
      {
        id: 'py-m2',
        title: 'Module 2: Real-World Scripting & File Automation',
        lessons: [
          {
            id: 'py-l4',
            title: '2.1 Automated File Handling, CSV/Excel Data Parsing with Pandas',
            duration: '42 mins',
            isPreview: false,
            description: 'Automate Excel report generation, folder cleanups, and bulk file renaming with Python OS modules.'
          },
          {
            id: 'py-l5',
            title: '2.2 Web Scraping & REST API Consumption with Requests & BeautifulSoup',
            duration: '45 mins',
            isPreview: false,
            description: 'Extract web data automatically and build custom data pipelines.'
          }
        ]
      },
      {
        id: 'py-m3',
        title: 'Module 3: FastAPI Backend & Cloud Deployment',
        lessons: [
          {
            id: 'py-l6',
            title: '3.1 Building Production REST APIs with FastAPI & Pydantic',
            duration: '50 mins',
            isPreview: false,
            description: 'Construct enterprise-ready asynchronous APIs with OpenAPI Swagger docs.'
          },
          {
            id: 'py-l7',
            title: '3.2 Dockerizing Python Apps & Deploying to AWS Cloud',
            duration: '48 mins',
            isPreview: false,
            description: 'Containerize and publish your microservice to live public servers.'
          }
        ]
      }
    ],
    outcomes: [
      'Write production Python automation scripts from scratch',
      'Build and deploy RESTful APIs using FastAPI and Docker',
      'Automate repetitive Excel, file, and web scraping tasks',
      'Earn an official ISO 9001:2015 verified credential with QR code'
    ]
  },

  // 2. Java Full-Stack & Microservices
  {
    id: 'java-enterprise',
    title: 'Java Full-Stack & Spring Boot Microservices Masterclass',
    category: 'Java',
    tagline: 'Enterprise Java 21, Spring Boot 3, Hibernate JPA, PostgreSQL & Microservices',
    description: 'Transform into an Enterprise Java Developer. Master object-oriented programming, Spring Boot microservice architectures, secure JWT authentication, and distributed system design.',
    level: 'Intermediate to Advanced',
    duration: '8 Weeks (Daily 1 Hr)',
    rating: 4.95,
    reviewsCount: 182,
    studentsEnrolled: 640,
    price: '₹2,499',
    originalPrice: '₹7,999',
    badge: 'Enterprise Standard',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Code Review)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'Principal Architect, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Quality Certified Enterprise Java Architect',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Experience',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Production Microservices Capstone Code Review',
        'Placement Assistance with Top MNC Interview Questions'
      ]
    },
    skills: ['Java 21 LTS', 'Spring Boot 3', 'Spring Data JPA', 'RESTful Microservices', 'PostgreSQL', 'Docker Containers', 'Kafka Basics'],
    modules: [
      {
        id: 'jv-m1',
        title: 'Module 1: Modern Java Core & OOP Architecture',
        lessons: [
          {
            id: 'jv-l1',
            title: '1.1 Java 21 Modern Syntax, Records, Virtual Threads & JVM Internals (Free Preview)',
            duration: '30 mins',
            youtubeId: 'A74TOX803D0',
            isPreview: true,
            description: 'Understand JVM execution architecture, memory model, and modern Java syntax features.'
          },
          {
            id: 'jv-l2',
            title: '1.2 Advanced OOP: Polymorphism, Interfaces & Clean Architecture Patterns',
            duration: '45 mins',
            isPreview: false,
            description: 'Apply SOLID principles and design patterns in real-world Java applications.'
          }
        ]
      },
      {
        id: 'jv-m2',
        title: 'Module 2: Spring Boot 3 Microservices & Hibernate',
        lessons: [
          {
            id: 'jv-l3',
            title: '2.1 Spring Boot REST APIs, Dependency Injection & Spring Data JPA',
            duration: '52 mins',
            isPreview: false,
            description: 'Build enterprise data layer with Spring Boot, PostgreSQL, and Hibernate ORM.'
          },
          {
            id: 'jv-l4',
            title: '2.2 Microservices Communication, API Gateway & JWT Security',
            duration: '55 mins',
            isPreview: false,
            description: 'Implement distributed authentication, routing, and inter-service REST calls.'
          }
        ]
      }
    ],
    outcomes: [
      'Architect robust backend microservices with Spring Boot 3 and Java 21',
      'Design secure relational databases with Hibernate and PostgreSQL',
      'Implement industry-grade security using Spring Security and JWT',
      'Receive ISO 9001:2015 verified credential recognized by corporate recruiters'
    ]
  },

  // 3. MERN Full-Stack Web Development
  {
    id: 'mern-fullstack',
    title: 'MERN Full-Stack Web Development & Cloud Deployment',
    category: 'Web Development',
    tagline: 'MongoDB, Express.js, React 19, Node.js & Full-Stack Production Deployment',
    description: 'Build dynamic modern web applications from end to end. Master modern React with TypeScript, scalable Node.js/Express REST APIs, MongoDB data modeling, and automated cloud CI/CD.',
    level: 'Beginner to Advanced',
    duration: '8 Weeks (Daily 1 Hr)',
    rating: 4.9,
    reviewsCount: 165,
    studentsEnrolled: 580,
    price: '₹2,199',
    originalPrice: '₹6,999',
    badge: 'High Demand',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Project Building)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'Full-Stack Lead Engineer, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Full-Stack Web Engineer',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Letter',
        'Live Portfolio Project Deployed on Cloud',
        'Instant QR Code Verification for Recruiters',
        'Full Source Code Access on GitHub'
      ]
    },
    skills: ['React 19', 'Node.js', 'Express.js', 'MongoDB / Mongoose', 'TypeScript', 'Tailwind CSS', 'JWT Authentication', 'Vercel / Render'],
    modules: [
      {
        id: 'mern-m1',
        title: 'Module 1: Modern JavaScript ES6+ & React 19 Fundamentals',
        lessons: [
          {
            id: 'mern-l1',
            title: '1.1 Modern Web Architecture & Full-Stack Roadmap (Free Preview)',
            duration: '26 mins',
            youtubeId: '7CqJlxBYj-M',
            isPreview: true,
            description: 'Introduction to client-server architecture, modern JavaScript runtime, and full-stack project workflow.'
          },
          {
            id: 'mern-l2',
            title: '1.2 React 19 State, Hooks, Component Lifecycle & Tailwind Styling',
            duration: '45 mins',
            isPreview: false,
            description: 'Deep dive into modern component architectures and state management.'
          }
        ]
      },
      {
        id: 'mern-m2',
        title: 'Module 2: Node.js, Express & MongoDB Backend Engineering',
        lessons: [
          {
            id: 'mern-l3',
            title: '2.1 Building RESTful APIs with Node.js, Express & TypeScript',
            duration: '50 mins',
            isPreview: false,
            description: 'Implement modular routing, middleware, controllers, and error handling.'
          },
          {
            id: 'mern-l4',
            title: '2.2 MongoDB Schema Design, Indexes & Full Stack Integration',
            duration: '54 mins',
            isPreview: false,
            description: 'Connect React frontend with Express backend, JWT auth, and cloud database.'
          }
        ]
      }
    ],
    outcomes: [
      'Build production SaaS applications using MongoDB, Express, React, and Node.js',
      'Implement secure user authentication with JWT and bcrypt',
      'Deploy full-stack applications with automated CI/CD to modern cloud hosting',
      'Earn an ISO 9001:2015 accredited qualification with dynamic QR validation'
    ]
  },

  // 4. Cloud DevOps & Kubernetes
  {
    id: 'devops-kubernetes',
    title: 'Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines',
    category: 'DevOps & Cloud',
    tagline: 'Containerization, Kubernetes Cluster Orchestration, Helm, GitOps & Automation',
    description: 'Learn enterprise DevOps engineering. Containerize applications with Docker, orchestrate scalable microservices with Kubernetes, write Helm charts, and build automated GitHub Actions CI/CD pipelines.',
    level: 'Intermediate to Advanced',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.95,
    reviewsCount: 135,
    studentsEnrolled: 470,
    price: '₹2,499',
    originalPrice: '₹7,999',
    badge: 'Trending Career',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Real Cloud Cluster Labs)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'DevOps & Cloud Architect, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Quality Certified Cloud DevOps Engineer',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Experience',
        'Hands-on Multi-Node Kubernetes Lab Environments',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'GitOps & CI/CD Pipeline Portfolio'
      ]
    },
    skills: ['Docker', 'Kubernetes (K8s)', 'Helm Charts', 'GitHub Actions', 'Linux Bash', 'Prometheus & Grafana', 'Terraform Basics'],
    modules: [
      {
        id: 'dev-m1',
        title: 'Module 1: Containerization with Docker & Compose',
        lessons: [
          {
            id: 'dev-l1',
            title: '1.1 Docker Containers Architecture & Multi-Stage Builds (Free Preview)',
            duration: '25 mins',
            youtubeId: 'X48VuDVv0do',
            isPreview: true,
            description: 'Why containers revolutionized IT: container vs VM, writing efficient Dockerfiles, and layer caching.'
          },
          {
            id: 'dev-l2',
            title: '1.2 Multi-Service Microservice Orchestration with Docker Compose',
            duration: '38 mins',
            isPreview: false,
            description: 'Manage backend, frontend, database, and Redis cache with single-command Compose stacks.'
          }
        ]
      },
      {
        id: 'dev-m2',
        title: 'Module 2: Kubernetes Orchestration & GitOps CI/CD',
        lessons: [
          {
            id: 'dev-l3',
            title: '2.1 Kubernetes Architecture: Pods, Deployments, Services & Ingress',
            duration: '52 mins',
            isPreview: false,
            description: 'Deploy zero-downtime rolling updates with K8s manifests.'
          },
          {
            id: 'dev-l4',
            title: '2.2 Automated CI/CD Pipelines with GitHub Actions & Helm',
            duration: '48 mins',
            isPreview: false,
            description: 'Automate code build, Docker image scan, push to registry, and cluster deployment.'
          }
        ]
      }
    ],
    outcomes: [
      'Containerize any legacy or modern application with production Dockerfiles',
      'Manage real Kubernetes clusters with Deployments, Services, and Ingress routing',
      'Build end-to-end continuous integration and deployment pipelines',
      'Earn an ISO 9001:2015 verified certificate with verifiable QR registry link'
    ]
  },

  // 5. AWS Solutions Architect & Cloud Engineering
  {
    id: 'aws-cloud-architect',
    title: 'AWS Solutions Architect & Cloud Engineering Masterclass',
    category: 'DevOps & Cloud',
    tagline: 'Amazon Web Services (AWS) EC2, S3, RDS, Lambda, VPC, IAM & CloudFormation',
    description: 'Master Amazon Web Services from foundational networking to high-availability enterprise cloud architectures. Prepare for AWS Solutions Architect Associate certification with hands-on labs.',
    level: 'Beginner to Advanced',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.92,
    reviewsCount: 110,
    studentsEnrolled: 410,
    price: '₹2,299',
    originalPrice: '₹6,999',
    badge: 'Industry Standard',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + AWS Hands-on Labs)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'AWS Certified Solutions Architect, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Cloud Solutions Architect',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Experience',
        'Official AWS Well-Architected Framework Case Studies',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Cloud Cost Optimization & Security Auditing Skills'
      ]
    },
    skills: ['AWS EC2 & Auto Scaling', 'Amazon S3 & CloudFront', 'VPC & Networking', 'IAM Security', 'AWS Lambda Serverless', 'RDS & DynamoDB', 'Route 53'],
    modules: [
      {
        id: 'aws-m1',
        title: 'Module 1: AWS Core Compute, Storage & Networking',
        lessons: [
          {
            id: 'aws-l1',
            title: '1.1 AWS Cloud Global Infrastructure & Compute Overview (Free Preview)',
            duration: '28 mins',
            youtubeId: 'ulprqHHWlng',
            isPreview: true,
            description: 'Explore AWS Regions, Availability Zones, EC2 instance families, and cloud storage.'
          },
          {
            id: 'aws-l2',
            title: '1.2 Virtual Private Cloud (VPC), Subnets, Route Tables & Security Groups',
            duration: '45 mins',
            isPreview: false,
            description: 'Design secure, isolated cloud networks with public/private subnet architectures.'
          }
        ]
      },
      {
        id: 'aws-m2',
        title: 'Module 2: Serverless, Managed Databases & High Availability',
        lessons: [
          {
            id: 'aws-l3',
            title: '2.1 Managed Databases with RDS, DynamoDB & S3 Static Website Hosting',
            duration: '42 mins',
            isPreview: false,
            description: 'Deploy relational and NoSQL databases with automated backups and multi-AZ replication.'
          },
          {
            id: 'aws-l4',
            title: '2.2 Serverless Computing with AWS Lambda, API Gateway & EventBridge',
            duration: '48 mins',
            isPreview: false,
            description: 'Build zero-server backend solutions with pay-per-request pricing.'
          }
        ]
      }
    ],
    outcomes: [
      'Design fault-tolerant and highly scalable cloud systems on AWS',
      'Implement enterprise cloud security using IAM, VPCs, and encryption keys',
      'Confidently sit for the AWS Certified Solutions Architect Associate exam',
      'Earn an official ISO 9001:2015 verified credential'
    ]
  },

  // 6. Data Science, Machine Learning & GenAI
  {
    id: 'data-science-ai',
    title: 'Data Science, Machine Learning & Generative AI Masterclass',
    category: 'Data & AI',
    tagline: 'Python, NumPy, Pandas, Scikit-Learn, Deep Learning & LLM Generative AI',
    description: 'Enter the era of Artificial Intelligence. Learn data preprocessing, statistical analysis, predictive machine learning models, neural networks, and modern Generative AI / RAG implementations.',
    level: 'Beginner to Advanced',
    duration: '8 Weeks (Daily 1 Hr)',
    rating: 4.96,
    reviewsCount: 155,
    studentsEnrolled: 530,
    price: '₹2,499',
    originalPrice: '₹8,499',
    badge: 'Future Tech',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Jupyter Notebooks)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'AI/ML Lead Scientist, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Data Scientist & AI Engineer',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Letter',
        'End-to-End Predictive Model Deployment on Streamlit & HuggingFace',
        'Instant QR Code Verification for Recruiters',
        'Industry Case Studies: Churn Prediction, Sentiment & RAG Agents'
      ]
    },
    skills: ['Python for Data Science', 'Pandas & NumPy', 'Matplotlib/Seaborn', 'Scikit-Learn', 'Linear/Logistic Regression', 'Generative AI & LLMs', 'LangChain Basics'],
    modules: [
      {
        id: 'ds-m1',
        title: 'Module 1: Exploratory Data Analysis & Statistical Modeling',
        lessons: [
          {
            id: 'ds-l1',
            title: '1.1 Data Science Roadmap & Python Data Stack Introduction (Free Preview)',
            duration: '27 mins',
            youtubeId: 'JMUxmLyrhSk',
            isPreview: true,
            description: 'Overview of the data lifecycle, setting up Jupyter lab, and exploratory data analysis with Pandas.'
          },
          {
            id: 'ds-l2',
            title: '1.2 Data Cleaning, Feature Engineering & Statistical Visualization',
            duration: '46 mins',
            isPreview: false,
            description: 'Handle missing data, outliers, normalization, and informative visualizations.'
          }
        ]
      },
      {
        id: 'ds-m2',
        title: 'Module 2: Machine Learning Algorithms & GenAI Applications',
        lessons: [
          {
            id: 'ds-l3',
            title: '2.1 Supervised & Unsupervised Machine Learning with Scikit-Learn',
            duration: '52 mins',
            isPreview: false,
            description: 'Train classification, regression, and clustering algorithms with cross-validation.'
          },
          {
            id: 'ds-l4',
            title: '2.2 Generative AI, Prompt Engineering & Building LLM Chatbots with LangChain',
            duration: '50 mins',
            isPreview: false,
            description: 'Integrate open-source and OpenAI models with Retrieval-Augmented Generation (RAG).'
          }
        ]
      }
    ],
    outcomes: [
      'Extract actionable insights from raw data using Pandas and statistical modeling',
      'Train, evaluate, and tune production-ready Machine Learning models',
      'Build generative AI assistants and RAG applications with modern LLMs',
      'Obtain an accredited ISO 9001:2015 credential with online QR verification'
    ]
  },

  // 7. Automation Testing & QA Masterclass
  {
    id: 'qa-automation',
    title: 'Automation Testing & Software QA Masterclass (Selenium, Playwright & API)',
    category: 'Testing & QA',
    tagline: 'Manual to Automation Testing, Selenium WebDriver, Playwright, Postman API & CI/CD',
    description: 'Supercharge your software QA career. Learn the complete testing lifecycle: manual testing fundamentals, web automation with Selenium and Playwright, REST API testing with Postman, and CI/CD test automation.',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.88,
    reviewsCount: 124,
    studentsEnrolled: 430,
    price: '₹1,999',
    originalPrice: '₹5,999',
    badge: 'High Placement',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Real Framework Labs)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'QA Automation Lead, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Test Automation Specialist',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day QA Internship Letter',
        'End-to-End Automation Framework Repository on GitHub',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Preparation for ISTQB Certified Tester Concepts'
      ]
    },
    skills: ['Selenium WebDriver', 'Playwright', 'TestNG / PyTest', 'Postman API Automation', 'Cucumber BDD', 'Jira / Agile QA', 'GitHub Actions Test CI'],
    modules: [
      {
        id: 'qa-m1',
        title: 'Module 1: QA Foundations & Web Automation with Selenium',
        lessons: [
          {
            id: 'qa-l1',
            title: '1.1 Software Testing Life Cycle (STLC) & Modern QA Automation Intro (Free Preview)',
            duration: '24 mins',
            youtubeId: 'FRn5J31eAMw',
            isPreview: true,
            description: 'Understanding manual vs automated testing, writing test cases, and locator strategies.'
          },
          {
            id: 'qa-l2',
            title: '1.2 Selenium WebDriver Architecture, XPath Strategies & Dynamic Waits',
            duration: '42 mins',
            isPreview: false,
            description: 'Automate complex web interactions, dropdowns, alerts, and iframe elements.'
          }
        ]
      },
      {
        id: 'qa-m2',
        title: 'Module 2: Playwright, REST API Automation & CI Integration',
        lessons: [
          {
            id: 'qa-l3',
            title: '2.1 Next-Gen End-to-End Testing with Microsoft Playwright',
            duration: '48 mins',
            isPreview: false,
            description: 'Automate fast modern single-page apps with Playwright auto-waits and trace viewer.'
          },
          {
            id: 'qa-l4',
            title: '2.2 API Automation with Postman / Newman & Continuous Test Execution in CI',
            duration: '44 mins',
            isPreview: false,
            description: 'Validate HTTP status codes, JSON response schemas, and run tests automatically on git push.'
          }
        ]
      }
    ],
    outcomes: [
      'Build robust Page Object Model (POM) test automation frameworks',
      'Automate web applications using Selenium WebDriver and Microsoft Playwright',
      'Validate backend REST APIs using Postman and Newman scripts',
      'Earn an ISO 9001:2015 quality certified qualification with QR code verification'
    ]
  },

  // 8. Cybersecurity & Ethical Hacking
  {
    id: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity, SOC Analysis & Ethical Hacking Defense',
    category: 'Cybersecurity',
    tagline: 'Network Security, Vulnerability Assessment, Kali Linux, Web App Pen Testing & SOC',
    description: 'Learn ethical cybersecurity practices to defend enterprise infrastructure. Understand penetration testing methodologies, Kali Linux security tools, OWASP Top 10 web vulnerabilities, and security operations center (SOC) analysis.',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.93,
    reviewsCount: 118,
    studentsEnrolled: 390,
    price: '₹2,499',
    originalPrice: '₹7,999',
    badge: 'High Security',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Virtual Lab Drills)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'Cybersecurity Engineer, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Cyber Defense & Ethical Hacking Professional',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Cybersecurity Internship Experience',
        'Ethical Security Audit & Vulnerability Assessment Report Portfolio',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Adherence to ISO 27001 Information Security Guidelines'
      ]
    },
    skills: ['Network Security & Wireshark', 'Kali Linux', 'Nmap & Metasploit', 'OWASP Top 10', 'Burp Suite', 'SOC SIEM Fundamentals', 'Cryptography'],
    modules: [
      {
        id: 'sec-m1',
        title: 'Module 1: Ethical Security Foundations & Network Reconnaissance',
        lessons: [
          {
            id: 'sec-l1',
            title: '1.1 Introduction to Ethical Hacking, Cyber Defense & Legal Frameworks (Free Preview)',
            duration: '28 mins',
            youtubeId: '3Kq1MIfTWCE',
            isPreview: true,
            description: 'Fundamentals of ethical hacking, threat landscapes, CIA triad, and vulnerability lifecycle.'
          },
          {
            id: 'sec-l2',
            title: '1.2 Network Reconnaissance, Port Scanning with Nmap & Traffic Analysis with Wireshark',
            duration: '45 mins',
            isPreview: false,
            description: 'Discover active network hosts, service banners, and inspect unencrypted protocols.'
          }
        ]
      },
      {
        id: 'sec-m2',
        title: 'Module 2: Web Application Security & Vulnerability Auditing',
        lessons: [
          {
            id: 'sec-l3',
            title: '2.1 OWASP Top 10 Web Vulnerabilities & Exploitation Defense with Burp Suite',
            duration: '52 mins',
            isPreview: false,
            description: 'Understand SQL injection, Cross-Site Scripting (XSS), and insecure direct object references (IDOR).'
          },
          {
            id: 'sec-l4',
            title: '2.2 Security Incident Response, Log Analysis & SOC Blue Team Best Practices',
            duration: '46 mins',
            isPreview: false,
            description: 'Analyze firewall logs, detect brute-force attempts, and implement remediation controls.'
          }
        ]
      }
    ],
    outcomes: [
      'Perform structured vulnerability assessments on enterprise networks',
      'Identify and remediate OWASP Top 10 web application vulnerabilities',
      'Utilize Kali Linux, Burp Suite, and Wireshark for security analysis',
      'Receive an ISO 9001:2015 quality certified credential with QR verification'
    ]
  },

  // 9. Business Intelligence & Data Analytics (Power BI & SQL)
  {
    id: 'powerbi-sql-analytics',
    title: 'Business Intelligence & Data Analytics (Power BI, Advanced SQL & Excel)',
    category: 'Data & AI',
    tagline: 'Master Advanced SQL Queries, Interactive Power BI Dashboards, DAX & Business Metrics',
    description: 'Transform complex business data into actionable executive insights. Master advanced SQL database queries, data warehouse modeling, DAX calculations, and interactive Power BI executive reporting.',
    level: 'Beginner to Intermediate',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.91,
    reviewsCount: 142,
    studentsEnrolled: 490,
    price: '₹1,999',
    originalPrice: '₹5,999',
    badge: 'Popular Choice',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Real Corporate Datasets)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'BI Analyst & Data Consultant, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Business Intelligence & Data Analytics Specialist',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Letter',
        'Published Power BI Interactive Dashboard Portfolio',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Real Corporate Datasets (E-Commerce, Healthcare & Finance)'
      ]
    },
    skills: ['Advanced SQL (Joins, Window Functions)', 'Power BI Desktop & Service', 'DAX Formulas', 'Data Modeling (Star Schema)', 'Advanced Excel (VLOOKUP, Pivots)', 'Business KPIs'],
    modules: [
      {
        id: 'bi-m1',
        title: 'Module 1: Advanced SQL for Data Analysis & Extraction',
        lessons: [
          {
            id: 'bi-l1',
            title: '1.1 Introduction to Business Intelligence, SQL & Analytics Careers (Free Preview)',
            duration: '25 mins',
            youtubeId: 'daef8jR-xRk',
            isPreview: true,
            description: 'Role of a Data Analyst in corporate enterprises, setting up SQL environment, and basic querying.'
          },
          {
            id: 'bi-l2',
            title: '1.2 Complex SQL Joins, Aggregations, Subqueries & Window Functions',
            duration: '48 mins',
            isPreview: false,
            description: 'Write high-performance SQL to calculate running totals, rank sales, and group metrics.'
          }
        ]
      },
      {
        id: 'bi-m2',
        title: 'Module 2: Power BI Data Modeling, DAX & Executive Dashboards',
        lessons: [
          {
            id: 'bi-l3',
            title: '2.1 Power BI Desktop: Star Schema Data Modeling & Power Query ETL',
            duration: '45 mins',
            isPreview: false,
            description: 'Clean and transform messy data with Power Query, define primary-foreign key relationships.'
          },
          {
            id: 'bi-l4',
            title: '2.2 Advanced DAX Calculations, Custom Visuals & Publishing to Power BI Service',
            duration: '50 mins',
            isPreview: false,
            description: 'Calculate Year-over-Year growth, dynamic KPI cards, and publish interactive web dashboards.'
          }
        ]
      }
    ],
    outcomes: [
      'Query complex relational databases with advanced SQL window functions',
      'Build professional interactive dashboards with Power BI and DAX measures',
      'Formulate business metrics for executive-level decision making',
      'Obtain an accredited ISO 9001:2015 credential with QR code verification'
    ]
  },

  // 10. Modern Front-End Engineering & UI/UX (React 19 & Tailwind)
  {
    id: 'frontend-react-uiux',
    title: 'Modern Front-End Engineering & UI/UX (React 19, TypeScript & Tailwind)',
    category: 'Web Development',
    tagline: 'Figma to React 19, Modern TypeScript, Tailwind CSS, Motion Animations & Responsive UI',
    description: 'Become a highly skilled modern front-end engineer. Learn how to convert modern Figma designs into pixel-perfect responsive web interfaces using React 19, TypeScript, Tailwind CSS, and smooth micro-animations.',
    level: 'Beginner to Advanced',
    duration: '6 Weeks (Daily 1 Hr)',
    rating: 4.94,
    reviewsCount: 138,
    studentsEnrolled: 460,
    price: '₹1,999',
    originalPrice: '₹5,999',
    badge: 'Creative Tech',
    liveBatch: {
      timing: 'Daily 5:00 PM - 6:00 PM IST',
      days: 'Monday to Friday',
      mode: 'Interactive Live Online (Google Meet / Zoom + Figma-to-Code Reviews)',
      nextBatchDate: 'Upcoming Monday',
      mentor: 'Senior UI/UX Engineer, Asai Infotech'
    },
    certification: {
      title: 'ISO 9001:2015 Certified Front-End UI/UX Engineer',
      isoCode: 'ISO 9001:2015 QMS Accredited',
      features: [
        'Dual Certification: Course Completion + 30-Day Internship Letter',
        'Live Portfolio of 3 Responsive Web Apps',
        'Tamper-Proof Dynamic QR Code for Instant Employer Verification',
        'Direct LinkedIn Credential Addition with Unique ID'
      ]
    },
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Figma UI/UX Design', 'Framer Motion Animations', 'Vite & Modern Tooling', 'Web Performance & Accessibility'],
    modules: [
      {
        id: 'fe-m1',
        title: 'Module 1: Figma UI/UX Fundamentals & Modern Component Design',
        lessons: [
          {
            id: 'fe-l1',
            title: '1.1 Modern Front-End Architecture, Design Systems & Figma Basics (Free Preview)',
            duration: '26 mins',
            youtubeId: 'bMknfKXIFA8',
            isPreview: true,
            description: 'Learn modern front-end workflows: wireframing in Figma, color palettes, typography, and component specs.'
          },
          {
            id: 'fe-l2',
            title: '1.2 Advanced Tailwind CSS: Flexbox, Grid, Responsive Breakpoints & Dark Mode',
            duration: '40 mins',
            isPreview: false,
            description: 'Master utility-first CSS for pixel-perfect mobile and desktop layouts without CSS bloat.'
          }
        ]
      },
      {
        id: 'fe-m2',
        title: 'Module 2: React 19 with TypeScript & Interactive Micro-Animations',
        lessons: [
          {
            id: 'fe-l3',
            title: '2.1 Type-Safe React Components, Custom Hooks & State Architecture',
            duration: '48 mins',
            isPreview: false,
            description: 'Construct maintainable web apps with strong typing, interfaces, and reusable custom hooks.'
          },
          {
            id: 'fe-l4',
            title: '2.2 Micro-Animations with Framer Motion, SEO Meta Optimization & Fast Web Vitals',
            duration: '45 mins',
            isPreview: false,
            description: 'Implement butter-smooth layout transitions and achieve 95+ Google PageSpeed scores.'
          }
        ]
      }
    ],
    outcomes: [
      'Translate any Figma UI mockup into a production-grade React application',
      'Write robust, type-safe TypeScript code with zero runtime errors',
      'Build engaging interactive experiences with Framer Motion animations',
      'Receive an accredited ISO 9001:2015 certificate with tamper-proof QR validation'
    ]
  }
];

export const defaultCertificates: Record<string, VerifiedCertificate> = {
  'ASAI-2026-PY-1082': {
    certificateId: 'ASAI-2026-PY-1082',
    studentName: 'Karthik Subramanian',
    courseTitle: 'Python Full-Stack & Cloud Automation Masterclass',
    issueDate: 'October 01, 2026',
    grade: 'A+ (Distinction)',
    status: 'VERIFIED_ACTIVE',
    credentialUrl: 'https://asayinfotech.in/verify?cert_id=ASAI-2026-PY-1082',
    skillsAcquired: ['Python 3.12', 'FastAPI', 'Automation Scripts', 'Web Scraping', 'Docker & Cloud Deployment'],
    internshipCompleted: true
  },
  'ASAI-2026-JV-2041': {
    certificateId: 'ASAI-2026-JV-2041',
    studentName: 'Priya Dharshini',
    courseTitle: 'Java Full-Stack & Spring Boot Microservices Masterclass',
    issueDate: 'September 28, 2026',
    grade: 'A (Excellence)',
    status: 'VERIFIED_ACTIVE',
    credentialUrl: 'https://asayinfotech.in/verify?cert_id=ASAI-2026-JV-2041',
    skillsAcquired: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'Microservices', 'PostgreSQL'],
    internshipCompleted: true
  },
  'ASAI-2026-K8S-3091': {
    certificateId: 'ASAI-2026-K8S-3091',
    studentName: 'Vigneshwaran M',
    courseTitle: 'Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines',
    issueDate: 'September 22, 2026',
    grade: 'A+ (Distinction)',
    status: 'VERIFIED_ACTIVE',
    credentialUrl: 'https://asayinfotech.in/verify?cert_id=ASAI-2026-K8S-3091',
    skillsAcquired: ['Docker', 'Kubernetes Orchestration', 'Helm Charts', 'GitHub Actions CI/CD', 'Ingress & TLS'],
    internshipCompleted: true
  },
  'ASAI-2026-AI-4012': {
    certificateId: 'ASAI-2026-AI-4012',
    studentName: 'Ananya Ramesh',
    courseTitle: 'Data Science, Machine Learning & Generative AI Masterclass',
    issueDate: 'October 02, 2026',
    grade: 'A+ (Distinction)',
    status: 'VERIFIED_ACTIVE',
    credentialUrl: 'https://asayinfotech.in/verify?cert_id=ASAI-2026-AI-4012',
    skillsAcquired: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'Generative AI', 'LangChain & RAG'],
    internshipCompleted: true
  },
  'ASAI-2026-QA-5023': {
    certificateId: 'ASAI-2026-QA-5023',
    studentName: 'Sathish Kumar R',
    courseTitle: 'Automation Testing & Software QA Masterclass (Selenium, Playwright & API)',
    issueDate: 'September 29, 2026',
    grade: 'A (Excellence)',
    status: 'VERIFIED_ACTIVE',
    credentialUrl: 'https://asayinfotech.in/verify?cert_id=ASAI-2026-QA-5023',
    skillsAcquired: ['Selenium WebDriver', 'Playwright', 'Postman API', 'TestNG', 'CI/CD Automation'],
    internshipCompleted: true
  }
};

export const sampleCertificates = defaultCertificates;

// Storage keys
const STORAGE_KEYS = {
  COURSES: 'asai_academy_courses',
  ENROLLMENTS: 'asai_academy_enrollments',
  CERTIFICATES: 'asai_academy_certificates',
  USER_ENROLLED_COURSES: 'asai_user_unlocked_courses'
};

export function getCoursesFromStorage(): Course[] {
  if (typeof window === 'undefined') return coursesData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading courses from storage', e);
  }
  return coursesData;
}

export function saveCourseToStorage(course: Course): void {
  if (typeof window === 'undefined') return;
  const current = getCoursesFromStorage();
  const index = current.findIndex(c => c.id === course.id);
  if (index >= 0) {
    current[index] = course;
  } else {
    current.push(course);
  }
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(current));
}

export function saveAllCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
}

export function deleteCourseFromStorage(courseId: string): void {
  if (typeof window === 'undefined') return;
  const current = getCoursesFromStorage().filter(c => c.id !== courseId);
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(current));
}

export const GRADE_OPTIONS = [
  'A+ (Distinction)',
  'A (Excellence)',
  'A- (Very Good)',
  'B+ (Good)',
  'B (Satisfactory)'
] as const;

export function getEnrollmentsFromStorage(): StudentEnrollment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading enrollments', e);
  }
  return [
    {
      id: 'ENR-101',
      studentName: 'Sanjay Kumar',
      email: 'sanjay.k@gmail.com',
      phone: '+91 98401 23456',
      collegeOrCompany: 'SRM Institute of Science & Technology',
      courseId: 'python-automation',
      courseTitle: 'Python Full-Stack & Cloud Automation Masterclass',
      amount: '₹1,999',
      utrOrReference: 'UPI/428910284719/GPay',
      enrolledAt: 'Oct 02, 2026',
      status: 'APPROVED_UNLOCKED',
      username: 'sanjay.k@gmail.com',
      password: 'password123',
      unlockedCourses: ['python-automation']
    },
    {
      id: 'ENR-102',
      studentName: 'Divya Ramesh',
      email: 'divya.r@outlook.com',
      phone: '+91 98840 98765',
      collegeOrCompany: 'Anna University, CEG',
      courseId: 'java-enterprise',
      courseTitle: 'Java Full-Stack & Spring Boot Microservices Masterclass',
      amount: '₹2,499',
      utrOrReference: 'UPI/592837192031/PhonePe',
      enrolledAt: 'Oct 03, 2026',
      status: 'PENDING_APPROVAL',
      username: 'divya.r@outlook.com',
      password: 'password123',
      unlockedCourses: []
    },
    {
      id: 'ENR-103',
      studentName: 'Kavitha Balan',
      email: 'kavitha.b@gmail.com',
      phone: '+91 97910 54321',
      collegeOrCompany: 'SSN College of Engineering',
      courseId: 'devops-kubernetes',
      courseTitle: 'Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines',
      amount: '₹2,499',
      utrOrReference: 'UPI/612930192834/Paytm',
      enrolledAt: 'Oct 04, 2026',
      status: 'APPROVED_UNLOCKED',
      username: 'kavitha.b@gmail.com',
      password: 'password123',
      unlockedCourses: ['devops-kubernetes', 'python-automation']
    }
  ];
}

export function addEnrollmentToStorage(enr: Omit<StudentEnrollment, 'id' | 'enrolledAt' | 'status'>): StudentEnrollment {
  const current = getEnrollmentsFromStorage();
  
  // Check if an existing student with this email or phone exists to retain credentials & unlocked list
  const cleanEmail = (enr.email || '').trim().toLowerCase();
  const cleanPhone = (enr.phone || '').replace(/[^0-9]/g, '');
  const existing = current.find(e => 
    (cleanEmail && e.email && e.email.trim().toLowerCase() === cleanEmail) ||
    (cleanPhone && e.phone && e.phone.replace(/[^0-9]/g, '') === cleanPhone)
  );

  const existingPassword = existing ? (existing.password || 'password123') : (enr.password || 'password123');
  const existingUnlocked = existing?.unlockedCourses || [];

  const newEnr: StudentEnrollment = {
    ...enr,
    id: `ENR-${Math.floor(100 + Math.random() * 900)}`,
    enrolledAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    status: 'PENDING_APPROVAL',
    username: enr.username || (existing ? existing.username : (enr.email || enr.phone)),
    password: existingPassword,
    unlockedCourses: existingUnlocked
  };
  current.unshift(newEnr);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
  }
  return newEnr;
}

export function addEnrollmentDirect(enr: StudentEnrollment): void {
  const current = getEnrollmentsFromStorage();
  const withCreds: StudentEnrollment = {
    ...enr,
    username: enr.username || enr.email || enr.phone,
    password: enr.password || 'password123',
    unlockedCourses: enr.unlockedCourses || (enr.status === 'APPROVED_UNLOCKED' ? [enr.courseId] : [])
  };
  current.unshift(withCreds);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
    if (withCreds.status === 'APPROVED_UNLOCKED') {
      unlockCourseForUser(withCreds.courseId);
    }
    window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
  }
}

export function updateEnrollment(enr: StudentEnrollment): void {
  const current = getEnrollmentsFromStorage();
  const index = current.findIndex(e => e.id === enr.id);
  if (index >= 0) {
    current[index] = enr;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
      // Sync session if logged in student is this one
      const session = getLoggedInStudent();
      if (session && (session.id === enr.id || session.email === enr.email || session.phone === enr.phone)) {
        localStorage.setItem(LOGGED_IN_STUDENT_KEY, JSON.stringify(enr));
      }
      window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
    }
  }
}

export function updateEnrollmentStatus(id: string, status: 'PENDING_APPROVAL' | 'APPROVED_UNLOCKED'): void {
  const current = getEnrollmentsFromStorage();
  const found = current.find(e => e.id === id);
  if (found) {
    found.status = status;
    const cleanEmail = (found.email || '').trim().toLowerCase();
    const cleanPhone = (found.phone || '').replace(/[^0-9]/g, '');

    if (status === 'APPROVED_UNLOCKED') {
      unlockCourseForUser(found.courseId);

      // Add to unlockedCourses for this record and all sibling records belonging to this student
      current.forEach(e => {
        const matchEmail = cleanEmail && e.email && e.email.trim().toLowerCase() === cleanEmail;
        const matchPhone = cleanPhone && e.phone && e.phone.replace(/[^0-9]/g, '') === cleanPhone;
        if (matchEmail || matchPhone || e.id === found.id) {
          const list = new Set<string>(e.unlockedCourses || []);
          list.add(found.courseId);
          e.unlockedCourses = Array.from(list);
        }
      });
    } else {
      // If setting to pending, remove course from unlockedCourses
      current.forEach(e => {
        const matchEmail = cleanEmail && e.email && e.email.trim().toLowerCase() === cleanEmail;
        const matchPhone = cleanPhone && e.phone && e.phone.replace(/[^0-9]/g, '') === cleanPhone;
        if (matchEmail || matchPhone || e.id === found.id) {
          e.unlockedCourses = (e.unlockedCourses || []).filter(c => c !== found.courseId);
        }
      });
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
      const session = getLoggedInStudent();
      if (session) {
        const matchSession = (cleanEmail && session.email && session.email.trim().toLowerCase() === cleanEmail) ||
                             (cleanPhone && session.phone && session.phone.replace(/[^0-9]/g, '') === cleanPhone) ||
                             (session.id === found.id);
        if (matchSession) {
          if (status === 'APPROVED_UNLOCKED') {
            const list = new Set<string>(session.unlockedCourses || []);
            list.add(found.courseId);
            session.unlockedCourses = Array.from(list);
          } else {
            session.unlockedCourses = (session.unlockedCourses || []).filter(c => c !== found.courseId);
          }
          localStorage.setItem(LOGGED_IN_STUDENT_KEY, JSON.stringify(session));
        }
      }
      window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
    }
  }
}

export function adminAssignCoursesToStudent(studentIdOrEmailOrPhone: string, courseIds: string[]): void {
  const current = getEnrollmentsFromStorage();
  const cleanId = studentIdOrEmailOrPhone.trim().toLowerCase();
  const cleanDigits = studentIdOrEmailOrPhone.replace(/[^0-9]/g, '');

  let modified = false;
  current.forEach(e => {
    const matchEmail = e.email && e.email.trim().toLowerCase() === cleanId;
    const matchPhone = cleanDigits && e.phone && e.phone.replace(/[^0-9]/g, '') === cleanDigits;
    const matchId = e.id.toLowerCase() === cleanId;

    if (matchEmail || matchPhone || matchId) {
      e.unlockedCourses = Array.from(new Set(courseIds));
      if (courseIds.includes(e.courseId)) {
        e.status = 'APPROVED_UNLOCKED';
      } else {
        e.status = 'PENDING_APPROVAL';
      }
      modified = true;
    }
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
    // Sync session if matching
    const session = getLoggedInStudent();
    if (session) {
      const matchSession = (session.email && session.email.trim().toLowerCase() === cleanId) ||
                           (cleanDigits && session.phone && session.phone.replace(/[^0-9]/g, '') === cleanDigits) ||
                           (session.id.toLowerCase() === cleanId);
      if (matchSession) {
        session.unlockedCourses = Array.from(new Set(courseIds));
        localStorage.setItem(LOGGED_IN_STUDENT_KEY, JSON.stringify(session));
      }
    }
    courseIds.forEach(cid => unlockCourseForUser(cid));
    window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
  }
}

// ---------------- STUDENT AUTH SESSION HELPERS ----------------
const LOGGED_IN_STUDENT_KEY = 'asai_current_logged_in_student';

export function getLoggedInStudent(): StudentEnrollment | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOGGED_IN_STUDENT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return null;
}

export function getUserUnlockedCourses(student: StudentEnrollment | null): string[] {
  if (!student) return [];
  const set = new Set<string>();

  if (Array.isArray(student.unlockedCourses)) {
    student.unlockedCourses.forEach(c => set.add(c));
  }
  if (student.status === 'APPROVED_UNLOCKED' && student.courseId) {
    set.add(student.courseId);
  }

  const cleanEmail = (student.email || '').trim().toLowerCase();
  const cleanPhone = (student.phone || '').replace(/[^0-9]/g, '');
  const allEnrollments = getEnrollmentsFromStorage();

  allEnrollments.forEach(enr => {
    const matchEmail = cleanEmail && enr.email && enr.email.trim().toLowerCase() === cleanEmail;
    const matchPhone = cleanPhone && enr.phone && enr.phone.replace(/[^0-9]/g, '') === cleanPhone;
    const matchId = enr.id === student.id;

    if (matchEmail || matchPhone || matchId) {
      if (enr.status === 'APPROVED_UNLOCKED' && enr.courseId) {
        set.add(enr.courseId);
      }
      if (Array.isArray(enr.unlockedCourses)) {
        enr.unlockedCourses.forEach(c => set.add(c));
      }
    }
  });

  return Array.from(set);
}

export function getStudentAllCourses(student: StudentEnrollment | null): StudentCourseStatus[] {
  if (!student) return [];
  const unlockedList = getUserUnlockedCourses(student);
  const cleanEmail = (student.email || '').trim().toLowerCase();
  const cleanPhone = (student.phone || '').replace(/[^0-9]/g, '');
  const allEnrollments = getEnrollmentsFromStorage();

  const userEnrollments = allEnrollments.filter(enr => {
    const matchEmail = cleanEmail && enr.email && enr.email.trim().toLowerCase() === cleanEmail;
    const matchPhone = cleanPhone && enr.phone && enr.phone.replace(/[^0-9]/g, '') === cleanPhone;
    return matchEmail || matchPhone || enr.id === student.id;
  });

  const courses = getCoursesFromStorage();

  return courses.map(c => {
    const enr = userEnrollments.find(e => e.courseId === c.id);
    const isUnlocked = unlockedList.includes(c.id);
    const isPending = !isUnlocked && enr?.status === 'PENDING_APPROVAL';

    return {
      courseId: c.id,
      courseTitle: c.title,
      category: c.category,
      price: c.price,
      isUnlocked,
      isPending,
      enrolledAt: enr?.enrolledAt,
      utrOrReference: enr?.utrOrReference
    };
  });
}

export function studentLogin(identifier: string, pass: string): { success: boolean; student?: StudentEnrollment; message: string } {
  const enrollments = getEnrollmentsFromStorage();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = pass.trim();

  const student = enrollments.find(e => 
    (e.email && e.email.toLowerCase() === cleanId) || 
    (e.phone && e.phone.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '')) ||
    (e.username && e.username.toLowerCase() === cleanId)
  );

  if (!student) {
    return { success: false, message: 'Student account not found with this Email / Mobile. Please submit your course enrollment first.' };
  }

  const expectedPass = student.password || student.phone || 'password123';
  if (cleanPass !== expectedPass) {
    return { success: false, message: 'Incorrect password. Please verify or contact Admin for a password reset.' };
  }

  // Aggregate all unlocked courses for this student
  const allUnlocked = getUserUnlockedCourses(student);
  student.unlockedCourses = allUnlocked;

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOGGED_IN_STUDENT_KEY, JSON.stringify(student));
    allUnlocked.forEach(cid => unlockCourseForUser(cid));
    window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
  }

  return { success: true, student, message: 'Login successful!' };
}

export function studentLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOGGED_IN_STUDENT_KEY);
    window.dispatchEvent(new CustomEvent('asai-student-auth-change'));
  }
}

export function isCourseUnlockedForCurrentUser(courseId: string): boolean {
  if (typeof window === 'undefined') return false;
  const currentStudent = getLoggedInStudent();
  if (currentStudent) {
    const unlocked = getUserUnlockedCourses(currentStudent);
    if (unlocked.includes(courseId)) {
      return true;
    }
  }
  const globalUnlocked = getUnlockedCourses();
  return globalUnlocked.includes(courseId);
}

export function deleteEnrollmentFromStorage(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getEnrollmentsFromStorage().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(current));
}

export function getUnlockedCourses(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ENROLLED_COURSES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return [];
}

export function unlockCourseForUser(courseId: string): void {
  if (typeof window === 'undefined') return;
  const list = getUnlockedCourses();
  if (!list.includes(courseId)) {
    list.push(courseId);
    localStorage.setItem(STORAGE_KEYS.USER_ENROLLED_COURSES, JSON.stringify(list));
  }
}

export function getCertificatesRegistry(): Record<string, VerifiedCertificate> {
  let certs: Record<string, VerifiedCertificate> = { ...defaultCertificates };
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'object' && parsed !== null) {
          certs = { ...defaultCertificates, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Error reading certificates registry', e);
    }
  }
  return certs;
}

export function registerNewCertificate(cert: VerifiedCertificate): void {
  const current = { ...getCertificatesRegistry() };
  current[cert.certificateId] = cert;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(current));
  }
}

export function updateCertificate(cert: VerifiedCertificate): void {
  const current = { ...getCertificatesRegistry() };
  current[cert.certificateId] = cert;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(current));
  }
}

export function deleteCertificate(certificateId: string): void {
  const current = { ...getCertificatesRegistry() };
  delete current[certificateId];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(current));
  }
}

export function importFullStateJson(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);
    if (data.courses && Array.isArray(data.courses)) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(data.courses));
    }
    if (data.certificates && typeof data.certificates === 'object') {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(data.certificates));
    }
    if (data.enrollments && Array.isArray(data.enrollments)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(data.enrollments));
    }
    return { success: true, message: 'All academy data imported and synced successfully!' };
  } catch (err: any) {
    return { success: false, message: `Failed to import JSON: ${err.message || 'Invalid JSON format'}` };
  }
}

export function resetToDefaultData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.COURSES);
  localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
  localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);
  localStorage.removeItem(STORAGE_KEYS.USER_ENROLLED_COURSES);
}
