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
    title: 'About Us | ASAY InfoTech - Top IT & Software Company in Guduvanchery & Chennai',
    description: 'Learn about ASAY InfoTech, a premier IT & software development company in Guduvanchery, Tambaram, Chennai. Discover our team, mission, values, and vision.',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/services',
    title: 'Enterprise IT Services & Software Solutions | ASAY InfoTech Guduvanchery, Chennai',
    description: 'Explore full-spectrum IT services: Full-Stack Web Development, Autonomous AI Agents, RAG Architecture, Cloud Microservices, and Custom Software in Chennai.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/testimonials',
    title: 'Client Testimonials & Enterprise Reviews | ASAY InfoTech',
    description: 'Read verified client testimonials and case studies from businesses that scaled with ASAY InfoTech software development and AI engineering services.',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/careers',
    title: 'Careers at ASAY InfoTech | Join Leading Tech Innovators in Guduvanchery, Chennai',
    description: 'Explore career openings at ASAY InfoTech. Hiring Full-Stack Developers, AI/ML Engineers, and Cloud Architects in Guduvanchery, Chennai.',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/contact',
    title: 'Contact ASAY InfoTech | IT & Software Consultation in Guduvanchery, Chennai',
    description: 'Get in touch with ASAY InfoTech for enterprise software development, AI consulting, and web apps. Located in Guduvanchery, Tambaram, Chennai.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/card',
    title: 'Smart Digital Business Card | Sivabarathi M - ASAY InfoTech',
    description: 'Connect with Sivabarathi M, Founder of ASAY InfoTech. Instant vCard contact save, direct WhatsApp, and IT services portfolio via Tap & QR.',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | ASAY InfoTech Software Solutions',
    description: 'Privacy Policy for ASAY InfoTech explaining how we collect, safeguard, and process client and visitor data.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/terms',
    title: 'Terms of Service | ASAY InfoTech',
    description: 'Terms and Conditions governing enterprise software engineering, contracts, and digital services by ASAY InfoTech.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/cookies',
    title: 'Cookie Policy | ASAY InfoTech',
    description: 'Cookie Policy explaining tracking, session handling, and user privacy on ASAY InfoTech website.',
    priority: '0.5',
    changefreq: 'monthly'
  },
  {
    path: '/blog',
    title: 'Tech Insights & Engineering Blog | ASAY InfoTech',
    description: 'Deep-dive engineering articles on Autonomous AI Agents, Model Context Protocol (MCP), Enterprise RAG, Cloud Architecture, and Web Security.',
    priority: '0.9',
    changefreq: 'daily'
  },
  // Blog Posts
  {
    path: '/blog/autonomous-ai-agents-enterprise-workflow',
    title: 'How Autonomous AI Agents Transform Enterprise Workflows in 2026 | ASAY InfoTech Blog',
    description: 'Explore how multi-agent swarms, Model Context Protocol (MCP), and proactive tool execution are replacing static bots and revolutionizing enterprise operations.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/scalable-cloud-microservices-kubernetes',
    title: 'Building High-Resilience Cloud Microservices with Kubernetes | ASAY InfoTech Blog',
    description: 'Best practices for container orchestration, zero-downtime rolling updates, distributed tracing, and service mesh architecture in modern enterprise clouds.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/retrieval-augmented-generation-rag-enterprise',
    title: 'Enterprise RAG Architecture: Vector Search & Hybrid Retrieval | ASAY InfoTech Blog',
    description: 'A comprehensive guide to building zero-hallucination RAG pipelines with pgvector, Pinecone, chunking strategies, and neural rerankers.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/fullstack-security-best-practices-2026',
    title: 'Full-Stack Web & API Security Best Practices for 2026 | ASAY InfoTech Blog',
    description: 'Defending modern web apps and REST/GraphQL APIs against OWASP Top 10, JWT vulnerabilities, DDoS, and prompt injection attacks.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/blog/modern-web-architecture-react-typescript-edge',
    title: 'Modern Web Architecture: React, TypeScript, and Edge CDN Performance | ASAY InfoTech Blog',
    description: 'Architecting sub-second web applications using React 19, TypeScript, Edge computing, and modern build tooling for maximum SEO and UX.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  // Services & Solutions
  {
    path: '/services/ai-agents-rag-mcp',
    title: 'AI Agents, RAG & MCP Engineering Services | ASAY InfoTech Chennai',
    description: 'Autonomous AI Swarms, Enterprise RAG Pipelines & Model Context Protocol (MCP) Systems engineered by ASAY InfoTech.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/web-app-development',
    title: 'Full-Stack Web Application Development | ASAY InfoTech Guduvanchery, Chennai',
    description: 'High-performance, scalable web applications built with React, Node.js, TypeScript, and modern cloud architectures.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/saas-platforms',
    title: 'Custom SaaS Platform Development | ASAY InfoTech Chennai',
    description: 'End-to-end multi-tenant SaaS architecture design, subscription billing engine, and cloud scaling solutions.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/cloud-integration',
    title: 'Cloud Integration & DevOps Solutions | ASAY InfoTech Chennai',
    description: 'Seamless AWS, GCP, Azure cloud infrastructure, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/digital-services',
    title: 'Digital Transformation & IT Consulting | ASAY InfoTech Guduvanchery, Chennai',
    description: 'Strategic digital transformation, legacy system modernization, workflow automation, and enterprise technology consulting.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  {
    path: '/services/custom-software',
    title: 'Custom Software Engineering Services | ASAY InfoTech Chennai',
    description: 'Bespoke enterprise software solutions tailored to your unique business operations, security compliance, and scaling goals.',
    priority: '0.85',
    changefreq: 'monthly'
  },
  // Also support /solutions/ aliases
  {
    path: '/solutions/ai-agents-rag-mcp',
    title: 'AI Agents, RAG & MCP Engineering Solutions | ASAY InfoTech Chennai',
    description: 'Autonomous AI Swarms, Enterprise RAG Pipelines & Model Context Protocol (MCP) Systems engineered by ASAY InfoTech.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/web-app-development',
    title: 'Full-Stack Web App Development Solutions | ASAY InfoTech Chennai',
    description: 'High-performance, scalable web applications built with React, Node.js, TypeScript, and modern cloud architectures.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/saas-platforms',
    title: 'Custom SaaS Platform Solutions | ASAY InfoTech Chennai',
    description: 'End-to-end multi-tenant SaaS architecture design, subscription billing engine, and cloud scaling solutions.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/cloud-integration',
    title: 'Cloud Integration & DevOps Solutions | ASAY InfoTech Chennai',
    description: 'Seamless AWS, GCP, Azure cloud infrastructure, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/digital-services',
    title: 'Digital Transformation Solutions | ASAY InfoTech Chennai',
    description: 'Strategic digital transformation, legacy system modernization, workflow automation, and enterprise technology consulting.',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/solutions/custom-software',
    title: 'Custom Software Engineering Solutions | ASAY InfoTech Chennai',
    description: 'Bespoke enterprise software solutions tailored to your unique business operations, security compliance, and scaling goals.',
    priority: '0.8',
    changefreq: 'monthly'
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
