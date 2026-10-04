import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

const BASE_URL = 'https://asayinfotech.in';

const routes = [
  {
    path: '/about',
    title: 'About Us | ASAI InfoTech - Top IT & Software Company in Guduvanchery & Chennai',
    description: 'Learn about ASAI InfoTech, a premier IT & software development company in Guduvanchery, Tambaram, Chennai. Discover our team, mission, values, and vision.',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/services',
    title: 'Enterprise IT Services & Software Solutions | ASAI InfoTech Guduvanchery, Chennai',
    description: 'Explore full-spectrum IT services: Full-Stack Web Development, Autonomous AI Agents, RAG Architecture, Cloud Microservices, and Custom Software in Chennai.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/testimonials',
    title: 'Client Testimonials & Enterprise Reviews | ASAI InfoTech',
    description: 'Read verified client testimonials and case studies from businesses that scaled with ASAI InfoTech software development and AI engineering services.',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/careers',
    title: 'Careers at ASAI InfoTech | Join Leading Tech Innovators in Guduvanchery, Chennai',
    description: 'Explore career openings at ASAI InfoTech. Hiring Full-Stack Developers, AI/ML Engineers, and Cloud Architects in Guduvanchery, Chennai.',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/contact',
    title: 'Contact ASAI InfoTech | IT & Software Consultation in Guduvanchery, Chennai',
    description: 'Get in touch with ASAI InfoTech for enterprise software development, AI consulting, and web apps. Located in Guduvanchery, Tambaram, Chennai.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/card',
    title: 'Smart Digital Business Card | Sivabarathi M - ASAI InfoTech',
    description: 'Connect with Sivabarathi M, Founder of ASAI InfoTech. Instant vCard contact save, direct WhatsApp, and IT services portfolio via Tap & QR.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | ASAI InfoTech Software Solutions',
    description: 'Privacy Policy for ASAI InfoTech explaining how we collect, safeguard, and process client and visitor data.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/terms',
    title: 'Terms of Service | ASAI InfoTech',
    description: 'Terms and Conditions governing enterprise software engineering, contracts, and digital services by ASAI InfoTech.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | ASAI InfoTech',
    description: 'Cookie Policy explaining tracking, session handling, and user privacy on ASAI InfoTech website.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/blog',
    title: 'Tech Insights & Engineering Blog | ASAI InfoTech',
    description: 'Deep-dive engineering articles on Autonomous AI Agents, Model Context Protocol (MCP), Enterprise RAG, Cloud Architecture, and Web Security.',
    priority: '0.9',
    changefreq: 'daily'
  },
  // Blog Posts
  {
    path: '/blog/autonomous-ai-agents-enterprise-workflow',
    title: 'How Autonomous AI Agents Transform Enterprise Workflows in 2026 | ASAI InfoTech Blog',
    description: 'Explore how multi-agent swarms, Model Context Protocol (MCP), and proactive tool execution are replacing static bots and revolutionizing enterprise operations.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/scalable-cloud-microservices-kubernetes',
    title: 'Building High-Resilience Cloud Microservices with Kubernetes | ASAI InfoTech Blog',
    description: 'Best practices for container orchestration, zero-downtime rolling updates, distributed tracing, and service mesh architecture in modern enterprise clouds.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/retrieval-augmented-generation-rag-enterprise',
    title: 'Enterprise RAG Architecture: Vector Search & Hybrid Retrieval | ASAI InfoTech Blog',
    description: 'A comprehensive guide to building zero-hallucination RAG pipelines with pgvector, Pinecone, chunking strategies, and neural rerankers.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/fullstack-security-best-practices-2026',
    title: 'Full-Stack Web & API Security Best Practices for 2026 | ASAI InfoTech Blog',
    description: 'Defending modern web apps and REST/GraphQL APIs against OWASP Top 10, JWT vulnerabilities, DDoS, and prompt injection attacks.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/modern-web-architecture-react-typescript-edge',
    title: 'Modern Web Architecture: React, TypeScript, and Edge CDN Performance | ASAI InfoTech Blog',
    description: 'Architecting sub-second web applications using React 19, TypeScript, Edge computing, and modern build tooling for maximum SEO and UX.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  // Services & Solutions
  {
    path: '/services/ai-agents-rag-mcp',
    title: 'AI Agents, RAG & MCP Engineering Services | ASAI InfoTech Chennai',
    description: 'Autonomous AI Swarms, Enterprise RAG Pipelines & Model Context Protocol (MCP) Systems engineered by ASAI InfoTech.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/web-app-development',
    title: 'Full-Stack Web Application Development | ASAI InfoTech Guduvanchery, Chennai',
    description: 'High-performance, scalable web applications built with React, Node.js, TypeScript, and modern cloud architectures.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/saas-platforms',
    title: 'Custom SaaS Platform Development | ASAI InfoTech Chennai',
    description: 'End-to-end multi-tenant SaaS architecture design, subscription billing engine, and cloud scaling solutions.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/cloud-integration',
    title: 'Cloud Integration & DevOps Solutions | ASAI InfoTech Chennai',
    description: 'Seamless AWS, GCP, Azure cloud infrastructure, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/digital-services',
    title: 'Digital Transformation & IT Consulting | ASAI InfoTech Guduvanchery, Chennai',
    description: 'Strategic digital transformation, legacy system modernization, workflow automation, and enterprise technology consulting.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/custom-software',
    title: 'Custom Software Engineering Services | ASAI InfoTech Chennai',
    description: 'Bespoke enterprise software solutions tailored to your unique business operations, security compliance, and scaling goals.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  // Also support /solutions/ aliases
  {
    path: '/solutions/ai-agents-rag-mcp',
    title: 'AI Agents, RAG & MCP Engineering Solutions | ASAI InfoTech Chennai',
    description: 'Autonomous AI Swarms, Enterprise RAG Pipelines & Model Context Protocol (MCP) Systems engineered by ASAI InfoTech.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/web-app-development',
    title: 'Full-Stack Web App Development Solutions | ASAI InfoTech Chennai',
    description: 'High-performance, scalable web applications built with React, Node.js, TypeScript, and modern cloud architectures.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/saas-platforms',
    title: 'Custom SaaS Platform Solutions | ASAI InfoTech Chennai',
    description: 'End-to-end multi-tenant SaaS architecture design, subscription billing engine, and cloud scaling solutions.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/cloud-integration',
    title: 'Cloud Integration & DevOps Solutions | ASAI InfoTech Chennai',
    description: 'Seamless AWS, GCP, Azure cloud infrastructure, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/digital-services',
    title: 'Digital Transformation Solutions | ASAI InfoTech Chennai',
    description: 'Strategic digital transformation, legacy system modernization, workflow automation, and enterprise technology consulting.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/custom-software',
    title: 'Custom Software Engineering Solutions | ASAI InfoTech Chennai',
    description: 'Bespoke enterprise software solutions tailored to your unique business operations, security compliance, and scaling goals.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  // Academy & Certification Routes
  {
    path: '/courses',
    title: 'Tech Academy & ISO 9001:2015 Certified Courses | ASAI InfoTech Chennai',
    description: 'Learn Python, Java, DevOps, Kubernetes, and QA Automation with live evening batches (5-6 PM), free video previews, and verifiable ISO 9001:2015 QR certificates.',
    priority: '0.95',
    changefreq: 'weekly'
  },
  {
    path: '/academy',
    title: 'ASAI InfoTech Tech Academy | Live Industry Mentorship & Dual Certification',
    description: 'Join ASAI InfoTech training academy for live practical engineering courses and 30-day corporate internship credentials in Chennai.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/verify-certificate',
    title: 'ISO 9001:2015 Online Certificate Verification | ASAI InfoTech',
    description: 'Official online registry to verify tamper-proof QR code credentials, internships, and skill completions issued by ASAI InfoTech.',
    priority: '0.85',
    changefreq: 'weekly'
  },
  {
    path: '/admin',
    title: 'Academy Management Portal | ASAI InfoTech',
    description: 'Admin management center to configure YouTube course videos, review enrollments, and issue verifiable certificates.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/courses/python-automation',
    title: 'Python Full-Stack & Cloud Automation Masterclass | ASAI InfoTech',
    description: 'Master Python programming, FastAPI, automation scripting, and cloud deployment with live 5-6 PM batches and free preview.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/java-enterprise',
    title: 'Java Full-Stack & Spring Boot Microservices Masterclass | ASAI InfoTech',
    description: 'Enterprise Java, Spring Boot 3, and microservices architecture with hands-on projects and ISO 9001:2015 certification.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/mern-fullstack',
    title: 'MERN Full-Stack Web Development & Cloud Deployment | ASAI InfoTech',
    description: 'Build dynamic modern web applications with MongoDB, Express, React 19, Node.js and automated cloud deployment.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/devops-kubernetes',
    title: 'Cloud DevOps, Docker, Kubernetes & CI/CD Pipelines | ASAI InfoTech',
    description: 'Learn Docker, Kubernetes, Helm, and GitOps CI/CD with real cluster orchestration and verifiable internship certificate.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/aws-cloud-architect',
    title: 'AWS Solutions Architect & Cloud Engineering Masterclass | ASAI InfoTech',
    description: 'Master Amazon Web Services EC2, S3, RDS, VPC, IAM, and Lambda serverless with ISO 9001:2015 verified credential.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/data-science-ai',
    title: 'Data Science, Machine Learning & Generative AI Masterclass | ASAI InfoTech',
    description: 'Master Python, Pandas, Scikit-Learn, Deep Learning, and Generative AI / RAG applications with real-world case studies.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/courses/qa-automation',
    title: 'Automation Testing & Software QA Masterclass (Selenium & Playwright) | ASAI InfoTech',
    description: 'Transition from manual QA to test automation engineer with modern Playwright, Selenium, and CI/CD test frameworks.',
    priority: '0.85',
    changefreq: 'weekly'
  },
  {
    path: '/courses/cybersecurity-ethical-hacking',
    title: 'Cybersecurity, SOC Analysis & Ethical Hacking Defense | ASAI InfoTech',
    description: 'Learn ethical cybersecurity practices, Kali Linux, OWASP Top 10 web vulnerabilities, and security operations center analysis.',
    priority: '0.85',
    changefreq: 'weekly'
  },
  {
    path: '/courses/powerbi-sql-analytics',
    title: 'Business Intelligence & Data Analytics (Power BI, SQL & Excel) | ASAI InfoTech',
    description: 'Transform business data into actionable executive insights with advanced SQL, Power BI dashboards, and DAX modeling.',
    priority: '0.85',
    changefreq: 'weekly'
  },
  {
    path: '/courses/frontend-react-uiux',
    title: 'Modern Front-End Engineering & UI/UX (React 19 & Tailwind) | ASAI InfoTech',
    description: 'Convert Figma designs into pixel-perfect responsive web interfaces using React 19, TypeScript, and Tailwind CSS.',
    priority: '0.85',
    changefreq: 'weekly'
  }
];

function generateStaticRoutes() {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  console.log(`[Static Generator] Generating static HTML for ${routes.length} routes...`);

  let count = 0;
  for (const r of routes) {
    const fullUrl = `${BASE_URL}${r.path}`;
    const targetDir = path.join(distDir, r.path.replace(/^\//, ''));
    fs.mkdirSync(targetDir, { recursive: true });

    let pageHtml = baseHtml;

    // Replace Title
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${r.title}</title>`);
    pageHtml = pageHtml.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${r.title}" />`);

    // Replace Description
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${r.description}" />`);

    // Replace Canonical Link
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${fullUrl}" />`);

    // Replace OpenGraph URL, Title, Description
    pageHtml = pageHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${fullUrl}" />`);
    pageHtml = pageHtml.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${r.title}" />`);
    pageHtml = pageHtml.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${r.description}" />`);

    // Replace Twitter URL, Title, Description
    pageHtml = pageHtml.replace(/<meta name="twitter:url" content=".*?" \/>/i, `<meta name="twitter:url" content="${fullUrl}" />`);
    pageHtml = pageHtml.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${r.title}" />`);
    pageHtml = pageHtml.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${r.description}" />`);

    // Inject WebPage Schema JSON-LD
    const webPageSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "${fullUrl}#webpage",
      "url": "${fullUrl}",
      "name": "${r.title.replace(/"/g, '\\"')}",
      "description": "${r.description.replace(/"/g, '\\"')}",
      "isPartOf": {
        "@id": "${BASE_URL}/#website"
      }
    }
    </script>
    `;
    pageHtml = pageHtml.replace('</head>', `${webPageSchema}\n</head>`);

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, pageHtml, 'utf-8');
    count++;
  }

  // Ensure 404.html also exists in dist
  const fallback404 = path.join(distDir, '404.html');
  fs.copyFileSync(indexPath, fallback404);

  console.log(`[Static Generator] Successfully generated ${count} route files and 404.html!`);

  // Generate comprehensive sitemap.xml
  generateSitemap();
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // All URLs starting with home
  const allUrls = [
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0'
    },
    ...routes.map(r => ({
      loc: `${BASE_URL}${r.path}`,
      lastmod: today,
      changefreq: r.changefreq || 'weekly',
      priority: r.priority || '0.8'
    }))
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const item of allUrls) {
    xml += '  <url>\n';
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';

  // Save to public and dist
  const publicSitemap = path.join(publicDir, 'sitemap.xml');
  const distSitemap = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemap, xml, 'utf-8');
  fs.writeFileSync(distSitemap, xml, 'utf-8');

  console.log(`[Static Generator] Generated sitemap.xml with ${allUrls.length} verified URLs!`);
}

generateStaticRoutes();

