import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Laptop, Database, Cloud, Smartphone, Shield, ArrowRight, 
  CheckCircle2, Layers, Cpu, Zap, Code2, Rocket, HelpCircle
} from 'lucide-react';

interface SolutionData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  heroImage: string;
  overview: string;
  features: { title: string; description: string; icon: any }[];
  technologies: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const solutionsData: Record<string, SolutionData> = {
  'ai-agents-rag-mcp': {
    id: 'ai-agents-rag-mcp',
    title: 'AI Agents, RAG & MCP Engineering',
    subtitle: 'Autonomous AI Swarms, Enterprise RAG Pipelines & Model Context Protocol (MCP) Systems',
    badge: 'Generative AI & Agentic Systems',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    overview: 'Supercharge your business with state-of-the-art Generative AI. We engineer enterprise-grade RAG (Retrieval-Augmented Generation) systems that query your private data with zero hallucination, develop custom Model Context Protocol (MCP) servers that connect LLMs to your internal tools, and build autonomous multi-agent workflows that execute complex business operations autonomously.',
    features: [
      { title: 'Enterprise RAG & Hybrid Vector Search', description: 'Contextual retrieval engines with vector databases (Pinecone, pgvector), chunking, and neural reranking over your company documents and databases.', icon: Database },
      { title: 'Model Context Protocol (MCP) Servers', description: 'Standardized MCP protocol architecture connecting LLMs like Claude, Gemini, and GPT directly with enterprise databases, APIs, and dev tools.', icon: Code2 },
      { title: 'Autonomous Multi-Agent Swarms', description: 'Agentic workflows using LangGraph and CrewAI that plan, self-reflect, collaborate, and execute end-to-end multi-step tasks.', icon: Cpu },
      { title: 'Smart Conversational AI & Copilots', description: 'Domain-trained AI chatbots with long-term memory, guardrails, role personalization, and multi-channel deployment (Web, WhatsApp, Slack).', icon: Zap }
    ],
    technologies: ['LangGraph', 'LangChain', 'LlamaIndex', 'MCP Protocol', 'Gemini 1.5 / 2.0', 'Claude 3.5 Sonnet', 'OpenAI GPT-4o', 'Pinecone', 'pgvector', 'FastAPI', 'Python'],
    process: [
      { step: '01', title: 'Data & Use-Case Discovery', desc: 'Analyzing internal data sources, vector embeddings strategy, tool requirements, and agentic task workflows.' },
      { step: '02', title: 'RAG & MCP Architecture', desc: 'Building secure vector indexes, MCP tool schemas, API adapters, and agent orchestration graphs.' },
      { step: '03', title: 'Evaluation & Guardrails', desc: 'Rigorous RAG triad evaluation (faithfulness, answer relevance, context precision) and security boundaries.' },
      { step: '04', title: 'Production Deployment', desc: 'Deploying scalable inference pipelines, caching layers, real-time logging, and telemetry dashboards.' }
    ],
    faqs: [
      { q: 'What is RAG and why does my business need it?', a: 'RAG (Retrieval-Augmented Generation) connects Large Language Models to your private company data (PDFs, docs, databases). It ensures the AI answers with 100% factual accuracy and zero hallucination, citing exact sources.' },
      { q: 'What is Model Context Protocol (MCP)?', a: 'MCP is an open standard that allows AI models to safely interact with external data sources, enterprise tools, and APIs without custom point-to-point integrations.' },
      { q: 'Can you build custom autonomous AI agents for our workflow?', a: 'Yes! We build multi-agent swarms where specialized agents handle research, data analysis, report generation, and system operations autonomously.' }
    ]
  },
  'web-app-development': {
    id: 'web-app-development',
    title: 'Web App Development',
    subtitle: 'High-Performance, Scalable & Modern Web Applications',
    badge: 'Modern Web Engineering',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    overview: 'We build ultra-fast, responsive, and secure web applications designed to convert visitors into loyal customers. From dynamic single-page applications (SPAs) to complex enterprise platforms, our solutions are engineered for lightning speed and seamless user experiences.',
    features: [
      { title: 'Modern React & Next.js Architecture', description: 'Component-driven frontends with reactive state management and blazing fast rendering.', icon: Laptop },
      { title: 'Responsive & Accessible UI/UX', description: 'Pixel-perfect mobile-first interfaces compliant with modern web accessibility standards.', icon: Layers },
      { title: 'Robust REST & GraphQL APIs', description: 'Scalable backend API architectures with bulletproof authentication and data validation.', icon: Code2 },
      { title: 'SEO & Performance Optimized', description: 'Sub-second load times with Lighthouse 95+ score optimization and structured metadata.', icon: Zap }
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'Vite', 'PostgreSQL', 'Docker'],
    process: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'Understanding your user journeys, wireframing interactive prototypes, and selecting architecture.' },
      { step: '02', title: 'Agile Development', desc: 'Sprints with continuous code integration, automated testing, and milestone previews.' },
      { step: '03', title: 'Quality Assurance', desc: 'Cross-browser, security, and load testing to guarantee flawless production readiness.' },
      { step: '04', title: 'Launch & Continuous Care', desc: 'Zero-downtime deployment, SSL setup, performance monitoring, and ongoing support.' }
    ],
    faqs: [
      { q: 'How long does a custom web application take to develop?', a: 'Standard web apps typically take 4-8 weeks, while complex full-stack enterprise portals range between 8-16 weeks.' },
      { q: 'Will the web application be mobile-friendly?', a: 'Yes, 100% of our web apps are built mobile-first and tested thoroughly across iOS and Android devices.' },
      { q: 'Can you integrate third-party APIs like payment gateways?', a: 'Yes, we seamlessly integrate Stripe, Razorpay, PayPal, CRM systems, SMS/WhatsApp gateways, and custom third-party APIs.' }
    ]
  },
  'saas-platforms': {
    id: 'saas-platforms',
    title: 'SaaS Platforms',
    subtitle: 'Multi-Tenant Cloud Architectures Engineered to Scale Globally',
    badge: 'Enterprise SaaS Solutions',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000',
    overview: 'Transform your software vision into a recurring revenue powerhouse. We engineer secure, multi-tenant SaaS products complete with subscription billing, granular role permissions, and scalable microservices.',
    features: [
      { title: 'Multi-Tenant Isolation', description: 'Robust data separation ensuring maximum privacy, tenant security, and instant scalability.', icon: Shield },
      { title: 'Automated Billing & Subscriptions', description: 'Stripe/Paddle integration with tiered pricing, invoicing, tax compliance, and automated renewals.', icon: Zap },
      { title: 'Role-Based Access Control (RBAC)', description: 'Granular permissions for teams, organizations, administrators, and end-users.', icon: Database },
      { title: 'Real-Time Telemetry & Dashboards', description: 'Comprehensive metric dashboards tracking MRR, user churn, and API utilization.', icon: Layers }
    ],
    technologies: ['React', 'Node.js', 'NestJS', 'Docker', 'Kubernetes', 'Redis', 'Stripe API', 'AWS ECS'],
    process: [
      { step: '01', title: 'Product Scoping & MVP', desc: 'Defining core value proposition, revenue model, and multi-tenant database topology.' },
      { step: '02', title: 'Core Platform Build', desc: 'Developing auth, tenant onboarding, billing engine, and key business workflows.' },
      { step: '03', title: 'Beta Testing & Load Stress', desc: 'Simulating multi-tenant concurrency and validating security partitions.' },
      { step: '04', title: 'Global Rollout', desc: 'Multi-region cloud provisioning with autoscaling and 24/7 uptime monitoring.' }
    ],
    faqs: [
      { q: 'How do you handle multi-tenant data security?', a: 'We implement strict schema-level or row-level tenant separation with end-to-end encryption to prevent cross-tenant data leakage.' },
      { q: 'Can we build a SaaS MVP first before the full platform?', a: 'Yes! We specialize in launching production-ready MVPs within 60 days so you can onboard early customers and validate product-market fit.' }
    ]
  },
  'cloud-integration': {
    id: 'cloud-integration',
    title: 'Cloud Integration & DevOps',
    subtitle: 'Resilient Infrastructure, CI/CD Automation & Seamless Cloud Migration',
    badge: 'Cloud Infrastructure & DevOps',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    overview: 'Accelerate development velocity and eliminate server downtime. We architect, optimize, and automate cloud environments across AWS, Google Cloud, and Azure with modern Infrastructure as Code (IaC) and containerization.',
    features: [
      { title: 'Containerization & Orchestration', description: 'Dockerizing workloads and deploying auto-healing Kubernetes/ECS clusters.', icon: Cloud },
      { title: 'Automated CI/CD Pipelines', description: 'GitHub Actions and GitLab workflows for zero-downtime test and deployment pipelines.', icon: Rocket },
      { title: 'Cost & Performance Optimization', description: 'Eliminating idle cloud resources to slash infrastructure bills by up to 40%.', icon: Cpu },
      { title: 'Disaster Recovery & High Availability', description: 'Automated database backups, geo-redundant routing, and failover clustering.', icon: Shield }
    ],
    technologies: ['AWS', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions', 'Nginx', 'Cloudflare'],
    process: [
      { step: '01', title: 'Architecture Audit', desc: 'Evaluating current servers, bottlenecks, security vulnerabilities, and hosting costs.' },
      { step: '02', title: 'Infrastructure as Code', desc: 'Writing modular Terraform scripts and Docker compose manifests for reproducible stacks.' },
      { step: '03', title: 'Zero-Downtime Migration', desc: 'Data synchronization, DNS cutover, and traffic routing without interrupting users.' },
      { step: '04', title: 'Observability Setup', desc: 'Configuring Grafana, Prometheus, and automated alerts for proactive issue mitigation.' }
    ],
    faqs: [
      { q: 'Which cloud provider do you recommend?', a: 'We evaluate your specific project budget, workload requirements, and scaling roadmap to recommend AWS, GCP, or managed cloud services.' },
      { q: 'Can you migrate our existing on-premise server to the cloud?', a: 'Yes, our team specializes in seamless database and application migrations with zero downtime.' }
    ]
  },
  'digital-services': {
    id: 'digital-services',
    title: 'Digital Services & Transformation',
    subtitle: 'Strategic Technology Consulting, UI/UX Systems & AI Integrations',
    badge: 'End-to-End Digital Solutions',
    heroImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    overview: 'Modernize legacy systems, streamline complex internal operations, and embrace AI-driven workflows. We help forward-thinking businesses leverage technology to gain competitive market advantage.',
    features: [
      { title: 'Generative AI & LLM Solutions', description: 'Intelligent AI chat assistants, automated document analysis, and custom smart workflows.', icon: Cpu },
      { title: 'Modern UI/UX Design Systems', description: 'Figma prototypes, cohesive design languages, and customer journey optimization.', icon: Layers },
      { title: 'Workflow & Process Automation', description: 'Connecting internal CRMs, notification systems, and business tools for hands-free operations.', icon: Zap },
      { title: 'Digital Audits & Roadmapping', description: 'Comprehensive technical roadmaps that align software development with strategic growth.', icon: Rocket }
    ],
    technologies: ['Gemini AI', 'OpenAI', 'Figma', 'React', 'Node.js', 'Zapier / Webhooks', 'Tailwind CSS'],
    process: [
      { step: '01', title: 'Operational Assessment', desc: 'Identifying repetitive operational friction points and high-value automation targets.' },
      { step: '02', title: 'Prototyping & UX Design', desc: 'Creating interactive design systems with intuitive user experiences.' },
      { step: '03', title: 'Integration & Testing', desc: 'Connecting APIs, training AI models, and validating operational workflows.' },
      { step: '04', title: 'Employee Onboarding', desc: 'Delivering documentation and training so your team hits the ground running.' }
    ],
    faqs: [
      { q: 'How can AI benefit our specific business?', a: 'AI can automate customer support (24/7 AI chatbot), accelerate document summarization, generate automated replies, and predict customer behavior.' },
      { q: 'Do you create custom Figma design files?', a: 'Yes! We deliver complete, well-organized Figma design systems including components, variables, and typography guides.' }
    ]
  },
  'custom-software': {
    id: 'custom-software',
    title: 'Custom Software Development',
    subtitle: 'Tailor-Made Enterprise Portals, CRM & Specialized Business Engines',
    badge: 'Bespoke Software Engineering',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    overview: 'Off-the-shelf software rarely fits unique business needs. We build bespoke software systems tailored precisely to your company operations, security standards, and growth goals.',
    features: [
      { title: 'Tailor-Made ERP & CRM Portals', description: 'Centralized platforms managing customer records, inventory, logistics, and employee metrics.', icon: Database },
      { title: 'Cross-Platform Interoperability', description: 'Software that runs harmoniously across web, mobile, and internal desktop environments.', icon: Smartphone },
      { title: 'Bank-Grade Data Security', description: 'Encrypted storage, two-factor authentication, audit logging, and regulatory compliance.', icon: Shield },
      { title: 'Complete IP & Source Code Ownership', description: 'You retain 100% intellectual property rights, source code, and deployment control.', icon: Code2 }
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Python', 'Redis', 'Docker', 'REST APIs'],
    process: [
      { step: '01', title: 'In-Depth Requirements Analysis', desc: 'Documenting every technical specification, data entity, and user role.' },
      { step: '02', title: 'Architecture Blueprint', desc: 'Designing database schemas, API contracts, and high-performance server pipelines.' },
      { step: '03', title: 'Modular Build', desc: 'Developing features in structured milestones with weekly demo walkthroughs.' },
      { step: '04', title: 'Enterprise Deployment', desc: 'Secure production provisioning, data seeding, and ongoing SLA maintenance.' }
    ],
    faqs: [
      { q: 'Do we own the full source code after completion?', a: 'Yes, 100%! Upon project handover, all source code, design assets, and intellectual property belong entirely to you.' },
      { q: 'Can custom software scale as our user count grows?', a: 'Yes, we architect databases and services with horizontal scaling so your system handles 10x to 100x traffic effortlessly.' }
    ]
  }
};

export function SolutionDetailView() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? solutionsData[slug] : null;

  if (!solution) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="pt-28 pb-20 bg-app-bg">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary tracking-wider uppercase">{solution.badge}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight mb-6 leading-tight">
                {solution.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                {solution.subtitle}
              </p>

              <p className="text-gray-500 mb-10 leading-relaxed max-w-2xl">
                {solution.overview}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-xl hover:-translate-y-1"
                >
                  Start This Project <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-bold text-secondary hover:bg-white/80 transition-all border border-gray-200 text-center"
                >
                  View All Solutions
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="relative glass p-4 rounded-[3rem] border border-white/60 shadow-3xl overflow-hidden group">
                <img
                  src={solution.heroImage}
                  alt={solution.title}
                  className="rounded-[2.5rem] w-full h-[360px] sm:h-[420px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent rounded-[2.5rem]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Core Capabilities</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">Engineered with modern best practices to deliver measurable enterprise value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl hover:bg-secondary hover:text-white transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary group-hover:text-white mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed text-sm">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Badges */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">Technologies & Tooling</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-sm">We select the most robust, battle-tested modern tools for stability and developer agility.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
            {solution.technologies.map((tech) => (
              <span
                key={tech}
                className="px-6 py-3 rounded-2xl bg-white/10 border border-white/15 text-sm font-bold text-white hover:bg-primary hover:border-primary transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-24 bg-app-bg">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Proven Delivery Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">From discovery to deployment, a transparent agile pipeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solution.process.map((item, i) => (
              <div key={item.step} className="glass p-8 rounded-3xl border border-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="text-5xl font-black text-primary/20 block mb-4">{item.step}</span>
                  <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-8 h-1 bg-primary/40 mt-8 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Common questions regarding our {solution.title} services.</p>
          </div>

          <div className="space-y-6">
            {solution.faqs.map((faq, i) => (
              <div key={i} className="glass p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-secondary mb-3">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 bg-gradient-to-r from-secondary via-secondary to-[#092952] text-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Ready to build your next breakthrough?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a technical consultation with our engineering team and get a detailed roadmap & quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-10 py-5 bg-primary text-white rounded-2xl font-bold hover:bg-accent transition-all shadow-2xl hover:scale-105"
            >
              Get Free Project Estimate
            </Link>
            <a
              href="https://wa.me/916382907182"
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 bg-white/10 rounded-2xl font-bold text-white hover:bg-white/20 transition-all border border-white/20"
            >
              Chat on WhatsApp (+91 6382907182)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
